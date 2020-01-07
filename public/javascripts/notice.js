$(function () {

    let noticetable = $("#noticetable");
    let base_url = 'http://localhost:3000/';
    let shownotice = $('#shownotice');


    function rowTemplate(notice) {
        let oneRow = 
            
            "<tr><td>" + notice.name + "</td><td>" +
             notice.info + "</td>";
     
        oneRow += '<td><button type="button" class="btn btn-warning update" notice_id=' + notice._id + '>Update</button></td> ';
        oneRow += '<td><button type="button" class="btn btn-danger delete" notice_id=' + notice._id + '>Delete</button></td> </tr>';
"<br>"
        return oneRow;
    }


    $.ajax({
        type: 'GET',
        url: base_url + 'notices',
        success: function (notices) {
            let myRows = [];
            $.each(notices, function (index, notice) {
                myRows.push(rowTemplate(notice));
            });
            noticetable.append(myRows);
        },
        error: function () {
            alert('Something went wrong!');
        }
    });


    $("#postnotice").on('click', function () {
        let notice = {
            name: $("#name").val(),
            info: $("#info").val(),
       
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'notices',
            data: notice,
            success: function (notice) {

                console.log("Uploaded");
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });



    noticetable.on('click', '.delete', function () {
        $.ajax({
            type: 'DELETE',
            url: base_url + 'notices/' + $(this).attr('notice_id'),
            success: function () {
                location.reload();
            }
        });
    });


   noticetable.on('click', '.update', function () {
        noticeId = $(this).attr('notice_id');
        $.ajax({
            type: 'GET',
            url: base_url + 'notices/' + noticeId,
            success: function (notice) {
                console.log(notice);
                $('#name').val(notice.name);
                $('#info').val(notice.info);
              
            },
            error: function () {
                console.log("Something went wrong!");
            }
        });
});


$('#updatenotice').on('click', function () {
    let notice = {
        name: $("#name").val(),
        info: $('#info').val(),
   
    };    

    $.ajax({
        type: 'PUT',
        url: base_url + 'notices/' + noticeId,
        data: notice,
        success: function (notice) {
            console.log(notice);
            alert("Notice Updated");
            location.href("/adminnotice");
            
        }
    })

});



// function rowTemplate(notice) {
//     let oneRow = 
        
//         "<tr><td>" + notice.name + "</td><td>" +
//          notice.info + "</td></tr>";
 

//     return oneRow;
// }


// $.ajax({
//     type: 'GET',
//     url: base_url + 'notices',
//     success: function (notices) {
//         let myRows = [];
//         $.each(notices, function (index, notice) {
//             myRows.push(rowTemplate(notice));
//         });
//         clientotice.append(myRows);
//     },
//     error: function () {
//         alert('Something went wrong!');
//     }
// });





});