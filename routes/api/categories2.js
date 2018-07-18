app.get('/api/categories2',function(req,res){
  var places = [];
  var services = [];
  var types = [];
  var years = [];
  var lang = req.param('lang');
  var new_places= [];
  var new_services = [];
  var new_years = [];
  var new_types = [];
  var _ = require('lodash');

    con.query('select * from places', function(err,places) {
      for(let i in places){
        tr(places[i].name,lang,(name)=>{
          place = places[i].id;
          new_places.push({
            [place]:name
          })
          if(i == places.length-1){
            con.query('select * from services',function(err,services){
              for(let m in services){
                tr(services[m].name,lang,(name)=>{
                  service = services[m].id;
                  if(new_services[0]){
                      new_services.push({
                        [service]:name
                      })
                    }
                    else {
                    new_services.push({
                      [service]:name
                    })
                  }

                  if(m == services.length-1 ){
                    con.query('select * from years',function(err,years){
                      for(let n in years){
                        tr(years[n].name,lang,(name)=>{
                          year = years[n].id
                          new_years.push({
                            [year]:name
                          })
                          if(n == years.length-1 ){
                            con.query('select * from types',function(err,types){
                              for(let o in types){
                                tr(types[o].name,lang,(name)=>{
                                  type = types[o].id
                                  new_types.push({
                                    [type]:name
                                  })
                                  if(o == types.length-1 ){
                                    res.json({
                                      places:_.assign.apply(_, new_places),
                                      years: _.assign.apply(_, new_years),
                                      services:_.assign.apply(_, new_services),
                                      types:_.assign.apply(_, new_types)
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
