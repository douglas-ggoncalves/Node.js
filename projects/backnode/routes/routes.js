var express = require("express")
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController");
var ReplicController = require("../controllers/ReplicController");
var RepresentativeController = require("../controllers/RepresentativeController");
var AdminAuth = require("../middleware/AdminAuth")

router.post('/', UserController.login);
router.get('/users', UserController.getUsers);
router.post('/user', UserController.create);

router.get('/representantes', RepresentativeController.searchRepresentative);
//router.get('/replicacoes', AdminAuth, ReplicController.getData);
router.get('/replicacoes', ReplicController.getData);
router.post('/replicacoes', ReplicController.searchComands);
router.post('/redes', ReplicController.postNetworks);
router.post('/lojas', ReplicController.postStores);
router.patch('/lojas', ReplicController.patchStores);
router.post('/validate', AdminAuth, UserController.validate);

module.exports = router;