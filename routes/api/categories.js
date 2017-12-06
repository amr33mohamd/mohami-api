app.get('/api/categories',function(req,res){
    con.query('SELECT id, name FROM categories', function(err,data) {
        if(!err) {
            res.send(data);
        }
    })
});
