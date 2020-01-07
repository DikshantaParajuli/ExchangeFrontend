$(function () {

    let tblBody = $("#tblbody");
    let base_url = 'http://localhost:5000/';
    let imageFile = '';

    function rowTemplate(event) {
        let oneRow = 
            
            "<tr><td>" + event.name + "</td><td>" + event.place + "</td>" +  "</td><td>" + event.purpose + "</td>"
        +  "</td><td>" + event.description + "</td>" + 
            "</td><td>" + event.date + "</td>";
        if (event.image !== '') {
            oneRow += "<td><img src= " + base_url + "uploads/" + event.image + " width='130' /></td>";
        } else {
            oneRow += "<td> No Image </td>";
        }
        oneRow += '<td><button type="button" class="btn btn-warning update" event_id=' + event._id + '>Update</button></td> ';
        oneRow += '<td><button type="button" class="btn btn-danger delete" event_id=' + event._id + '>Delete</button></td> </tr>';
        
       

        
        return oneRow;
    }


    $.ajax({
        type: 'GET',
        url: base_url + 'events',
        success: function (events) {
            let myRows = [];
            $.each(events, function (index, event) {
                myRows.push(rowTemplate(event));
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
            url: base_url + 'events/' + $(this).attr('event_id'),
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
    
    let eventId;
    tblBody.on('click', '.update', function () {
        eventId = $(this).attr('event_id');
        $.ajax({
            type: 'GET',
            url: base_url + 'events/' + eventId,
            success: function (event) {
                console.log(event);
                $('#name').val(event.name);
                $('#place').val(event.place);
                $('#purpose').val(event.purpose);
                
                $('#description').val(event.description);
                $('#date').val(event.date);
              
//                $('#add-event').hide();
//                $('#updateevent').show();
            },
            error: function () {
                console.log("Something went wrong!");
            }
        });
});

    
        $('#updateevent').on('click', function () {
        let event = {
            name: $("#name").val(),
            place: $('#place').val(),
            purpose:  $('#purpose').val(),
            
            description: $("#description").val(),
            date:  $('#date').val()
        };    
            if(imageFile !== '') {
                event.image= imageFile;
            }
        
        $.ajax({
            type: 'PUT',
            url: base_url + 'events/' + eventId,
            data: event,
            success: function (event) {
                console.log(event);
                alert("Event Updated");
                location.href("/viewevent");
                
            }
        })

});







});
