app.get('/api/set_currency',function(req,res){
    var user_id = req.param('user_id');
    var curr = req.param('currency');

    con.query('UPDATE users SET currency=? WHERE id=?',[parseInt(curr), user_id],function(err,data){
        if(!err){
          res.json({reply:1});
        }
        else{
          res.json({reply:0});
        }
    });
});
