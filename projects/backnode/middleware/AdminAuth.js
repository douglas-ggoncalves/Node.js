var jwt = require("jsonwebtoken");
var secret = "as55a6a5as5d4a5qvjnkalçKASNFJLkakfnJKKjknldjsn";

module.exports = function(req, res, next) {
    const authToken = req.headers['authorization'];
    if(authToken != undefined) {
        console.log('Auth token' + JSON.stringify(authToken))
    } else{
        console.log('Auth token undefined ' + JSON.stringify(authToken))
    }

    next();

    /*
    if(authToken != undefined) {
        const bearer = authToken.split(" ");
        var token = bearer[1];

        try{
            var decoded = jwt.verify(token, secret);
            console.log(decoded)
            if(decoded.role == 1) {
                next();
            } else{
                res.status(403);
                console.log(decoded.role)
                res.send("Você não tem permissão para isso");
                return;
            }
        } catch(err) {
            res.status(403);
            res.send("Você não está autenticado");
            return;
        }
    } else{
        res.status(403);
        res.send("Você não está autenticado");
        return;
    }
    */
}



