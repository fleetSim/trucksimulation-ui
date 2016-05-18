var Router = require('./Router');
var Controller = require('./Controller');

var router = new Router({controller: new Controller()});

module.exports = router;