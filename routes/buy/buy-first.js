const fetch = require('node-fetch');

const converter = ({ from, to, amount }) => new Promise((resolve, reject) => {
    fetch(`http://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=y`)
    	.then(res => res.json())
    	.then(json => resolve({
            converted: amount * json[`${from}_${to}`]['val']
        }));
});

app.get('/buy-first',function(req,res){
  var book_id = req.param('book_id');
  var user_id = req.param('user_id');
  var method = req.param('method');
  sql.select('books','id',book_id,function(book){
    sql.select('users','id',user_id,function(user){
      sql.select('admin_meta','name','paypal_email',function(admin_email){
        if(user === null || book === null){
          res.send('check your data');
        }
        else{
         converter({
              from: "SAR",
              to: "USD",
              amount: (book[0]['fake_price'] > 0) ? book[0]['fake_price'] : book[0]['price']
          }).then(value => {

              res.render('buy-first',{
                book:book[0],
                user:user[0],
                admin_email: admin_email[0].value,
                domain: req.headers.host,
                method,
                price:value.converted
              });
          })

        }
      })
    })
  })
})
