require('./core/index');
sql = require('./core/models/sql');
full_admin =  require('./models/full_admin');;
require('./routes/web');
require('./routes/api/homescreen');
require('./routes/api/categories');
require('./routes/api/sub_categories');
require('./routes/api/books_of_cat');
require('./routes/api/books_of_subcat');
require('./routes/api/screenshots_of_book');
require('./routes/api/comments_of_book');
require('./routes/api/desc_of_book');
require('./routes/api/price_of_book');
require('./routes/api/dllink_of_book');
require('./routes/api/my_library.js');
require('./routes/api/signup.js');
require('./routes/api/signin.js');
require('./routes/api/orders.js');
require('./routes/api/add_comment.js');
require('./routes/api/search.js');
