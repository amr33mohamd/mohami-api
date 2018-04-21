app.get('/api/ads',function(req,res){
    con.query('SELECT id,title,image FROM ads ORDER BY id DESC LIMIT 5', function(err,data) {
        if(!err) {
            res.send(data);
        }
        else
        {
            res.send(err);
        }
    })
});
