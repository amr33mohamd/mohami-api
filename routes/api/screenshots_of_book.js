app.get('/api/screenshots_of_book',function(req,res){
    var book_id = req.param("book_id");
    con.query('SELECT id, name AS book_photo FROM screenshots WHERE book_id=?', [book_id], function(err,data) {
        if(!err) {
            res.send(data);
        }
        else
        {
            res.send(err);
        }
    })
});
