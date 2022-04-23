var express = require("express")
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController");
var ReplicController = require("../controllers/ReplicController");
var RepresentativeController = require("../controllers/RepresentativeController");
var AdminAuth = require("../middleware/AdminAuth")
var MasterAuth = require("../middleware/MasterAuth")

router.post('/login', UserController.login);
router.get('/user',AdminAuth, UserController.getUsers);
router.post('/user', UserController.create);
router.patch('/user', UserController.edit);
router.post('/token', UserController.validateToken);

/**/
router.patch('/token', UserController.editPassword);



router.post('/senha', UserController.recoveryPassword);
router.delete('/user/:login', UserController.delete);
router.get('/representante', RepresentativeController.searchRepresentative);
router.get('/replicacao', AdminAuth, ReplicController.getData);
router.post('/replicacao', ReplicController.searchComands);
router.post('/rede', ReplicController.postNetworks);
router.post('/loja', ReplicController.postStores);
router.delete('/loja/:id', ReplicController.delete);
router.patch('/loja', ReplicController.patchStores);
router.post('/validate', AdminAuth, UserController.validate);

module.exports = router;