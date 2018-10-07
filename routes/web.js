app.get('/terms-and-condition-and-policy', function(req, res) {
	res.render('index');
});

app.get('/dashboard', function(req, res) {
	res.render('login');
});
app.get('/login', function(req, response) {
	var email = req.param('email');
	var password = req.param('password');


	var sql = 'select * from admins where email = ? and password = ? ';
	con.query(sql, [email, password], function(err, res) {
		if(res.length == 1){
		// if (email = 'admin' && password== 'jkhj@3#$%h^6fc') {
			session.startSession(req, response, function() {
				//fake session ------->
				req.session.put('rule', '1');
				response.redirect('/services');
			});
		} else {
			response.redirect('/dashboard');
		}

	 });
});
app.post('/api/upload',function(req,res){
	console.log(req)
	var random_num = Math.random();

	var image_link = 'public/images/' + random_num+ '.jpg';
	req.files.photo.mv(image_link);
	res.json({image_url:image_link})
	// con.query('insert into admins(email) value(?)',[req.body],function(data,err){
	// 	console.log(data)
	// })
})

app.get('/admin',function(req,res){
	var sql = 'select * from admins ';
	con.query(sql, function(err, ress) {
		res.render('admin',{admin:ress[0]})
	});

})

app.get('/admin_action',function(req,res){
	var email = req.param('email');
	var password = req.param('password');
	con.query('UPDATE `admins` SET `email`=?,`password`=?',[email,password],function(err,ress){
		if(!err){
			res.redirect('/admin')
		}
		else{
			res.send(err)
		}
	})
})
//full admin control -------------->
app.get('/lawyers', function(req, res) {
	session.startSession(req, res, function() {
		var rule = req.session.get('rule');
		var services2 = [];
		var types2 = [];
		var years2 = [];
			if(rule == 1 ){
				sql.select('lawyers', '1', '1', function(lawyers) {
					sql.select('services', '1', '1', function(services) {
						for(let i in services){
			        tr(services[i].name,'ar',(name)=>{
			          services2.push({
			            id:services[i].id,
			            value:name
			          })
							});
						}
						sql.select('types', '1', '1', function(types) {
							for(let i in types){
				        tr(types[i].name,'ar',(name)=>{
				          types2.push({
				            id:types[i].id,
				            value:name
				          })
								});
							}
							sql.select('years', '1', '1', function(years) {
								var years3 = []
								for(let m in years){
					        tr(years[m].name,'ar',(name)=>{
					          years3.push({
					            id:years[m].id,
					            value:name
					          })
										if(m == years.length-1){
											res.render('users', { data: lawyers, services2,types2,years2:years3 });

										}
									});
								}
							});
						});
					});
				});
			}
			else {
				res.redirect('/dashboard');
			}
	});
});

app.get('/requests', function(req, res) {
	session.startSession(req, res, function() {
		sql.select('requests', '1', '1', function(users) {
			res.render('requests', { data: users });
		});
	});
});
app.get('/calls', function(req, res) {
	session.startSession(req, res, function() {
		sql.select('calls', '1', '1', function(users) {
			res.render('calls', { data: users });
		});
	});
});


app.get('/ads', function(req, res) {
	session.startSession(req, res, function() {
		sql.select('ads', '1', '1', function(ads) {
			res.render('ads', { ads });
		});
	});
});

app.get('/add-ad', function(req, res) {
	session.startSession(req, res, function() {
		sql.select('ads', '1', '1', function(data) {
			res.render('add-ad', { data });
		});
	});
});
app.post('/lawyer-image',function(req,res){
	var id = req.body.id;
	var image = req.files.image;
	var random_num = Math.random();
	var domain = 'http://' + req.get('host');

	var image_link = 'public/images/' + random_num + '.jpg';
	image.mv(image_link);
	sql.update('lawyers','image',domain + '/' + image_link,'id',id,function(data){
		if(data){
			res.redirect('/lawyers')
		}
		else {
			res.json({data})
		}
	})

})
app.get('/delete-ad', function(req, res) {
	var id = req.param('id');
	sql.delete('ads', 'id', id, function(data) {
		if (data) {
			res.redirect('/ads');
		} else {
			res.send('please contact programmer if you got that error again');
		}
	});
});

app.post('/add_ad', function(req, res) {
	var image = req.files.image;
	var title = req.body.title;
	var random_num = Math.random();
	var domain = 'http://' + req.get('host');

	var image_link = 'images/' + random_num + '.jpg';
	image.mv(image_link);

	con.query(
		'insert into ads(title,image) values(?,?)',
		[
			title,
			(domain + '/' + image_link)
		],
		function(err, ress) {
			if (err) {
				res.send(err);
			} else {
				res.redirect('/add-ad');
			}
		}
	);
});

app.get('/add-categories', function(req, res) {
	session.startSession(req, res, function() {
		sql.select('categories', '1', '1', function(categories) {
			res.render('add-categories', { categories });
		});
	});
});
app.get('/api/add-token',function(req,res){
	var token = req.param('token');
	sql.select('tokens','token',token,function(data){
		if(data.length == 0 ){
			con.query('insert into tokens(token) values(?)',[token],function(err,data){
				if(!err){
					res.json({response:1});
				}
				else {
					res.json({response:0});
				}
			})
		}
		else {
			res.json({response:0});
		}

	})
})
app.get('/notify',function(req,res){
	res.render('notify');
})
app.get('/terms',function(req,res){
	res.render('terms');
})


app.get('/terms-edit',function(req,res){
	var new_ar_name = req.param('new_ar_name');
	var new_en_name = req.param('new_en_name');

	sql.dupdate('translation_value', 'value', new_ar_name, 'translation_key_id', '11','lang','1', function(data) {
		sql.dupdate('translation_value', 'value', new_en_name, 'translation_key_id', '11','lang','2', function(data) {
		res.redirect('/terms');
		});
	});
})

app.get('/send_notify',function(req,res){
var	message = req.param('message');
	sql.select('tokens','1','1',function(data){
		if(SendPushNotifications(data,message)){
			res.redirect('/notify')
		}

	})
})
function SendPushNotifications(pushTokens,message_body)
{
	var fetch = require('node-fetch')
    // Create the messages that you want to send to clents
    for (let i in pushTokens) {
			var body = {"to": pushTokens[i].token,  "sound": "default","title":"Lawyers App","body": message_body};
			fetch('https://exp.host/--/api/v2/push/send', { method: 'POST', body: JSON.stringify(body) }).then(res => res.json())
	    .then(json => console.log(json))
			if(i == pushTokens.length-1){
				return true
			}
    }


}
app.post('/add_category', function(req, res) {
	var name = req.body.name;

	con.query('insert into categories(name) values(?)', [name], function(
		err,
		ress
	) {
		if (err) {
			res.send(err);
		} else {
			res.send('done .....');
		}
	});
});



app.get('/delete-category', function(req, res) {
	var cat_id = req.param('id');
	sql.delete('categories', 'id', cat_id, function(data) {
		if (data) {
			sql.delete('sub_categories', 'parent_category_id', cat_id, function(
				data
			) {
				if (data) {
					res.redirect('/categories');
				} else {
					res.send('please contact programmer if you got that error again 2');
				}
			});
		} else {
			res.send('please contact programmer if you got that error again');
		}
	});
});

app.get('/change-category', function(req, res) {
	var id = req.param('id');
	var what = req.param('what');
	var new_name = req.param('new_name');
	sql.update('categories', what, new_name, 'id', id, function(data) {
		res.send(data);
	});
});

app.get('/services', function(req, res) {
	session.startSession(req, res, function() {
		var services2 = [];
		sql.select('services', '1', '1', function(services) {
			for(let i in services){
				tr(services[i].name,'ar',(ar)=>{
					tr(services[i].name,'en',(en)=>{
					services2.push({
						id:services[i].name,
						ar,
						en,
					})
					if(i == services.length-1){
						res.render('services', { services:services2 });
					}
					});
				});
			}
			});
		});
	});
	app.get('/types', function(req, res) {
		session.startSession(req, res, function() {
			var services2 = [];
			sql.select('types', '1', '1', function(services) {
				for(let i in services){
					tr(services[i].name,'ar',(ar)=>{
						tr(services[i].name,'en',(en)=>{
						services2.push({
							id:services[i].name,
							ar,
							en,
						})
						if(i == services.length-1){
							res.render('types', { services:services2 });
						}
						});
					});
				}
				});
			});
		});
		app.get('/years', function(req, res) {
			session.startSession(req, res, function() {
				var services2 = [];
				sql.select('years', '1', '1', function(services) {
					for(let i in services){
						tr(services[i].name,'ar',(ar)=>{
							tr(services[i].name,'en',(en)=>{
							services2.push({
								id:services[i].name,
								ar,
								en,
							})
							if(i == services.length-1){
								res.render('years', { services:services2 });
							}
							});
						});
					}
					});
				});
			});

			app.get('/places', function(req, res) {
				session.startSession(req, res, function() {
					var services2 = [];
					sql.select('places', '1', '1', function(services) {
						for(let i in services){
							tr(services[i].name,'ar',(ar)=>{
								tr(services[i].name,'en',(en)=>{
								services2.push({
									id:services[i].name,
									ar,
									en,
								})
								if(i == services.length-1){
									res.render('places', { services:services2 });
								}
								});
							});
						}
						});
					});
				});
				app.get('/smallplaces', function(req, res) {
					session.startSession(req, res, function() {
						var services2 = [];
						var new_places = [];

						sql.select('smallplaces', '1', '1', function(services) {
							if(services.length > 0 ){
							for(let i in services){
								tr(services[i].name,'ar',(ar)=>{
									tr(services[i].name,'en',(en)=>{
									services2.push({
										id:services[i].id,
										ar,
										en,
										place_id:services[i].place_id
									})
									if(i == services.length-1){
										sql.select('places', '1', '1', function(places) {
											if(places.length > 0 ){
											for(let m in places){
												tr(places[m].name,'ar',(ar)=>{
													tr(places[m].name,'en',(en)=>{
													new_places.push({
														id:places[m].id,
														ar,
														en,
													})
													if(m == places.length-1){
														res.render('smallplaces', { services:services2,places:new_places });
													}
													});
												});
											}
										}
										else {
											res.render('smallplaces', { services:services });

										}
											});									}
									});
								});
							}
						}
						else {
							res.render('smallplaces', { services:services });

						}
							});
						});
					});


					app.get('/edit-smallplace', function(req, res) {
						var id = req.param('id');
						var place_id = req.param('place_id');
						sql.update('smallplaces', 'place_id', place_id, 'id', id, function(data,err) {
							res.json({data,err});
						});
					});
				app.get('/legalinfo', function(req, res) {
					session.startSession(req, res, function() {
						var services2 = [];
						sql.select('legalinfo', '1', '1', function(services) {
							for(let i in services){
								tr(services[i].title,'ar',(titlear)=>{
									tr(services[i].title,'en',(titleen)=>{
										tr(services[i].text,'ar',(textar)=>{
											tr(services[i].text,'en',(texten)=>{
													services2.push({
														id:services[i].id,
														title:services[i].title,
														text:services[i].text,
														titlear,
														titleen,
														textar,
														texten
													})
													if(i == services.length-1){
														res.render('legalinfo', { services:services2 });
													}
											});
										});
									});
								});
							}
							});
						});
					});
app.get('/add_translate',function(req,res){
	var table = req.param('table');
	var ar = req.param('ar');
	var en = req.param('en');
	con.query('insert into translation_key(name) values(?)',[table+'_name'],function(err,data1){
		con.query('insert into translation_value(value,lang,translation_key_id) values(?,?,?);insert into translation_value(value,lang,translation_key_id) values(?,?,?)',[ar,1,data1.insertId,en,2,data1.insertId],function(err2,data2){
				con.query('insert into '+table+'(name) values(?)',[data1.insertId],function(err,data4){
					if(!err){
						res.redirect('/'+table)
					}
					else {
						res.send(err)
					}
			})
		})
	})
})

app.get('/add_translate2',function(req,res){
	var table = req.param('table');
	var textar = req.param('textar');
	var texten = req.param('texten');
	var titlear = req.param('titlear');
	var titleen = req.param('titleen');

	con.query('insert into translation_key(name) values(?)',[table+'_title'],function(err,data1){
		con.query('insert into translation_value(value,lang,translation_key_id) values(?,?,?);insert into translation_value(value,lang,translation_key_id) values(?,?,?)',[titlear,1,data1.insertId,titleen,2,data1.insertId],function(err2,data2){
			con.query('insert into translation_key(name) values(?)',[table+'_text'],function(err,data3){
				con.query('insert into translation_value(value,lang,translation_key_id) values(?,?,?);insert into translation_value(value,lang,translation_key_id) values(?,?,?)',[textar,1,data3.insertId,texten,2,data3.insertId],function(err2,data4){

				con.query('insert into '+table+'(title,text) values(?,?)',[data1.insertId,data3.insertId],function(err,data5){
					if(!err){
						res.redirect('/'+table)
					}
					else {
						res.send(err)
					}
			})
		});
	});
		})
	})
})
app.get('/add-subcategories', function(req, res) {
	session.startSession(req, res, function() {
		sql.select('categories', '1', '1', function(categories) {
			sql.select('sub_categories', '1', '1', function(sub_categories) {
				res.render('add-subcategories', { categories, sub_categories });
			});
		});
	});
});

app.post('/add_subcategory', function(req, res) {
	var name = req.body.name;
	var category = req.body.category;

	con.query(
		'insert into sub_categories(name,parent_category_id) values(?,?)',
		[name, category],
		function(err, ress) {
			if (err) {
				res.send(err);
			} else {
				res.redirect('/add-subcategories');
			}
		}
	);
});

app.get('/change-parent-category', function(req, res) {
	var id = req.param('id');
	var new_parent_cat = req.param('new_parent_cat');

	con.query(
		'update sub_categories set parent_category_id=? where id=?',
		[new_parent_cat, id],
		function(err, res) {
			if (err) {
				res.send(err);
			}
		}
	);
});

app.get('/delete-subcategory', function(req, res) {
	var cat_id = req.param('id');
	sql.delete('sub_categories', 'id', cat_id, function(data) {
		if (data) {
			res.redirect('/subcategories');
		} else {
			res.send('please contact programmer if you got that error again');
		}
	});
});

app.get('/ttest', function(req, res) {
	var mysqll = require('mysql');

	var conn = mysqll.createConnection({
		host: '127.0.0.1',
		user: 'root',
		password: 'BeRichToGetABitch'
	});

	conn.connect(function(err) {
		if (err) {
			res.send('the error is' + err);
		} else {
			res.send('connected');
			conn.query('FLUSH PRIVILEGES', function(err, ress) {
				if (ress) {
					res.send('done');
				} else {
					res.send(err);
				}
			});
		}
	});
});

function FormatOrders(unformatted_orders, callback) {
	var orders = [];
	unformatted_orders.forEach(function(order, index, array) {
		con.query(
			'SELECT name,price,link FROM books where id=? LIMIT 1',
			[order['book_id']],
			function(err, books) {
				if (!err) {
					con.query(
						'SELECT name,email,country,address,currency FROM users where id=? LIMIT 1',
						[order['user_id']],
						function(err, users) {
							if (!err) {
								var bookObj = {
									name: books[0].name,
									link: books[0].link,
									price: books[0].price
								};
								var userObj = {
									name: users[0].name,
									email: users[0].email,
									country: users[0].country,
									address: users[0].address,
									currency: users[0].currency
								};
								var formatted_order = {
									id: order['id'],
									user: userObj,
									book: bookObj,
									method: order['method'],
									status: order['status']
								};
								orders.push(formatted_order);

								if (index === array.length - 1) callback(orders);
							}
						}
					);
				}
			}
		);
	});
}

app.get('/orders', function(req, res) {
	session.startSession(req, res, function() {
		sql.select('orders', '1', '1', function(unformatted_orders) {
			if (unformatted_orders.length == 0) {
				res.send('we checked your orders and there are still no orders');
			} else {
				FormatOrders(unformatted_orders, function(orders) {
					res.render('orders', { orders });
				});
			}
		});
	});
});

app.get('/change-order-status', function(req, res) {
	var id = req.param('id');
	var status = req.param('status');

	con.query('update orders set status=? where id=?', [status, id], function(
		err,
		ress
	) {
		if (err) res.send(err);
		else res.redirect('/orders');
	});
});

app.get('/books', function(req, res) {
	session.startSession(req, res, function() {
		sql.select('books', '1', '1', function(data) {
			res.render('books', { users: data });
		});
	});
});

app.get('/add-books', function(req, res) {
	session.startSession(req, res, function() {
		sql.select('categories', '1', '1', function(categories) {
			sql.select('sub_categories', '1', '1', function(sub_categories) {
				sql.select('books', '1', '1', function(data) {
					res.render('add-books', { categories, sub_categories, data });
				});
			});
		});
	});
});

app.post('/add_book', function(req, res) {
	var image = req.files.image;
	var category_id = req.body.category;
	var sub_category_id = req.body.sub_category;
	var name = req.body.name;
	var desc = req.body.desc;

	var height = req.body.height;
	var width = req.body.width;
	var pagesnum = req.body.pagesnum;
	var binding = req.body.binding;

	var fake_price = req.body.fakeprice || 0;
	var author_name = req.body.authorname;
	var pdf = req.files.pdf || null;
	var domain = 'http://' + req.get('host');
	var price = req.body.price || null;
	var shot1 = req.files.shot1 || null;
	var shot2 = req.files.shot2 || null;
	var shot3 = req.files.shot3 || null;
	var shot4 = req.files.shot4 || null;
	var random_num = Math.random();

	image.mv('images/' + random_num + '.jpg', function(err) {
		if (pdf != null) {
			pdf.mv('books/' + random_num + 1 + '.jpg', function(err) {});
		}
	});

	var image_link = 'images/' + random_num + '.jpg';
	if (pdf == null) {
		var pdf_link = '';
	} else {
		var pdf_link = domain + '/books/' + random_num + 1 + '.jpg';
	}

	con.query(
		'insert into books(name,descc,image,link,price,author_name,category_id,sub_category_id,fake_price,height,width,pagesnum,binding) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
		[
			name,
			desc,
			domain + '/images/' + random_num + '.jpg',
			pdf_link,
			price,
			author_name,
			category_id,
			sub_category_id,
			fake_price,
			height,
			width,
			pagesnum,
			binding
		],
		function(err, ress) {
			if (err) {
				res.send(err);
			} else {
				var inserted_id = ress.insertId;
				if (shot1 != null) {
					shot1.mv('images/' + random_num + 2 + '.jpg', function(err) {
						con.query(
							'insert into screenshots(name,book_id) values(?,?)',
							[domain + '/images/' + random_num + 2 + '.jpg', inserted_id],
							function(err, resss) {}
						);
					});
				}

				if (shot2 != null) {
					shot2.mv('images/' + random_num + 3 + '.jpg', function(err) {
						con.query(
							'insert into screenshots(name,book_id) values(?,?)',
							[domain + '/images/' + random_num + 3 + '.jpg', inserted_id],
							function(err, aresss) {}
						);
					});
				}

				if (shot3 != null) {
					shot3.mv('images/' + random_num + 4 + '.jpg', function(err) {
						con.query(
							'insert into screenshots(name,book_id) values(?,?)',
							[domain + '/images/' + random_num + 4 + '.jpg', inserted_id],
							function(err, bresss) {}
						);
					});
				}

				if (shot4 != null) {
					shot4.mv('images/' + random_num + 5 + '.jpg', function(err) {
						con.query(
							'insert into screenshots(name,book_id) values(?,?)',
							[domain + '/images/' + random_num + 5 + '.jpg', inserted_id],
							function(err, dbresss) {}
						);
					});
				}
				res.redirect('/add-books');
			}
		}
	);
});

app.get('/reduce', function(req, res) {
	sql.select('books', '1', '1', function(books) {
		for (let i in books) {
			if (i == books.length - 1) {
				res.send('done sir amr ......');
			}
		}
	});
});

app.get('/garash-pay', function(req, res) {
	res.render('garash-pay');
});

app.get('/make-admin', function(req, res) {
	var user_id = req.param('user_id');
	full_admin.makeAdmin(user_id, function(data) {
		if (data) {
			res.redirect('/users');
		} else {
			res.send('please contact the programmer there is error in database');
		}
	});
});

app.get('/add_user', function(req, res) {
	var name = req.param('name');
	var email = req.param('email');
	var password = req.param('password');
	full_admin.addUser(name, email, password, function(data) {
		if (data) {
			res.redirect('/users');
		} else {
			res.send('please contact the programmer there is error in database');
		}
	});
});

app.get('/block', function(req, res) {
	var user_id = req.param('user_id');
	full_admin.block(user_id, function(data) {
		if (data) {
			res.redirect('/users');
		} else {
			res.send('please contact the programmer there is error in database');
		}
	});
});

app.get('/edit-book-images', function(req, res) {
	var id = req.param('id');
	sql.select('books', 'id', id, function(book) {
		sql.select('screenshots', 'book_id', id, function(screenshots) {
			res.render('edit-book-images', { book, screenshots });
		});
	});
});

app.get('/delete-screen', function(req, res) {
	var id = req.param('id');
	var book_id = req.param('book_id');
	sql.select('screenshots', 'id', id, function(screen) {
		let full_dir = screen[0].name;
		let name_array = full_dir.split('/');
		let new_dir = name_array[3] + '/' + name_array[4];
		fs.unlinkSync(new_dir);
		sql.delete('screenshots', 'id', id, function(ress) {
			if (ress) {
				res.redirect('/edit-book-images?id=' + book_id);
			} else {
				res.send('some thing wrong plaese contact programmer');
			}
		});
	});
});

app.post('/add_screen', function(req, res) {
	var random_num = Math.random();
	var book_id = req.body.book_id;
	var shot4 = req.files.image;
	var domain = 'http://' + req.get('host');
	shot4.mv('images/' + random_num + 6 + '.jpg', function(err) {
		con.query(
			'insert into screenshots(name,book_id) values(?,?)',
			[domain + '/images/' + random_num + 6 + '.jpg', book_id],
			function(err, dbresss) {
				if (err) {
					res.send(err);
				} else {
					res.redirect('/edit-book-images?id=' + book_id);
				}
			}
		);
	});
});

app.post('/change-image', function(req, res) {
	var random_num = Math.random();
	var book_id = req.body.book_id;
	var shot4 = req.files.image;
	var domain = 'http://' + req.get('host');

	sql.select('books', 'id', book_id, function(book) {
		let full_dir = book[0].image;
		let name_array = full_dir.split('/');
		let new_dir = name_array[3] + '/' + name_array[4];
		if (fs.unlinkSync(new_dir) == null) {
			sql.update(
				'books',
				'image',
				domain + '/images/' + random_num + 7 + '.jpg',
				'id',
				book_id,
				function(ress) {
					if (ress) {
						res.redirect('/edit-book-images?id=' + book_id);
					} else {
						res.send('some thing wrong plaese contact programmer');
					}
				}
			);
		}
	});

	shot4.mv('images/' + random_num + 7 + '.jpg', function(err) {
	});
});

app.get('/delete-user', function(req, res) {
	var user_id = req.param('id');
	sql.delete('lawyers', 'id', user_id, function(data) {
		if (data) {
			res.redirect('/lawyers');
		} else {
			res.send('please contact programmer if you got that error again');
		}
	});
});

app.get('/delete-book', function(req, res) {
	var book_id = req.param('id');
	sql.delete('books', 'id', book_id, function(data) {
		if (data) {
			sql.delete('my_library', 'book_id', book_id, function(reso) {
				if (reso) {
					con.query(
						'SELECT id, MyLibraryBooksIDs FROM users WHERE MyLibraryBooksIDs LIKE ?',
						['%' + book_id + '%'],
						function(err, user) {
							if (!err) {
								for (let i in user) {
									var updateLibrary = user[i]['MyLibraryBooksIDs'].replace(
										String(book_id),
										''
									);
									updateLibrary = updateLibrary.replace(',,', ',');
									if (updateLibrary[0] == ',')
										updateLibrary = updateLibrary.slice(1);
									if (updateLibrary[updateLibrary.length - 1] == ',')
										updateLibrary = updateLibrary.slice(0, -1);
									con.query(
										'update users set MyLibraryBooksIDs=? where id=?',
										[updateLibrary, user[i]['id']],
										function(err, ress) {}
									);

									if (i == user.length - 1) {
										res.redirect('/books');
									}
								}
							}
						}
					);
				}
			});
		} else {
			res.send('please contact programmer if you got that error again');
		}
	});
});

app.get('/pay-per-month', function(req, res) {
	var user_id = req.param('user_id');
	var months = req.param('months');
	full_admin.pay_per_month(user_id, months, function(data) {
		if (data) {
			res.redirect('/users');
		} else {
			res.send(
				'please contact programmer the error may be in database or package called moment.js or add-substract-date'
			);
		}
	});
});
app.get('/privacy',function(req,res){
	res.render('privacy');
})
app.get('/edit-translate', function(req, res) {
	var id = req.param('id');
	var what = req.param('what');
	var new_name = req.param('new_name');
	sql.dupdate('translation_value', 'value', new_name, 'translation_key_id', id,'lang',what, function(data) {
		res.send(data);
	});
});

app.get('/edit-user', function(req, res) {
	var id = req.param('id');
	var what = req.param('what');
	var value = req.param('value');
	sql.update('lawyers', what, value, 'id', id, function(data,err) {
		res.json({data,err});
	});
});

app.get('/change-book', function(req, res) {
	var id = req.param('id');
	var what = req.param('what');
	var new_name = req.param('new_name');
	sql.update('books', what, new_name, 'id', id, function(data) {
		res.send(data);
	});
});

/* -------------------------------------- API ----------------------------------------- */
app.get('/api/users', function(req, res) {
	sql.select('users', 'work', '1', function(data) {
		if (data.length != 0) {
			var single = [];
			var result = [];
			for (let i in data) {
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth(); //January is 0!
				var yyyy = today.getFullYear();
				var day = yyyy + '-' + mm + '-' + dd;
				if (moment(data[i].pay).isAfter(day)) {
					if (single.length == 1) {
						if (
							single.push({
								name: data[i].name,
								avatar_url: data[i].image,
								id: data[i].id,
								special: true
							})
						) {
							if (result.push(single)) {
								single = [];
							}
						}
					} else {
						single.push({
							name: data[i].name,
							avatar_url: data[i].image,
							id: data[i].id,
							special: true
						});
						if (i == data.length - 1) {
							result.push(single);
						}
					}
					if (i == data.length - 1) {
						//second loop

						var single1 = [];

						for (let m in data) {
							var today = new Date();
							var dd = today.getDate();
							var mm = today.getMonth(); //January is 0!
							var yyyy = today.getFullYear();
							var day = yyyy + '-' + mm + '-' + dd;
							if (moment(data[m].pay).isAfter(day) == false) {
								if (single1.length == 1) {
									if (
										single1.push({
											name: data[i].name,
											avatar_url: data[m].image,
											id: data[m].id,
											special: false
										})
									) {
										if (result.push(single1)) {
											single1 = [];
										}
									}
								} else {
									single1.push({
										name: data[m].name,
										avatar_url: data[m].image,
										id: data[m].id,
										special: false
									});

									if (m == data.length - 1) {
										result.push(single1);
									}
								}
							} // end if special
							if (m == data.length - 1) {
								res.send(result);
								console.log(result.length);
							}
						} // end for looop
					}
				} // end if special
			} // end for looop
		} else {
			//there is  data
			//there is no data
			res.send([[{ name: false }]]);
		}
	});
});

app.get('/api/fav', function(req, res) {
	var user_id = req.param('user_id');
	sql.select('likes', 'someone_id', user_id, function(data1) {
		if (data1.length != 0) {
			var single = [];
			var result = [];

			for (let i in data1) {
				console.log(i);
				sql.select('users', 'id', data1[i].liked_id, function(data) {
					if (single.length == 1) {
						if (
							single.push({
								name: data[0].name,
								avatar_url: data[0].image,
								id: data[0].id
							})
						) {
							if (result.push(single)) {
								single = [];
							}
						}
					} else {
						single.push({
							name: data[0].name,
							avatar_url: data[0].image,
							id: data[0].id
						});
						if (i == data1.length - 1) {
							result.push(single);
						}
					}
					if (i == data1.length - 1) {
						res.send(result);
					}
				});
			}
		} else {
			res.send([[{ name: false }]]);
		}
	});
});

//all people  have the same interest -------------->
app.get('/api/interest', function(req, res) {
	var group_id = req.param('group_id');
	sql.select('related_groups', 'group_id', group_id, function(data1) {
		if (data1.length != 0) {
			var single = [];
			var result = [];

			for (let i in data1) {
				console.log(i);
				sql.select('users', 'id', data1[i].user_id, function(data) {
					if (single.length == 1) {
						if (
							single.push({
								name: data[0].name,
								avatar_url: data[0].image,
								id: data[0].id
							})
						) {
							if (result.push(single)) {
								single = [];
							}
						}
					} else {
						single.push({
							name: data[0].name,
							avatar_url: data[0].image,
							id: data[0].id
						});
						if (i == data1.length - 1) {
							result.push(single);
						}
					}
					if (i == data1.length - 1) {
						res.send(result);
					}
				});
			}
		} else {
			res.send([[{ name: false }]]);
		}
	});
});

//all groups -------------->
app.get('/api/interestsscreen', function(req, res) {
	sql.select('groups', '1', '1', function(data1) {
		if (data1.length != 0) {
			var single = [];
			var result = [];

			for (let i in data1) {
				if (single.length == 1) {
					if (
						single.push({
							name: data1[i].name,
							avatar_url: data1[i].image,
							id: data1[i].id
						})
					) {
						if (result.push(single)) {
							single = [];
						}
					}
				} else {
					single.push({
						name: data1[i].name,
						avatar_url: data1[i].image,
						id: data1[i].id
					});
					if (i == data1.length - 1) {
						result.push(single);
					}
				}
				if (i == data1.length - 1) {
					res.send(result);
				}
			}
		} else {
			res.send([[{ name: false }]]);
		}
	});
});

//search screen -------------->

app.get('/api/user', function(req, res) {
	var user_id = req.param('user_id');
	sql.select('users', 'id', user_id, function(user) {
		sql.select('related_groups', 'user_id', user_id, function(groups) {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth(); //January is 0!
			var yyyy = today.getFullYear();
			var day = yyyy + '-' + mm + '-' + dd;
			if (moment(user[0].pay).isAfter(day)) {
				var special = true;
			} else {
				var special = false;
			}
			group = [];
			for (let g in groups) {
				sql.select('groups', 'id', groups[g].group_id, function(group_data) {
					group.push(group_data[0]);
					if (g == groups.length - 1) {
						let data = {
							id: user[0].id,
							name: user[0].name,

							groups: group,
							special: special,
							avatar_url: user[0].image,
							age: user[0].age,
							country: user[0].country,
							bio: user[0].bio
						};
						res.send(data);
					}
				});
			}
		});
	});
});

app.get('/api/trend', function(req, res) {
	var user_id = req.param('someone_id');
	sql.select('users', '1', '1', function(user) {
		var data = [];
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth(); //January is 0!
		var yyyy = today.getFullYear();
		var day = yyyy + '-' + mm + '-' + dd;
		for (let c in user) {
			if (moment(user[c].pay).isAfter(day)) {
				var special = true;
				data.push({
					id: user[c].id,
					name: user[c].name,
					avatar_url: user[c].image,
					special: special
				});
			} else {
				var special = false;
			}
			if (c == user.length - 1) {
				res.send(data);
			}
		}
	});
});
