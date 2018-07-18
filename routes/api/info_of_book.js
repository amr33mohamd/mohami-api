app.get('/api/info_of_book',function(req,res){
    var book_id = req.param("book_id");
    con.query('SELECT descc, height, width, pagesnum, binding FROM books WHERE id=? LIMIT 1', [book_id], function(err,data) {
        if(!err) {
            res.send(data);
        }
        else
        {
            res.send(err);
        }
    })
});
