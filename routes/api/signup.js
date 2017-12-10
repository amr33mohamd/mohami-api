var crypto = require('crypto');

app.get('/api/signup',function(req,res){
    var username = req.param("username");
    var password = req.param("password");
    var hash = crypto.createHash('md5').update(password).digest("hex");
    var email = req.param("email");
    var address = req.param("address");
    con.query('SELECT id from users WHERE name=? LIMIT 1', [username], function(err,data) {
    if(!err) {
        if(data.length > 0)
        {
            res.json({
                response: 0
            });
        }
        else
        {
            con.query('INSERT INTO users(name,email,password,address,currency,MyLibraryBooksIDs) values(?,?,?,?,?,?)',
                [username,email,hash,address, 0, ""], function(err,data) {
                if(!err) {

                    con.query('SELECT LAST_INSERT_ID() AS user_id', function(err,data) {
                        if(!err) {
                            res.json({
                                response: String(data[0]['user_id'])
                            });
                        }
                        else
                        {
                            res.json(err);
                        }
                    })
                }
                else
                {
                    res.json(err);
                }
            })
        }
    }
    else
    {
        res.json(err);
    }
});
});
