$(document).ready(function (){
   let base_url = 'http://localhost:5000/';
    let imageFile = '';
    let tblBody = $("#tblbody");

   console.log(localStorage.getItem('username'));
   console.log(localStorage.getItem('client._id'));

  var  us = localStorage.getItem('username');
    $('#username').text(localStorage.getItem('username'));
    
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
            
        },
        crossDomain: true 
    });
        $("#imageFile").on('change', function () {
        let formData = new FormData();
        let files = $("#imageFile").get(0).files;
        if (files.length > 0) {
            formData.append("imageFile", files[0]);
        }
        // $("#add-hero").prop("disabled", true);
        $.ajax({
            type: 'POST',
            url: base_url + 'upload',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                imageFile = data.filename;
                // $("#add-hero").prop("disabled", false);
            },
            error: function () {
                alert("Image upload failed!");
            }
        });
    });
    
      $("#requestevent").on('click', function () {
        let requestevent = {
            username: localStorage.getItem('username'),
            name: $("#name").val(),
            place: $("#place").val(),
            purpose: $('#purpose').val(),
            description: $('#description').val(),
            date: $('#date').val(),
            image: imageFile
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'requestevent',
            data: requestevent,
            success: function (requestevent) {
                alert("Event Requested");
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });
    });