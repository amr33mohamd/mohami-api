app.get('/api/call',function(req,res){

  var name = req.param('name');
  var phone = req.param('phone');
  var email = req.param('email');
  var message = req.param('message');
  var user_name = req.param('user_name')
    con.query('insert into calls(name,phone,email,message,user_id,user_name) values(?,?,?,?,?,?) ',[name,phone,email,message,user_id,user_name], function(err,data) {
      if(!err){
        res.json({response:true});
      }
      else {
        res.json({response:false});
      }
    })
});
