const fetch = require('node-fetch');

const converter = ({ from, to, amount }) => new Promise((resolve, reject) => {
    fetch(`http://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=y`)
    	.then(res => res.json())
    	.then(json => resolve({
            converted: amount * json[`${from}_${to}`]['val']
        }));
});

app.get('/api/price_of_book',function(req,res){
    var book_id = req.param("book_id");
    var convert = req.param("convert");
    con.query('SELECT price, fake_price AS discount FROM books WHERE id=? LIMIT 1', [book_id], function(err,data) {
        if(!err) {
            var price = data[0]['price'], discount = data[0]['discount'];
            if(convert == 1)
            {
                if(price > 0)
                {
                    converter({
                        from: "SAR",
                        to: "USD",
                        amount: price
                    }).then(value => {
                        price = parseFloat(value.converted.toFixed(2));

                        if(discount > 0)
                        {
                            converter({
                                from: "SAR",
                                to: "USD",
                                amount: discount
                            }).then(value2 => {
                                discount = parseFloat(value2.converted.toFixed(2));

                                res.json({
                                    price: price,
                                    discount: discount
                                });

                            })
                        }
                        else
                        {
                            res.json({
                                price: price,
                                discount: 0
                            });
                        }
                    })
                }
                else
                {
                    if(discount > 0)
                    {
                        converter({
                            from: "SAR",
                            to: "USD",
                            amount: discount
                        }).then(value => {
                            discount = parseFloat(value.converted.toFixed(2));

                            res.json({
                                price: 0,
                                discount: discount
                            });

                        })
                    }
                    else
                    {
                        res.json({
                            price: 0,
                            discount: 0
                        });
                    }
                }
            }
            else
            {
                res.json({
                    price: price,
                    discount: discount
                });
            }
        }
        else
        {
            res.send(err);
        }
    })
});
