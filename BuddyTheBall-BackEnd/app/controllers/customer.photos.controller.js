const upload = require("../middlewares/upload");
const dbConfig = require("../config/db.config");
const db = require("../models");
const CustomerPhotos = db.customerPhotos;

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const baseUrl = "http://localhost:8080/api/files/";

const mongoClient = new MongoClient(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`);

const uploadCustomerPhotos = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.body, req.files);
        req.files.forEach(element => {
            const customerPhotos = new CustomerPhotos({
                customer_id: req.body.customer_id,
                school_id: req.body.school_id,
                coach_id: req.body.coach_id,
                photo_id: element.id
            });
            customerPhotos.save(customerPhotos);
        });

        if (req.files.length <= 0) {
            return res
                .status(400)
                .send({ message: "You must select at least 1 file." });
        }


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
module.exports = {
    uploadCustomerPhotos
};