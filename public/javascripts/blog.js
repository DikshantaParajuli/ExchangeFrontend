$(function () {

    let blogtable = $("#blogtable");
    let base_url = 'http://localhost:5000/';
    let showblog = $('#showblog');
    function rowTemplate(blog) {
        let oneRow = 
            
            "<tr><td>" + blog.name + "</td><td>" +
             blog.info + "</td>";
     
        oneRow += '<td><button type="button" class="btn btn-warning update" blog_id=' + blog._id + '>Update</button></td> ';
        oneRow += '<td><button type="button" class="btn btn-danger delete" blog_id=' + blog._id + '>Delete</button></td> </tr>';
"<br>"
        return oneRow;
    }
    $.ajax({
        type: 'GET',
        url: base_url + 'blogs',
        success: function (blogs) {
            let myRows = [];
            $.each(blogs, function (index, blog) {
                myRows.push(rowTemplate(blog));
            });
            blogtable.append(myRows);
        },
        error: function () {
            alert('Something went wrong!');
        }
    });
    $("#postblog").on('click', function () {
        let blog = {
            name: $("#name").val(),
            info: $("#info").val(),
       
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'blogs',
            data: blog,
            success: function (blog) {
                alert('Blog Added');
                console.log("Uploaded");
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });



    blogtable.on('click', '.delete', function () {
        $.ajax({
            type: 'DELETE',
            url: base_url + 'blogs/' + $(this).attr('blog_id'),
            success: function () {
                alert('Deleted');
                location.reload();
            }
        });
    });
   blogtable.on('click', '.update', function () {
        blogId = $(this).attr('blog_id');
        $.ajax({
            type: 'GET',
            url: base_url + 'blogs/' + blogId,
            success: function (blog) {
                console.log(blog);
                $('#name').val(blog.name);
                $('#info').val(blog.info);
              
            },
            error: function () {
                console.log("Something went wrong!");
            }
        });
});


$('#updateblog').on('click', function () {
    let blog = {
        name: $("#name").val(),
        info: $('#info').val(),
   
    };    

    $.ajax({
        type: 'PUT',
        url: base_url + 'blogs/' + blogId,
        data: blog,
        success: function (blog) {
            console.log(blog);
            alert("Blog Updated");
            location.href("/adminblog");
            
        }
    })

});

});