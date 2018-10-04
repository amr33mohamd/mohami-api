app.get('/api/search',function(req,res){

  var place = req.param('place');
  var smallplace = req.param('smallplace');

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
    con.query('select id,image from lawyers where place = ? and type = ? and years = ? and sex = ? and smallplace=? and status = 1',[place,type,years,sex,smallplace], function(err,lawyers) {
      if(lawyers.length == 0){
        con.query('select id,image from lawyers where  status = 1', function(err,lawyers2) {
          res.json({ lawyers:lawyers2})

        });
      }
      else {
        res.json({ lawyers})
      }
    })
  }
});
