const db = require("../models");
const Schedule = db.schedule;
const Coach = db.coach;

const createSchedule = async (req, res) => {
    try {
        const schedule = new Schedule({
            coach_id: req.body.coach_id,
            user_id: req.body.user_id,
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            school: req.body.school,
            topic: req.body.topic
        });
        schedule.save(schedule);
        Coach.findByIdAndUpdate(req.body.coach_id,
            {
                $push: {
                    schedules: schedule
                }
            }, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    console.log(`Cannot update Coach with id=${req.body.user_id}. Maybe Coach was not found!`);
                } else console.log("User Coach was updated successfully.");
            })
            .catch(err => {
                console.log("Error updating Coach with id=" + req.body.user_id);
            });
        return res.status(200).send({
            data: schedule,
            message: 'Schedule Created Successfully !!'
        });
    } catch (error) {
        console.log(error);
    }
};

const getScheduleByDateAndCoach = async (req, res) => {
    try {
        const data = await Schedule.find({ date: req.body.date, user_id: req.body.user_id }).populate("school", "-__v").populate("school.customers", "-__v");
        if (data.length === 0)
            res.status(404).send({ message: 'No Schedule found on date ' + req.body.date });
        else res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};

const getScheduleByCoach = async (req, res) => {
    try {
        Schedule.find({ user_id: req.params.id })
            .populate("school", "-__v")
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving coaches."
                });
            });
    } catch (error) {
        console.log(error);
    }
};

const updateSchedule = async (req, res) => {
    const scheduleId = req.params.id;
    try {
        var schedule = {
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            topic: req.body.topic
        };
        console.log("data--->", scheduleId, schedule);
        await Schedule.findByIdAndUpdate(scheduleId, schedule);
        Coach.findById(req.body.coach_id)
            .then(data => {
                if (data) {
                    Coach.updateOne({ 'schedules._id': scheduleId }, {
                        '$set': {
                            'schedules.$.date': req.body.date,
                            'schedules.$.start_time': req.body.start_time,
                            'schedules.$.end_time': req.body.end_time,
                            'schedules.$.topic': req.body.topic
                        }
                    })
                        .then(data => {
                            if (!data) {
                                console.log(`Cannot update Coach with id=${req.body.user_id}. Maybe Coach was not found!`);
                            } else console.log("User Coach was updated successfully.");
                        })
                        .catch(err => {
                            console.log("Error updating Coach with id=" + req.body.user_id);
                        });
                    res.status(200).send(data);
                }
            });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createSchedule,
    getScheduleByDateAndCoach,
    getScheduleByCoach,
    updateSchedule
};