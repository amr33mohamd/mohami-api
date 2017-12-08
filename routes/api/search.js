app.get('/api/searchfor',function(req,res){
    var searchFor = req.param("query");
    var correctQuery = "%" + searchFor + "%";
    con.query("SELECT id, name AS book_name, image AS book_photo, author_name FROM books WHERE (name LIKE ?) OR (author_name LIKE ?)", [correctQuery, correctQuery],
    function(err,data) {
        if(!err) {
            if(data.length > 0)
            {
                res.json({status:1, result: data});
            }
            else
            {
                res.json({status:0});
            }
        }
        else
        {
            res.json({status:0});
        }
    })
});
