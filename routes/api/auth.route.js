const {verifySignUp} = require("../../middlewares");
const controller = require("../../controllers/auth.controller");

module.exports = app => {
    app.use((req,res,next) => {
        res.header(
            "Allow-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signin",
        controller.signin
    );
};