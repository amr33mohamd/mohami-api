app.get('/api/books_of_subcat',function(req,res){
    var cat_id = req.param("sub_cat_id");
    con.query('SELECT id, name AS book_name, image AS book_photo, author_name ,fake_price AS discount FROM books WHERE sub_category_id=?', [cat_id], function(err,data) {
        if(!err) {
            res.send(data);
        }
        else
        {
            res.send(err);
        }
    })
});
