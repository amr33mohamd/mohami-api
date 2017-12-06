app.get('/api/sub_categories',function(req,res){
    var parent_cat_id = req.param("parent_cat_id");
    con.query('SELECT id, name FROM sub_categories WHERE parent_category_id=?', [parent_cat_id], function(err,data) {
        if(!err) {
            res.send(data);
        }
        else
        {
            res.send(err);
        }
    })
});
