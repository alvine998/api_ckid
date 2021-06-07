const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.signin = (req,res) => {
    User.findOne({
        nohp: req.body.nohp
    }).exec((err,user) => {
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
        };
        var token = jwt.sign({id:user.id}, config.secret, {expiresIn: 86400});
        res.status(200).send({
            id: user.id,
            nama:user.nama,
            email:user.email,
            nohp:user.nohp,
            accessToken: token
        });
    });
};