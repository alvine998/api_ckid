const util = require('util');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const dbConfig = require("../config/db.config");

var storage = new GridFsStorage({
    url: dbConfig.url,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req,file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];
        if(match.indexOf(file.mimetype) === -1){
            const filename = `${Date.now()}-alvine-${file.originalname}`;
            return filename;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-bezkoder-${file.originalname}`
        };
    }
});

var uploadfile = multer({storage: storage}).single("file");
var uploadFileMiddleware = util.promisify(uploadfile);
module.exports = uploadFileMiddleware;