app.get('/api/search',function(req,res){

  var place = req.param('place');
  var type = req.param('type');
  var years = req.param('years');
  var sex = req.param('sex');
  var all = req.param('all');
  if(all == 1){
    con.query('select id,image from lawyers where status = 1', function(err,lawyers) {
      res.json({ lawyers})
    })
  }
  else {
    con.query('select id,image from lawyers where place = ? and type = ? and years = ? and sex = ? and status = 1',[place,type,years,sex], function(err,lawyers) {
      res.json({ lawyers})
    })
  }
});
