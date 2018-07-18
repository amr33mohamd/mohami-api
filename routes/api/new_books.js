app.get('/api/new_books',function(req,res){
    con.query('SELECT id, name AS book_name, image AS book_photo, author_name FROM books ORDER BY id DESC LIMIT 50', function(err,data) {
        if(!err) {
            res.send(data);
        }
        else
        {
            res.send(err);
        }
    })
});
