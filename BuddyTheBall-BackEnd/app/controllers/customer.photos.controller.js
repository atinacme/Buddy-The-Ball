const upload = require("../middlewares/upload");
const fs = require("fs");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const dbConfig = require("../config/db.config");
const db = require("../models");
const Customer = db.customer;
const CustomerPhotos = db.customerPhotos;

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const ObjectID = require('mongodb').ObjectId;

const baseUrl = "http://localhost:8080/api/files/";

const mongoClient = new MongoClient(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`);

const uploadCustomerPhotos = async (req, res) => {
    try {
        await upload(req, res);
        if (req.files.length <= 0) {
            return res
                .status(400)
                .send({ message: "You must select at least 1 file." });
        }

        const userId = await Customer.findById(req.body.customer_id);

        req.files.forEach(element => {
            const customerPhotos = new CustomerPhotos({
                user_id: userId.user_id,
                customer_id: req.body.customer_id,
                school_id: req.body.school_id,
                coach_id: req.body.coach_id,
                photo_id: req.body.photo_id,
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
            customerPhotos.save(customerPhotos);
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

const getParticularSchoolPhotos = async (req, res) => {
    try {
        var fileInfos = [];
        var photos = await CustomerPhotos.find({ school_id: req.params.id });

        if ((photos.length) === 0) {
            return res.status(500).send({
                message: "No files found!",
            });
        }

        photos.forEach((doc) => {
            fileInfos.push({
                _id: doc._id,
                user_id: doc.user_id,
                customer_id: doc.customer_id,
                school_id: doc.school_id,
                coach_id: doc.coach_id,
                photo_id: doc.photo_id,
                originalname: doc.originalname,
                name: doc.filename,
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

const getParticularPhoto = async (req, res) => {
    try {
        var data = await CustomerPhotos.findById(req.params.id);
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

const updateCustomerPhotosOnMessage = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    const message = [{
        messanger_id: req.body.messanger_id,
        message: req.body.message,
        messanger_name: req.body.messanger_name
    }];

    CustomerPhotos.findByIdAndUpdate(id, {
        $push: {
            messages: message
        }
    }, { new: true })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Can't send message with Photo id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error sending message with Photo id=" + id });
        });
};

const download = async (req, res) => {
    try {
        await mongoClient.connect();

        const database = mongoClient.db(dbConfig.database);
        const bucket = new GridFSBucket(database, {
            bucketName: dbConfig.imgBucket,
        });

        let downloadStream = bucket.openDownloadStreamByName(req.params.name);

        downloadStream.on("data", function (data) {
            return res.status(200).write(data);
        });

        downloadStream.on("error", function (err) {
            return res.status(404).send({ message: "Cannot download the Image!" });
        });

        downloadStream.on("end", () => {
            return res.end();
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

module.exports = {
    uploadCustomerPhotos,
    getParticularSchoolPhotos,
    updateCustomerPhotosOnMessage,
    getParticularPhoto
};