var express = require("express")
var app = express();
var router = express.Router();
var IndexController = require("../controllers/IndexController");
var ReplicController = require("../controllers/ReplicController");
var RepresentativeController = require("../controllers/RepresentativeController");


router.post('/', IndexController.login);
router.get('/representantes', RepresentativeController.searchRepresentative);

router.get('/replicacoes', ReplicController.pullData);
router.post('/replicacoes', ReplicController.searchComands);


module.exports = router;