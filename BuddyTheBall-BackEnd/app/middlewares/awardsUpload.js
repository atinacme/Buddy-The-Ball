const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const db = require("../models");
const Config = db.dbConfig;

var storage = new GridFsStorage({
    url: `mongodb://${Config.HOST}:${Config.PORT}/${Config.DB}`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-bezkoder-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: Config.awardsBucket,
            filename: `${Date.now()}-bezkoder-${file.originalname}`
        };
    }
});

var uploadAwards = multer({ storage: storage }).array("file", 50);
var uploadAwardsMiddleware = util.promisify(uploadAwards);
module.exports = uploadAwardsMiddleware;