var noteArr = [];   

class DataTransfer {

  constructor() {
    this.notesReceived = [];
    this.webUrl = "http://fredapp.000webhostapp.com/";
  }

  connect() {
    $.ajax({
      type: "POST",
      url: this.webUrl + "db.php",
      success: function (response) {
        console.log(response);
        console.log("Connection Successfull");
      },
      error: function (xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
        alert('Could not connect to server');
      }
    });
  }

  create() {

  }

  read(callback) {
    $.ajax({
      type: "POST",
      url: this.webUrl + "readNotes.php",
      dataType: "json",
      success: function (response) {
        callback(response);
      },
      error: function (xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
      }
    });
  }

  update() {

  }

  delete() {

  }



}