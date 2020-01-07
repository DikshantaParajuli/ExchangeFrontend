$(document).ready(function (){
   let base_url = 'http://localhost:5000/';
    let imageFile = '';
    let tblBody = $("#tblbody");
    
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
            
        },
        crossDomain: true
        
    });
    
   $.ajax({
        type: 'GET',
        url: base_url + 'clients',
        success: function (user) {
            $('#username').append("user.username");
        }
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
       function rowTemplate(requestevent) {
        let oneRow = 
            
            "<tr><td>" + requestevent.username + "</td><td>" + requestevent.name + "</td><td>" + requestevent.place + "</td>" +  "</td><td>" + requestevent.purpose + "</td>"
        +  "</td><td>" + requestevent.description + "</td>" + 
            "</td><td>" + requestevent.date + "</td>";
        if (requestevent.image !== '') {
            oneRow += "<td><img src= " + base_url + "uploads/" + requestevent.image + " width='130' /></td>";
        } else {
            oneRow += "<td> No Image </td>";
        }
        oneRow += '<td><button type="button" class="btn btn-warning post" requestevent_id=' + requestevent._id + '>Post</button></td> ';
        oneRow += '<td><button type="button" class="btn btn-danger delete" requestevent_id=' + requestevent._id + '>Delete</button></td> </tr>';
        return oneRow;
    }  
    $.ajax({
        type: 'GET',
        url: base_url + 'requestevent',
        success: function (requestevents) {
            let myRows = [];
            $.each(requestevents, function (index, requestevent) {
                myRows.push(rowTemplate(requestevent));
            });
            tblBody.append(myRows);
        },
        error: function () {
            alert('Something went wrong!');
        }
    });   
        tblBody.on('click', '.delete', function () {
        $.ajax({
            type: 'DELETE',
            url: base_url + 'requestevent/' + $(this).attr('requestevent_id'),
            success: function () {
                location.reload();
            }
        });
    });
        let requesteventId;
    tblBody.on('click', '.post', function () {
        requesteventId = $(this).attr('requestevent_id');
        $.ajax({
            type: 'GET',
            url: base_url + 'requestevent/' + requesteventId,
            success: function (requestevent) {
                console.log(requestevent);
                $('#name').val(requestevent.name);
                $('#place').val(requestevent.place);
                $('#purpose').val(requestevent.purpose);
                $('#description').val(requestevent.description);
                $('#date').val(requestevent.date);
                $('#imagename').val(requestevent.image);

            },
            error: function () {
                console.log("Something went wrong!");
            }
        });
});
        $('#postevent').on('click', function () {
            let event = {
            name: $("#name").val(),
            place: $('#place').val(),
            purpose:  $('#purpose').val(), 
            description: $("#description").val(),
            date:  $('#date').val(),
            image: $('#imagename').val()
                
        };  
        $.ajax({
            type: 'POST',
            url: base_url + 'events',
            data: event,
            success: function (event) {
                console.log(event);
                alert("Event Regestered");
                window.location.href("/requestevent");
                
            }
        })

});
    });