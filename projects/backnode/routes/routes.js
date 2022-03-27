var express = require("express")
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController");
var ReplicController = require("../controllers/ReplicController");
var RepresentativeController = require("../controllers/RepresentativeController");
var AdminAuth = require("../middleware/AdminAuth")
var MasterAuth = require("../middleware/MasterAuth")

router.post('/', UserController.login);
router.get('/users',MasterAuth, UserController.getUsers);
router.post('/user', UserController.create);
router.patch('/user', UserController.edit);
router.delete('/user/:login', UserController.delete);
router.get('/representantes', RepresentativeController.searchRepresentative);
router.get('/replicacoes', AdminAuth, ReplicController.getData);
router.post('/replicacoes', ReplicController.searchComands);
router.post('/redes', ReplicController.postNetworks);
router.post('/lojas', ReplicController.postStores);
router.patch('/lojas', ReplicController.patchStores);
router.post('/validate', AdminAuth, UserController.validate);

module.exports = router;