var Router = require('./Router');
var controller = require('./controller');
var router = new Router({controller: controller});

module.exports = router;