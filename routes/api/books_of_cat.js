app.get('/api/books_of_cat',function(req,res){
    var cat_id = req.param("cat_id");
    con.query('SELECT id, name AS book_name, image AS book_photo, author_name FROM books WHERE category_id=?', [cat_id], function(err,data) {
        if(!err) {
            res.send(data);
        }
        else
        {
            res.send(err);
        }
    })
});
