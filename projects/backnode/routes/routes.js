var express = require("express")
var app = express();
var router = express.Router();
var IndexController = require("../controllers/IndexController");
var ReplicController = require("../controllers/ReplicController");
var RepresentativeController = require("../controllers/RepresentativeController");


router.post('/', IndexController.login);
router.get('/representantes', RepresentativeController.searchRepresentative);

router.get('/replicacoes', ReplicController.getData);
router.post('/replicacoes', ReplicController.searchComands);
router.post('/redes', ReplicController.postNetworks);


module.exports = router;