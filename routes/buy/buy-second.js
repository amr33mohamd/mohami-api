app.get('/api/buy-second',function(req,res){
  var book_id = req.param('book_id');
  var amount = req.param('amount');
  var user_id = req.param('user_id');
  sql.select('books','id',book_id,function(book) {
    if(book[0].price == amount){
      con.query('insert into orders(user_id,book_id,method,status) values(?,?,?,0)',[],function(err,ress){
        if(err){
          res.send(err);
        }
        else{
          res.send('Done please click on X up there.');
        }
      })
    }
    else {
      res.send('You are cheating and we got you :D. a messange was sent to us with all your info.');
    }
  })
})
