$(function () {

    let jobtable = $("#jobtable");
    let base_url = 'http://localhost:5000/';
    let showjob = $('#showjob');
function rowTemplate(job) {
    let oneRow = 
        "<tr><td>" + job.name + "</td><td>" +
         job.position + "</td><td>" +
         job.experience + "</td><td>" +
         job.email + "</td></tr>"
    
    ;
    return oneRow;
}
$.ajax({
    type: 'GET',
    url: base_url + 'jobs',
    success: function (jobs) {
        let myRows = [];
        $.each(jobs, function (index, job) {
            myRows.push(rowTemplate(job));
        });
        showjob.append(myRows);
    },
    error: function () {
        alert('Something went wrong!');
    }
});
});