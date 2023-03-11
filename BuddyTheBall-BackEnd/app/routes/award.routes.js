const controller = require("../controllers/award.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/uploadAwards", controller.uploadAwards);

    app.get("/api/getAllAwards", controller.getAllAwards);
};