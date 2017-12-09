app.get('/buy-first',function(req,res){
  var book_id = req.param('book_id');
  var user_id = req.param('user_id');
  sql.select('books','id',book_id,function(book){
    sql.select('users','id',user_id,function(user){
      sql.select('admin_meta','name','paypal_email',function(admin_email){
        if(user === null || book === null){
          res.send('check your data');
        }
        else{
          res.render('buy-first',{
            book:book[0],
            user:user[0],
            admin_email: admin_email[0].value,
            domain: req.headers.host
          });
        }
      })
    })
  })
})
