$(function () {

    let jobtable = $("#jobtable");
    let base_url = 'http://localhost:5000/';
    let showjob = $('#showjob');


    function rowTemplate(job) {
        let oneRow = 
            
            "<tr><td>" + job.name + "</td><td>" +
             job.position + "</td><td>" + job.experience + "</td><td>" + job.email + "</td>";
     
        oneRow += '<td><button type="button" class="btn btn-warning update" job_id=' + job._id + '>Update</button></td> ';
        oneRow += '<td><button type="button" class="btn btn-danger delete" job_id=' + job._id + '>Delete</button></td> </tr>';
"<br>"
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
            jobtable.append(myRows);
        },
        error: function () {
            alert('Something went wrong!');
        }
    });


    $("#postjob").on('click', function () {
        let job = {
            name: $("#name").val(),
            position: $("#position").val(),
            experience: $("#experience").val(),
            email: $("#email").val(),
       
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'jobs',
            data: job,
            success: function (job) {
                alert('Job Added');
                console.log("Uploaded");
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });
    jobtable.on('click', '.delete', function () {
        $.ajax({
            type: 'DELETE',
            url: base_url + 'jobs/' + $(this).attr('job_id'),
            success: function () {
                alert('Deleted');
                location.reload();
            }
        });
    });
   jobtable.on('click', '.update', function () {
        jobId = $(this).attr('job_id');
        $.ajax({
            type: 'GET',
            url: base_url + 'jobs/' + jobId,
            success: function (job) {
            
          $('#name').val(job.name);
              $('#position').val(job.position);
                $('#experience').val(job.experience);
                $('#email').val(job.email);
       
            },
            error: function () {
                console.log("Something went wrong!");
            }
        });
});


$('#updatejob').on('click', function () {
    let job = {
      name: $("#name").val(),
            position: $("#position").val(),
            experience: $("#experience").val(),
            email: $("#email").val(),
   
    };    

    $.ajax({
        type: 'PUT',
        url: base_url + 'jobs/' + jobId,
        data: job,
        success: function (job) {
            console.log(job);
            alert("job Updated");
            location.href("/adminjob");
            
        }
    })

});
});