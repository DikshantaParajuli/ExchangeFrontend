$(function () {

    
    let base_url = 'http://localhost:5000/';
     let tblBody = $("#tblbody");
       $.ajaxSetup({
        xhrFields: {
            withCredentials: true
            
        },
        crossDomain: true
    });
        function rowTemplate(event) {
        let oneRow = 
            "<tr><td>" + event.name + "</td><td>" + event.place + "</td>" +  "</td><td>" + event.purpose + "</td>"
        +  "</td><td>" + event.description + "</td>" + 
            "</td><td>" + event.date + "</td>";
        if (event.image !== '') {
            oneRow += "<td><img src= " + base_url + "uploads/" + event.image + " width='130' /></td>";
        } else {
            oneRow += "<td> No Image </td></tr>";
        }
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
    
});

