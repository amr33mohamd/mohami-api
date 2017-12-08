app.get('/api/feedback',function(req,res){
  var email = req.param('email');
  var name = req.param('name');
  var message = req.param('message');
  con.query('insert into feedbacks(name,email,message) values(?,?,?)',[name,email,message],function(err,ress){
    if(err){
      res.json({status:0});
    }
    else {
      res.json({status:1});
    }
  })
})
