app.get('/api/add-my-library',function(req,res){
  var user_id = req.param('user_id');
  var book_id = req.param('book_id');
  sql.dselect('my_library','user_id',user_id,'book_id',book_id,function(books){
    if(books.length == 0 ){
      con.query('insert into my_library(user_id,book_id) values(?,?)',[user_id,book_id],function(err,response){
        if(!err){
          res.json({status:'done'});
        }
        else{
          res.send(err);
        }
      })
    }
    else{
      res.json({status:'added_before'});
    }
  })
});



app.get('/api/show-my-library',function(req,res){
  data = [];
  var user_id = req.param('user_id');
  sql.select('my_library','user_id',user_id,function(library){
    if(library.length == 0){
      res.json({status:'failed'});
    }
    else{
      for(let counter in library){
        con.query('select id AS book_ID, name AS book_name, image AS book_photo, author_name FROM books WHERE id=?',[library[counter].book_id],function(err,book){
          data.push({
            book_ID: book['book_ID'],
            book_name : book[0].book_name,
            book_photo : book[0].book_photo,
            author_name : book[0].author_name
          });
          console.log(book);
          if(counter == library.length-1){
            res.json({
              status:'successed',
              books:data
            })
          }
        })

      }
    } //end if there are data
  })

});
