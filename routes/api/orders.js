app.get('/api/orders',function(req,res){
    var userid = req.param("user_id");
    con.query('SELECT id, book_id, method, status from orders WHERE user_id=? AND status!=2', [userid], function(err,orders) {
        if(!err) {
            if(orders.length == 0)
            {
                res.json({status: 0, orders: []});
            }
            else
            {
                var arr = [];

                orders.forEach(function(order, index, array) {
                    con.query('SELECT name AS book_name from books WHERE id=? LIMIT 1', [  order['book_id']  ], function(err,books) {
                        if(!err) {
                            arr.push([ books[0]['book_name'], order['method'], order['status'] ]);

                            if (index === array.length - 1)
                            {
                                res.json({status: 1, orders: arr});
                            }
                        }
                        else
                        {
                            res.json({status: 0, orders: []});
                        }
                    });
                });
            }
        }
        else
        {
            res.json({status: 0, orders: []});
        }
    });
});
