app.get('/api/categories',function(req,res){
  var places = [];
  var services = [];
  var types = [];
  var years = [];
  var lang = req.param('lang');
  var new_places= [];
  var new_smallplaces= [];

  var new_services = [];
  var new_years = [];
  var new_types = [];
    con.query('select * from places', function(err,places) {
      for(let i in places){
        tr(places[i].name,lang,(name)=>{
          new_places.push({
            value:places[i].id,
            label:name
          })
          if(i == places.length-1){
            con.query('select * from services',function(err,services){
              for(let m in services){
                tr(services[m].name,lang,(name)=>{
                  new_services.push({
                    value:services[m].id,
                    label:name
                  })
                  if(m == services.length-1 ){
                    con.query('select * from years',function(err,years){
                      for(let n in years){
                        tr(years[n].name,lang,(name)=>{
                          new_years.push({
                            value:years[n].id,
                            label:name
                          })
                          if(n == years.length-1 ){
                            con.query('select * from types',function(err,types){
                              for(let o in types){
                                tr(types[o].name,lang,(name)=>{
                                  new_types.push({
                                    value:types[o].id,
                                    label:name
                                  })
                                  if(o == types.length-1 ){
                                    con.query('select * from smallplaces',function(err,smallplaces){
                                      for(let l in smallplaces){
                                        tr(smallplaces[l].name,lang,(name)=>{
                                          new_smallplaces.push({
                                            value:smallplaces[l].id,
                                            label:name
                                          })
                                          if(l == smallplaces.length-1 ){
                                            res.json({
                                              places:new_places,
                                              years:new_years,
                                              services:new_services,
                                              types:new_types,
                                              smallplaces:new_smallplaces
                                            })
                                          }
                                        })
                                      }
                                    })
                                  }
                                })
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
});

app.get('/api/smallplaces',function(req,res){
  var id = req.param('id');
  var lang = req.param('lang');
  var new_smallplaces= [];

  if(id != 0 ){
  con.query('select * from smallplaces where place_id = ? ',[id],function(err,smallplaces){
    if(smallplaces.length == 0){
      res.json({smallplaces: [
{
value: 1,
label: "اختر دوله اولا"
}
]
})
    }
    else {
    for(let l in smallplaces){
      tr(smallplaces[l].name,lang,(name)=>{
        new_smallplaces.push({
          value:smallplaces[l].id,
          label:name
        })
        if(l == smallplaces.length-1 ){
          res.json({
            smallplaces:new_smallplaces
          })
        }
      })
    }
  }
  })
}
else {
  res.json({smallplaces: [
  {
  value: 1,
  label: "اختر دوله اولا"
  }
  ]
  })
}
})
