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

app.get('/api/verify',function(req,res){
  var api = require('../api.js');
  var user_id = req.param('user_id');
  var code = req.param('code');
  con.query('select * from lawyers where id = ?',[user_id],function(err,data){
    if(data[0].verified == 0){
      if(code == data[0].code){
        res.json({response:true});
      }
      else {
        res.json({response:false});
        api.sendSms('your verification code is '+data[0].code,[''+data[0].phone], function(data){
          console.log(data);
        })
      }
    }
    else {
      res.json({response:true});
    }
  })
})
