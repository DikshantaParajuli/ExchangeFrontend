$(function () {

    let noticetable = $("#noticetable");
    let base_url = 'http://localhost:3000/';
    let shownotice = $('#shownotice');


    




function rowTemplate(notice) {
    let oneRow = 
        
        "<tr><td>" + notice.name + "</td><td>" +
         notice.info + "</td></tr>";
 

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
        shownotice.append(myRows);
    },
    error: function () {
        alert('Something went wrong!');
    }
});





});