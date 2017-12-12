app.get('/api/homescreen',function(req,res){

  data = [];
  con.query('SELECT id, name FROM categories ORDER BY id ASC', function(err,data) {
      if(!err) {
          for(let counter in categories){
            con.query("SELECT id AS book_ID, name AS book_name, image AS book_photo, author_name FROM books WHERE category_id=? ORDER BY id DESC LIMIT 3",
            [categories[counter]['id']],function(err,books){
                data.push({
                  cat_ID: categories[counter]['id'],
                  cat_name : categories[counter]['name'],
                  cat_books: books,
                });
                if(counter == categories.length-1){
                  res.json(data);
                }

            })
          }
      }
  })
});
// var group_id = req.param('group_id');
