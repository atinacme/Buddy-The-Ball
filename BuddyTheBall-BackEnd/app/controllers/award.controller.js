const awardsUpload = require("../middlewares/awardsUpload");
const db = require("../models");
const Award = db.award;
const baseUrl = "http://localhost:8080/api/files/";

const uploadAwards = async (req, res) => {
    try {
        await awardsUpload(req, res);
        if (req.files.length <= 0) {
            return res
                .status(400)
                .send({ message: "You must select at least 1 file." });
        }

        req.files.forEach(element => {
            console.log("djw--->", element);
            const awardPhotos = new Award({
                // name: element.originalname.replace('.png', ''),
                photo_id: element.id,
                fieldname: element.fieldname,
                originalname: element.originalname,
                encoding: element.encoding,
                mimetype: element.mimetype,
                destination: element.destination,
                filename: element.filename,
                path: element.path,
                size: element.size,
                upload_date: element.uploadDate
            });
            awardPhotos.save(awardPhotos);
        });

        return res.status(200).send({
            message: "Files have been uploaded.",
        });
    } catch (error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).send({
                message: "Too many files to upload.",
            });
        }
        return res.status(500).send({
            message: `Error when trying upload many files: ${error}`,
        });
    }
};

const getAllAwards = async (req, res) => {
    try {
        var fileInfos = [];
        var awards = await Award.find();

        if ((awards.length) === 0) {
            return res.status(500).send({
                message: "No files found!",
            });
        }

        awards.forEach((doc) => {
            fileInfos.push({
                _id: doc._id,
                originalname: doc.originalname,
                name: doc.name,
                url: baseUrl + doc.filename,
                messages: doc.messages
            });
        });
        return res.status(200).send(fileInfos);
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};


module.exports = {
    uploadAwards,
    getAllAwards
};