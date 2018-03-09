app.get('/api/searchfor',function(req,res){
    var searchFor = req.param("query");
    var correctQuery = "%" + searchFor + "%";
    con.query("SELECT id, name AS book_name, image AS book_photo, author_name,category_id FROM books WHERE (name LIKE ?) OR (author_name LIKE ?) OR (descc LIKE ?)",
        [correctQuery, correctQuery, correctQuery],
    function(err,search_res) {
        if(!err) {
            if(search_res.length > 0)
            {
                data = [];
                for(let counter in search_res) {
                    con.query('select name FROM categories WHERE id=? LIMIT 1', [ search_res[0]['category_id'] ], function(err,cat) {
                        if(!err && cat.length)
                        {
                            data.push({
                              id: search_res[0]['id'],
                              book_name : search_res[0]['book_name'],
                              book_photo : search_res[0]['book_photo'],
                              author_name : search_res[0]['author_name'],
                              cat_name: cat[0]['name']
                            });

                            if(counter == search_res.length-1){
                              res.json({
                                status:1,
                                result:data
                              })
                            }
                        }
                        else {
                            data.push({
                              id: search_res[0]['id'],
                              book_name : search_res[0]['book_name'],
                              book_photo : search_res[0]['book_photo'],
                              author_name : search_res[0]['author_name'],
                              cat_name: 'غير معرف'
                            });

                            if(counter == search_res.length-1){
                              res.json({
                                status:1,
                                result:data
                              })
                            }
                        }
                    });
                }
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
