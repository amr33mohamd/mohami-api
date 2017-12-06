app.get('/api/price_of_book',function(req,res){
    var book_id = req.param("book_id");
    con.query('SELECT price FROM books WHERE id=? LIMIT 1', [book_id], function(err,data) {
        if(!err) {
            res.send(data);
        }
        else
        {
            res.send(err);
        }
    })
});
