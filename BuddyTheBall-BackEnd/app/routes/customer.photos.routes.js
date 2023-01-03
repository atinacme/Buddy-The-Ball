const controller = require("../controllers/customer.photos.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/uploadCustomerPhotos", controller.uploadCustomerPhotos);
    // app.get("/api/files", controller.getListFiles);
    // app.get("/api/files/:name", controller.download);
};