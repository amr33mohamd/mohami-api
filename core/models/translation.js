exports.translate = function(key,lang,callback){
  const sql = require('./sql')
  const qry = sql.query
  switch (lang) {
    case 'ar':
      lang_code = 1;
      break;
    case 'en':
      lang_code = 2;
      break;
    default:
      lang_code = 0;
  }

 con.query('select * from translation_value where translation_key_id = ? and lang = ?',[key,lang_code],(err,data)=>{
  if(data.length == 0){
    con.query('select * from translation_value where translation_key_id = ? ',[key],(err,data)=>{
      callback(data[0].value);
    });
  }
  else {
    callback(data[0].value)
  }
})
}
