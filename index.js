require('./core/index');
sql = require('./core/models/sql');
full_admin =  require('./models/full_admin');
 translate = require('./core/models/translation');
 tr = translate.translate;

require('./routes/web');
require('./routes/api/search');
require('./routes/api/lawyer');
require('./routes/api/legalinfo');
require('./routes/api/ask');
require('./routes/api/call');
require('./routes/api/meta_data');
require('./routes/api/categories2');
require('./routes/api/categories');
