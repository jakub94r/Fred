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