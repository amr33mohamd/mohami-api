var crypto = require('crypto');

app.get('/api/signin',function(req,res){
    var username = req.param("username");
    var password = req.param("password");
    var hash = crypto.createHash('md5').update(password).digest("hex");
    con.query('SELECT id, MyLibraryBooksIDs from users WHERE name=? AND password=? LIMIT 1', [username, hash], function(err,data) {
    if(!err) {
        if(data.length == 0)
        {
            res.json({
                response: 0
            });
        }
        else
        {
            res.json({
                response: String(data[0]['id']),
                MyLibraryBooksIDs: data[0]['MyLibraryBooksIDs']
            });
        }
    }
    else
    {
        res.json(err);
    }
});
});
