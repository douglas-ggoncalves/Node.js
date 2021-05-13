const express = require("express");
const Order = require("./Order");
const router = express.Router();
const Client = require("../client/Client");
const slugify = require("slugify")
const session = require("express-session");

router.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false
    //    cookie: { maxAge: 1 * 60 * 1000 }
}))

router.get("/minhas-ordens", (req, res) => {
    if (req.session.login) {
        Client.findOne({
            where: {
                login: req.session.login,
            }
        }).then(user => {
            if (user != undefined) {
                Order.findAll({
                    order: [
                        ['id', 'DESC']
                    ], limit: 3,
                    where: { clientId: user.id }
                }).then(orders => {
                    res.render("./user/orders", { orders: orders, clientID: user.id });
                })
            } else {

            }
        }).catch(err => {
            console.log(err)
        })
    } else {
        res.render("index", { error: "0" })
    }

})

router.post("/orders/delete", (req, res) => {
    var id = req.body.id;
    if (req.session.login) {
        if (!isNaN(id)) { // se for um número
            Order.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/minhas-ordens");
            })
        } else {
            res.redirect("/minhas-ordens");
        }
    } else {
        res.redirect("/minhas-ordens");
    }
})

router.post("/back", (req, res) => {
    if (req.session.login) {
        res.redirect("/minhas-ordens");
    } else {
        res.render("index", { error: "0" })
    }
})

router.post("/update", (req, res) => {
    if (req.session.login) {
        var title = req.body.title;
        var body = req.body.body;
        var id = req.body.id;

        Order.update({
            titulo: title, descricao: body, slug: slugify(title)
        }, {
            where: { id: id }
        }
        )
    } else {
        res.render("index", { error: "0" })
    }
})

router.post("/saveOrder", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var status = "Em andamento"
    var slug = slugify(title)
    var clientID = req.body.clientID;

    Order.create({
        titulo: title,
        descricao: body,
        status: status,
        slug: slug,
        clientId: clientID
    }).then(order => {
        if (order != undefined) {
            res.redirect("/minhas-ordens")
        } else {
            res.redirect("/minhas-ordens")
        }
    })
})

router.post("/editar-ordem", (req, res) => {
    var clientId = req.body.clientId;
    var id = req.body.id;
    Order.findByPk(id).then(order => {
        res.render("user/edit", { clientId: clientId, id: id, order: order });
    })
})

module.exports = router;