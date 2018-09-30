app.get('/api/categories',function(req,res){
  var places = [];
  var services = [];
  var types = [];
  var years = [];
  var lang = req.param('lang');
  var new_places= [];
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
                                    res.json({
                                      places:new_places,
                                      years:new_years,
                                      services:new_services,
                                      types:new_types
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
