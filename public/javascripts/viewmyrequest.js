$(function () {

    let tblBody = $("#tblbody");
    let base_url = 'http://localhost:5000/';
    let imageFile = '';

    console.log(localStorage.getItem('username'));

   var us = localStorage.getItem('username');
   console.log(us);

    
       function rowTemplate(requestevent) {
        let oneRow = 
            
            "<tr><td>" + requestevent.name + "</td><td>" + requestevent.place + "</td>" +  "</td><td>" + requestevent.purpose + "</td>"
        +  "</td><td>" + requestevent.description + "</td>" + 
            "</td><td>" + requestevent.date + "</td>";
        if (requestevent.image !== '') {
            oneRow += "<td><img src= " + base_url + "uploads/" + requestevent.image + " width='130' /></td>";
        } else {
            oneRow += "<td> No Image </td>";
        }
        oneRow += '<td><button type="button" class="btn btn-warning update" requestevent_id=' + requestevent._id + '>Update</button></td> ';
        oneRow += '<td><button type="button" class="btn btn-danger delete" requestevent_id=' + requestevent._id + '>Delete</button></td> </tr>';
        
       
    //    if (localStorage.getItem('username') === re )

    if (requestevent.username === us ){

        return oneRow;
    }
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
    
    let requestventId;
    tblBody.on('click', '.update', function () {
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
            },
            error: function () {
                console.log("Something went wrong!");
            }
        });
});
        $('#updateevent').on('click', function () {
        let requestevent = {
            name: $("#name").val(),
            place: $('#place').val(),
            purpose:  $('#purpose').val(),
            description: $("#description").val(),
            date:  $('#date').val()
        };    
            if(imageFile !== '') {
                requestevent.image= imageFile;
            }    
        $.ajax({
            type: 'PUT',
            url: base_url + 'requestevent/' + requesteventId,
            data: requestevent,
            success: function (requestevent) {
                console.log(requestevent);
                alert("Event Updated");
                location.href("/viewevent");   
            }
        })
});
});
