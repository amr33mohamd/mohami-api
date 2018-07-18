app.get('/api/meta_data',function(req,res){

  var name = req.param('name');
  var lang = req.param('lang');
    con.query('select * from meta_data where name =  ? ',[name], function(err,data) {
      tr(data[0].value,lang,(value)=>{
        res.json({ data:value})
      })
    })
});
