const db = require("../models");
const Schedule = db.schedule;
const Class = db.class;
const Coach = db.coach;
const School = db.school;

const createClass = async (req, res) => {
    try {
        var coaches = []
        const Classes = new Class({
            created_by: req.body.created_by,
            created_by_name: req.body.created_by_name,
            created_by_user_id: req.body.created_by_user_id,
            schedules: req.body.schedules,
            school: req.body.school
        });
        Classes.save(Classes);
        School.findByIdAndUpdate(req.body.school, {
            $push: {
                classes: Classes
            }
        }).then();
        req.body.schedules.forEach(async v => {
            const data = await Schedule.findById(v).populate("coaches")
            if (data) {
                data.coaches.forEach(u => {
                    coaches.push(u.user_id)
                })
            }
        })
        setTimeout(() => {
            var unique = coaches.filter((value, index, array) => {
                return array.indexOf(value) === index
            });
            unique.forEach(v => {
                Coach.findOneAndUpdate({ user_id: v },
                    {
                        $push: {
                            classes: Classes
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
            })
        }, 1000)
        return res.status(200).send({
            message: 'Classes Created Successfully !!'
        });
    } catch (error) {
        console.log(error);
    }
};

const getClasses = async (req, res) => {
    try {
        const data = await Class.find()
            .populate("schedules", "-__v")
            .populate("school", "-__v")
            .populate({
                path: 'schedules',
                populate: {
                    path: 'coaches',
                    model: 'Coach'
                }
            })
            .exec(function (err, data) {
                if (err) return res.status(404).send({ message: "Not found Customer with id " + id });
                res.send(data);
            });
        if (data.length === 0)
            res.status(404).send({ message: 'No Class found' });
        else res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};

const getClassCreatedByUserId = async (req, res) => {
    try {
        Class.find({ created_by_user_id: req.body.created_by_user_id }).populate("schedules", "-__v").populate("school", "-__v").exec(function (err, docs) {
            var options = {
                path: 'schedules.coaches',
                model: 'Coach'
            };
            if (err) return res.status(404).send({ message: "Not found Class" });
            Class.populate(docs, options, function (err, data) {
                if (err) return res.status(500).send({ message: "Error retrieving Class" });
                res.send(data);
            });
        });
    } catch (error) {
        console.log(error);
    }
};

const getCoachClasses = async (req, res) => {
    try {
        Class.find({ created_by_user_id: { $in: [req.body.coach_id, req.body.regional_manager_id] } }).populate("schedules", "-__v").populate("school", "-__v").exec(function (err, docs) {
            var options = {
                path: 'schedules.coaches',
                model: 'Coach'
            };
            if (err) return res.status(404).send({ message: "Not found Class" });
            Class.populate(docs, options, function (err, data) {
                if (err) return res.status(500).send({ message: "Error retrieving Class" });
                res.send(data);
            });
        });
    } catch (error) {
        console.log(error);
    }
};

const getScheduleByCoach = async (req, res) => {
    try {
        Schedule.find({ created_by_user_id: req.params.id })
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

const updateClass = async (req, res) => {
    const classId = req.params.id;
    try {
        var classes = {
            schedules: req.body.schedules,
            school: req.body.school
        };
        Class.findByIdAndUpdate(classId, classes)
            .then(data => {
                if (!data) {
                    console.log(`Cannot update Class with id=${classId}`);
                } else res.status(200).send("Class was updated successfully.");
            });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createClass,
    getClasses,
    getClassCreatedByUserId,
    getCoachClasses,
    getScheduleByCoach,
    updateClass
};