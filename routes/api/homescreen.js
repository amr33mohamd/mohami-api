app.get('/api/homescreen',function(req,res){
  var cat_num = 3;
  var res_categories = [];
  sql.select('categories','1','1',function(categories){
    res.send('here :'+categories[cat_num].id);
  })

});
// var group_id = req.param('group_id');
