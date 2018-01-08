
   express = require('express');
   app = express();
  var mysql = require('mysql');
   port = process.env.PORT || 80;
Jimp = require("jimp");
     addSubtractDate = require("add-subtract-date");
    moment = require('moment');
moment().format('L');
  app.set('view engine', 'ejs');
  app.use('/public', express.static('public'));
  app.use('/images', express.static('images'));
  app.use('/books', express.static('books'));
   fileUpload = require('express-fileupload');
   var bodyParser=  require("body-parser");
   app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
fs = require('fs');

app.use(fileUpload());
  con = mysql.createConnection({
  host: "178.62.17.251",
  user: "amr",
  password: "BeRichToGetABitch",
  database:"mydb",

  });

  /*
   con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"snap",
  charset: 'utf8'
  });
*/
//session ----->
var NodeSession = require('node-session');

// init
session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});

var sql1 = "SET CHARACTER SET utf8";
 con.query(sql1, function (err, result) {
 var sql = "SET SESSION collation_connection ='utf8_general_ci";
 con.query(sql,  function (err, result) {
  con.query('SET NAMES \'UTF8\'',function(err,res){

  })
 });
 });


  app.listen(port,function(){
    console.log('listenning on port '+port);

  });
