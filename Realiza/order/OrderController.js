const express = require("express");
const Order = require("./Order");
const router = express.Router();
const slugify = require("slugify");
const session = require("express-session");
const User = require("../user/User");

router.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false
}))

router.get("/minhas-ordens", (req, res) => {
    if (req.session.login) {
        User.findOne({
            where: {
                login: req.session.login,
            }
        }).then(user => {
            if (user != undefined) {
                if (user.nivelDeAcesso == "Cliente") {
                    Order.findAll({
                        include: [{ model: User, attributes: ['nome'] }],
                        order: [
                            ['id', 'DESC']
                        ], limit: 3,
                        where: { userId: user.id }
                    }).then(orders => {
                        res.render("./user/orders", { orders: orders, userId: user.id, user: user });
                    })
                } else {
                    Order.findAll({
                        include: [{ model: User, attributes: ['nome'] }],
                        order: [
                            ['id', 'ASC']
                        ],
                        where: { status: "Em andamento" }
                    }).then(orders => {
                        res.render("./user/orders", { orders: orders, userId: user.id, user: user });
                    })
                }
            } else {
                res.render("index", { error: "0" })
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
        res.render("index")
    }
})

router.post("/update", (req, res) => {
    if (req.session.login) {
        var title = req.body.title;
        var body = req.body.body;
        var id = req.body.id;

        Order.update({
            titulo: title, descricao: body
        },
            { where: { id: id } }
        ).then(() => {
            res.redirect("minhas-ordens")
        })

    } else {
        res.render("index");
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
        userId: clientID
    }).then(order => {
        if (order != undefined) {
            res.redirect("/minhas-ordens")
        } else {
            res.redirect("/minhas-ordens")
        }
    })
});

router.post("/editar-ordem", (req, res) => {
    var clientId = req.body.clientId;
    var id = req.body.id;
    Order.findByPk(id).then(order => {
        res.render("user/edit", { clientId: clientId, id: id, order: order });
    })
});

router.post("/finalizar-ordem", (req, res) => {
    if (req.session.login) {
        var id = req.body.id;

        Order.update({
            status: "Concluído"
        }, {
            where: { id: id }
        }).then(() => {
            res.redirect("minhas-ordens")
        })
    } else {
        res.render("index");
    }
});

module.exports = router;