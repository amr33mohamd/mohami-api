app.get('/api/ask',function(req,res){

  var name = req.param('name');
  var phone = req.param('phone');
  var email = req.param('email');
  var message = req.param('message');

    con.query('insert into requests(name,phone,email,message) values(?,?,?,?) ',[name,phone,email,message], function(err,data) {
      if(!err){
        res.json({response:true});
      }
      else {
        res.json({response:false});
      }
    })
});
