const controller = require("../controllers/schedule.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/createSchedule", controller.createSchedule);

    app.post("/api/getScheduleByDateAndCoach", controller.getScheduleByDateAndCoach);

    app.post("/api/updateSchedule/:id", controller.updateSchedule);

    app.get("/api/getScheduleByCoach/:id", controller.getScheduleByCoach);
};