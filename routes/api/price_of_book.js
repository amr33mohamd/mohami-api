
app.get('/api/price_of_book',function(req,res){


    var book_id = req.param("book_id");
    var convert = req.param("convert");
    con.query('SELECT price FROM books WHERE id=? LIMIT 1', [book_id], function(err,data) {
        if(!err) {
            if(data[0]['price'] == 0)
            {
                res.json({
                    price: 0
                });
            }
            else if(convert == 1)
            {
                const converter = require('google-currency');
                converter({
                    from: "SAR",
                    to: "USD",
                    amount: data[0]['price']
                }).then(value => {
                    res.json({
                        price: parseFloat(value.converted.toFixed(2))
                    });
                })
            }
            else
            {
                res.json({
                    price: data[0]['price']
                });
            }

        }
        else
        {
            res.send(err);
        }
    })
});
