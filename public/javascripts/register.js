$(document).ready(function (){
   let base_url = 'http://localhost:5000/';
    let imageFile = '';
    
    
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
            
        },
        crossDomain: true
    });
    
console.log('hello');


$("#submit").on('click', function (e) {
    e.preventDefault();
        let user = {
            name: $("#name").val(),
            contact: $("#contact").val(),
            address: $("#address").val(),
              username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val()
        };
    console.log(user);
        $.ajax({
            type: 'POST',
            url: "http://localhost:5000/clients/register",
            data: user,
            success: function (reply) {
                console.log("registered");
                 alert("Registration Successful");
                window.location.href = '/';
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });
    
    
   $("#logg").on('click', function (e) {
    e.preventDefault();
        let user = {
            username: $("#username").val(),
            password: $("#password").val()
        }; 
       console.log(user);
               $.ajax({
            type: 'POST',
            url: "http://localhost:5000/clients/login",
            data: user,
                   
                   success: function (user) {
                       console.log(user.usertype);
                       console.log(user.userid);
                       console.log(user.username);
                       alert(user.username);
                       
                       localStorage.setItem('username', user.username);
                   if(user.usertype === true){
                        alert("login as admin");
                      window.location.href = '/viewevent';
                      
                   }
                   else{
               window.location.href = '/clientdashboard';
                        $("username").append(user.username);
                console.log("Logged IN");
                       
                      }
            },              
           error: function () {
                alert("Fill all the form fields!");
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
    
        $("#enterevent").on('click', function () {
        let event = {
            name: $("#name").val(),
            place: $("#place").val(),
            purpose: $('#purpose').val(),
            description: $('#description').val(),
            date: $('#date').val(),
            image: imageFile
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'events',
            data: event,
            success: function (event) {
//                tblBody.append(rowTemplate(event));
//                imageFile = '';
//                $('#eventform').trigger('reset');
                console.log("Uploaded");
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });
    
    $("#adminregister").on('click', function (e) {
    e.preventDefault();
        let user = {
            name: $("#name").val(),
            contact: $("#contact").val(),
            address: $("#address").val(),
              username: $("#username").val(),
            admin: "true",
            email: $("#email").val(),
            username: $("#username").val(),
            password: $("#password").val()
        };
    console.log(user);
        $.ajax({
            type: 'POST',
            url: "http://localhost:3000/clients/register",
            data: user,
            success: function (reply) {
                console.log("registered");
//                tblBody.append(rowTemplate(hero));
//                imageFile = '';
//                $('#hero-form').trigger('reset');
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });
    });