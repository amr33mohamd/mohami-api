app.get('/api/send_feedback',function(req,res){
  var user_id = req.param('user_id');
  var message = req.param('message');

  con.query('select name, email from users where id=? LIMIT 1',[user_id],function(err,user){
    if(err){
      res.json({status:0});
    }
    else {
        con.query('insert into feedbacks(name,email,message) values(?,?,?)',[ user[0]['name'], user[0]['email'], message],function(err,ress){
          if(err){
            res.json({status:0});
          }
          else {
            res.json({status:1});
          }
        })
    }
  })
})
