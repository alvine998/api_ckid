const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignup');
const uploadFileMiddleware = require('./upload');

module.exports = {
    authJwt,
    verifySignUp,
    uploadFileMiddleware
};