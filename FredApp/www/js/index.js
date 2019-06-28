/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var urlAddress = 'https://localhost:44341/api/values'

$(document).ready(function () {

    // $('#testbutton').click(function (e) {
    //   $.ajax({
    //     type: "POST",
    //     url: "http://fredapp.000webhostapp.com/json.php",
    //     success: function(response) {
    //         console.log(response);
    //         $(".dbtest").append(response);
    //     },
    //     error: function(xhr, status, error) {
    //        console.log(xhr);
    //        console.log(status);
    //        console.log(error);
    //     }
    // });
    // });


    var idCounter = 10;

    //TODO
    //keep notes in device's memory instead
    var noteArr = [];   
    var noteTile;

    function initializeNotes() {
        var newNote = new Note({ id: 0, text: noteText, color: "white"});
        $('#note').Editor();
        $('#note-paragraph').append(newNote.text);
        noteArr.push(newNote);
        noteTile = new NoteTile('#note-paragraph', newNote);
    }

    initializeNotes();

    $(".edit-button").on("click", function () {
        $('#note').attr('isNewNote', 'false')
        $('#note').val($('#note-paragraph').text())
        $('#note-modal').modal('show');
        $('#note').Editor("setText", $('#note').val());
    });

    $("#add-note-button").on("click", function () {
        $('#note').attr('isNewNote', 'true')
        $('#note').val('');
        $('#note-modal').modal('show');
        $('#note').Editor("setText", $('#note').val());
    });

    $("#save-note-button").on("click", function () {
        var isNewNote = $('#note').attr('isNewNote')
        var newNoteText = $('#note').Editor("getText").trim();
        if (newNoteText.length < 1) {
            return;
        }
        $('#note').val(newNoteText)
        if (isNewNote == 'true') {
            idCounter++;
            var newNote = new Note({ id: null, text: newNoteText, color: "white"});
            noteArr.push(newNote);
            noteTile.updateTile(noteArr[noteArr.length - 1]);
            $('#note-group').append('<div class=note-choose-row ><div class="btn-group" noteId=' + noteTile.getDisplayedNote().getId() + ' style="width: 100%"><button class="btn btn-note choose-note" style="width: 90%">' + noteTile.getDisplayedNote().getTextTrimmed() + '</button><button class="btn btn-note delete-note" style="width: 10%"><span class="fas fa-trash-alt"></span></button></div></div>');
        }
        else {
            noteTile.editNote(newNoteText);
            noteTile.updateTile(noteTile.getDisplayedNote());
            var noteChooseButton = document.querySelector("[noteId='" + noteTile.getDisplayedNote().getId() + "']");
            noteChooseButton.children[0].innerHTML = noteTile.textTrimmed;
        }
        $('#note-modal').modal('hide');
    });

    $('#note-group').on("click", "button.choose-note", function () {
        var id = $(this).parent().attr('noteId');
        var note = noteArr.find(n => n.id == id)
        noteTile.updateTile(note);
    });

    $('#note-group').on("click", "button.delete-note", function () {
        var id = $(this).parent().attr('noteId');
        index = noteArr.findIndex(x => x.getId() == id);
        if (index > -1) { noteArr.splice(index, 1); }
        if (noteTile.getDisplayedNote().getId() == id) { noteTile.updateTile(new Note({id: 0, text: "", color: "white"})) }
        $(this).parent().remove()

        console.log(noteArr);
    });

    function hideTile(tile) {
        tile.toggleClass('hidden')
    }

    function changeTileOrder(tile) {
        $('.tile').each(function (index) {
            $(this).css('order', '+=1')
        });
        tile.css({ order: 0 })
    }

    $('.close-button').click(function (e) {
        var headElement = $(this).closest('.wow')
        headElement.toggleClass('hidden')
    });

    //this is a crude way to reorder tiles, and prone to overflow, but sufficient for now.
    //TODO: Take care of it after it's decided on how the tiles' structure is actually supposed to look
    function tileButtonClick(e) {
        var fadeAnim = 'fadeIn'
        var timeout = 600
        var element = $('.tile.' + e.target.classList[0])
        if (element.css('animation-name') == 'fadeIn') {
            fadeAnim = 'fadeOut'
            timeout = 600;
            window.setTimeout(hideTile, timeout, element)
        }
        else {
            fadeAnim = 'fadeIn'
            element.toggleClass('hidden')
            timeout = 0;
        }
        element.css({ 'animation-name': fadeAnim })

        window.setTimeout(changeTileOrder, timeout, element)

    }

    $('.notes').click(tileButtonClick);
    $('.chart1').click(tileButtonClick);
    $('.chart2').click(tileButtonClick);

    $('.sidebar-button').on('click', function () {
        $('.sidebar').toggleClass('inactive');
        $('.wrapper').toggleClass('stretched');
        $(".hamburger-right").toggle(500);
        $(".list-group").toggle();
    });

    var readButton = $(".read-button");
    readButton.on("click", function () {
        var defaultHeight = 20;
        var text = $("#note-paragraph");
        var textHeight = text[0].scrollHeight;
        var newHeight = 0;
        text.css({ "max-height": defaultHeight, "overflow": "hidden" });

        if (text.hasClass("active")) {
            newHeight = defaultHeight;
            text.removeClass("active");
            readButton.text('Read more')
        } else {
            newHeight = textHeight;
            text.addClass("active");
            readButton.text('Read less')
        }
        text.animate({
            "max-height": newHeight
        }, 500);
    });

});

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();