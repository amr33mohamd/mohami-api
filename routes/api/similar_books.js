app.get('/api/similar_books',function(req,res){
    var book_id = req.param("book_id");
    con.query('SELECT name, author_name, category_id FROM books WHERE id=? LIMIT 1', [book_id], function(err,bookData) {
        if(!err) {
            var correctQueries = [
                "%" + bookData[0].name + "%",
                "%" + bookData[0].author_name + "%"
            ];
            con.query(`SELECT id, name AS book_name, image AS book_photo, author_name,
                category_id FROM books WHERE ((name LIKE ?) OR (author_name LIKE ?) OR (descc LIKE ?)) AND id != ? LIMIT 5`,
                [correctQueries[0], correctQueries[1], correctQueries[0], book_id],
            function(err,search_res) {
                if(!err) {
                    if(search_res.length > 0)
                    {
                        data = [];
                        for(let counter in search_res) {
                            con.query('select name FROM categories WHERE id=? LIMIT 1', [ search_res[counter]['category_id'] ], function(err,cat) {
                                if(!err && cat.length)
                                {
                                    data.push({
                                      id: search_res[counter]['id'],
                                      book_name : search_res[counter]['book_name'],
                                      book_photo : search_res[counter]['book_photo'],
                                      author_name : search_res[counter]['author_name'],
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
                                      id: search_res[counter]['id'],
                                      book_name : search_res[counter]['book_name'],
                                      book_photo : search_res[counter]['book_photo'],
                                      author_name : search_res[counter]['author_name'],
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
                        con.query(`SELECT id, name AS book_name, image AS book_photo, author_name FROM books WHERE category_id=? AND id != ? LIMIT 5`,
                            [bookData[0].category_id, book_id],
                        function(err,books_of_same_cat) {
                            if(!err) {
                                con.query('select name FROM categories WHERE id=? LIMIT 1', [ bookData[0].category_id ], function(err,cat) {
                                    if(!err && cat.length)
                                    {
                                        data = [];
                                        for(let counter in books_of_same_cat) {
                                            data.push({
                                              id: books_of_same_cat[counter]['id'],
                                              book_name : books_of_same_cat[counter]['book_name'],
                                              book_photo : books_of_same_cat[counter]['book_photo'],
                                              author_name : books_of_same_cat[counter]['author_name'],
                                              cat_name: cat[0]['name']
                                            });

                                            if(counter == books_of_same_cat.length-1){
                                              res.json({
                                                status:1,
                                                result:data
                                              })
                                            }
                                        }
                                    }
                                    else {
                                        data = [];
                                        for(let counter in books_of_same_cat) {
                                            data.push({
                                              id: books_of_same_cat[counter]['id'],
                                              book_name : books_of_same_cat[counter]['book_name'],
                                              book_photo : books_of_same_cat[counter]['book_photo'],
                                              author_name : books_of_same_cat[counter]['author_name'],
                                              cat_name: 'غير مُعرف'
                                            });

                                            if(counter == books_of_same_cat.length-1){
                                              res.json({
                                                status:1,
                                                result:data
                                              })
                                            }
                                        }
                                    }
                                });
                            }
                            else res.json({status:0});
                        });
                    }
                }
                else
                {
                    res.json({status:0});
                }
            })
        }
        else
        {
            res.send(err);
        }
    })
});
