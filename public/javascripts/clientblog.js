$(function () {

    let blogtable = $("#blogtable");
    let base_url = 'http://localhost:5000/';
    let showblog = $('#showblog');
function rowTemplate(blog) {
    let oneRow = 
        "<tr><td>" + blog.name + "</td><td>" +
         blog.info + "</td></tr>";
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
        showblog.append(myRows);
    },
    error: function () {
        alert('Something went wrong!');
    }
});
});