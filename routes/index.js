var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

//clientspart
router.get('/clientdashboard', function(req, res, next){
   res.render('clientdashboard'); 
});



router.get('/requestevent', function(req, res, next){
   res.render('requestevent'); 
});

router.get('/clientabout', function(req, res, next){
    res.render('clientabout'); 
 });


 router.get('/clientblog', function(req, res, next){
    res.render('clientblog'); 
 });

 router.get('/clientjob', function(req, res, next){
    res.render('clientjob'); 
 });
router.get('/displayrequestevent', function(req, res, next){
   res.render('clientview'); 
});
router.get('/help', function(req, res, next){
    res.render('help');
});



router.get('/adminsignup', function(req, res, next){
   res.render('adminsignup'); 
});

router.get('/admindashboard', function(req, res, next){
   res.render('admindashboard'); 
});

router.get('/adminhelp', function(req, res, next){
   res.render('adminhelp'); 
});


router.get('/adminviewrequest', function(req, res, next){
   res.render('adminviewrequest'); 
});


router.get('/adminnotice', function(req, res, next){
    res.render('adminnotice'); 
 });
router.get('/adminblog', function(req, res, next){
    res.render('adminblog'); 
 });

router.get('/adminjob', function(req, res, next){
    res.render('adminjob'); 
 });

router.get('/addevent', function(req, res, next){
    res.render('addevent');
});

router.get('/viewevent', function(req, res, next){
    res.render('viewevents');
});

module.exports = router;
