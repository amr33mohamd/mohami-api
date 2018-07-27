app.get('/api/single_lawyer',function(req,res){

  var id = req.param('id');

    con.query('select * from lawyers where id = ? ',[id], function(err,lawyer) {
      res.json({ lawyer:lawyer[0]})
    })
});
app.get('/api/add_lawyer',function(req,res){

  var name = req.param('name');
  var place = req.param('place');
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


    con.query('insert into lawyers(name,place,type,years,clients,line,phone,bio,sex,address,facebook,insta,twitter,web,email,fax,service) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ',[name,
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
service], function(err,data) {
      if(!err){
        res.json({response:true})
      }
      else {
        res.json({response:false})
      }
    })
});
