app.get('/api/single_lawyer',function(req,res){

  var id = req.param('id');

    con.query('select * from lawyers where id = ? ',[id], function(err,lawyer) {
      res.json({ lawyer:lawyer[0]})
    })
});
api = require('../api.js')
app.get('/testsma',function(req,res){
  api.sendSms('your verification code is 111 ','966542668137', function(data){
    console.log(data);
  })
})
app.get('/api/add_lawyer',function(req,res){

  var name = req.param('name');
  var place = req.param('place');
  var smallplace = req.param('smallplace');

  var type = req.param('place');
  var years = req.param('years');
  var clients = req.param('clients');
  var line = req.param('line');
  var phone = req.param('phone');
  var bio = req.param('bio');
  var sex = req.param('sex');
  var address = req.param('address');
  var facebook = req.param('facebook');
  var instagram = req.param('instagram');
  var twitter = req.param('twitter');
  var web = req.param('web');
  var email = req.param('email');
  var fax = req.param('fax');
  var service = req.param('service');
  var code = Math.floor(Math.random()*(89998)+10000); // from 10,000 to 99,999
console.log(phone)
    con.query('insert into lawyers(name,place,type,years,clients,line,phone,bio,sex,address,facebook,insta,twitter,web,email,fax,service,status,code,smallplace) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,?,?) ',[name,
  place,
  type,
  years,
  clients,
  line,
  phone,
  bio,
  sex,
  address,
  facebook,
  instagram,
  twitter,
  web,
  email,
  fax,
service,
code,
smallplace], function(err,data) {
      if(!err){
        api.sendSms('your verification code is '+code,phone, function(data){
          console.log(data);
        })
        res.json({response:data.insertId});
      }
      else {
        console.log(err);
        res.json({response:err})
      }
    })
});
