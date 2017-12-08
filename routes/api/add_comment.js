app.get('/api/add_comment',function(req,res){
    var user_id = req.param('user_id');
    var book_id = req.param('book_id');
    var comment = req.param('comment');

    con.query('select name as username FROM users WHERE id=? LIMIT 1',[user_id],function(err,data){
        if(!err) {
            con.query('insert into comments(user_id,book_id,username,comment) values(?,?,?,?)',[  user_id,book_id,data[0]['username'],comment  ],function(err,response){
                if(!err)
                {
                    con.query('SELECT LAST_INSERT_ID() AS id', function(err,last) {
                        if(!err) {
                            res.json({status:1, id: last[0]['id'], username: data[0]['username']});
                        }
                        else
                        {
                            res.json({status:0});
                        }
                    })
                }
                else
                {
                  res.json({status:0});
                }
            })
        }
        else
          res.json({status:0});
    });
});
