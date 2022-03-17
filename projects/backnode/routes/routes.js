var express = require("express")
var app = express();
var router = express.Router();
var IndexController = require("../controllers/IndexController");


router.post('/', IndexController.login);
router.get('/', IndexController.home);
router.get('/index', IndexController.index);
router.post('/replicacoes', IndexController.searchComands);
router.get('/representante', IndexController.searchRepresentative);


module.exports = router;