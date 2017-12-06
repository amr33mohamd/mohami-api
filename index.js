require('./core/index');
sql = require('./core/models/sql');
full_admin =  require('./models/full_admin');;
require('./routes/web');
require('./routes/api/homescreen');
require('./routes/api/categories');
require('./routes/api/sub_categories');
require('./routes/api/books_of_cat');
require('./routes/api/books_of_subcat');
