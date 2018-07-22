app.get('/api/legal_info',function(req,res){
  var lang = req.param('lang')
  var data = [];
    con.query('select * from legalinfo', function(err,info) {
      for(let i in info ){
        tr(info[i].title,lang,(title)=>{
          tr(info[i].text,lang,(text)=>{
            data.push({
              id:info[i].id,
              title,
              text
            })
            if(i == info.length-1){
              res.json({data})
            }
          })
        })
      }
    })
});
