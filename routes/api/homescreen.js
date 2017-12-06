app.get('/api/homescreen',function(req,res){

  data = [];
  sql.select('categories','1','1',function(categories){
    for(let counter in categories){
      con.query("SELECT id AS book_ID, name AS book_name, image AS book_photo, author_name FROM books WHERE category_id=? ",
      [categories[counter].id],function(err,books){
          data.push({
            cat_ID: categories[counter].id,
            cat_name : categories[counter].name,
            cat_books: books,
          });
          if(counter == categories.length-1){
            res.json(data);
          }

      })
    }
  })

});
// var group_id = req.param('group_id');
