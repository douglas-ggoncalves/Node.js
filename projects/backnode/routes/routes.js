var express = require("express")
var app = express();
var router = express.Router();
var IndexController = require("../controllers/IndexController");


router.get('/', IndexController.home);
router.get('/index', IndexController.index);
router.post('/replic', IndexController.searchComands);


module.exports = router;