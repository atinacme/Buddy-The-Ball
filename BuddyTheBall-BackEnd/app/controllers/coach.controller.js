const db = require("../models");
var bcrypt = require("bcryptjs");
const Coach = db.coach;
const User = db.user;
const School = db.school;
const Customer = db.customer;

exports.getCoaches = (req, res) => {
    Coach.find()
        .populate("assigned_schools", "-__v")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving coaches."
            });
        });
};

exports.findParticularCoach = (req, res) => {
    const id = req.params.id;

    Coach.findById(id)
        .populate("assigned_schools", "-__v")
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Coach with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Coach with id=" + id });
        });
};

exports.findCustomersOfParticularCoach = (req, res) => {
    const id = req.params.id;

    Customer.find({ coach: id })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Coach with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Coach with id=" + id });
        });
};

exports.findCustomersOfParticularCoachOfParticularSchool = (req, res) => {
    const coachId = req.params.coachId;
    const schoolId = req.params.schoolId;

    Customer.find({ coach: coachId, school: schoolId })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Coach with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Coach with id=" + id });
        });
};

exports.updateCoach = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const userId = req.params.userId;
    const coachId = req.params.coachId;
    const password = bcrypt.hashSync(req.body.password, 8);

    User.findByIdAndUpdate(userId, { email: req.body.email, password: password }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${userId}. Maybe User was not found!`
                });
            } else {
                School.find({ school_name: { $in: req.body.assigned_schools } })
                    .then(school => {
                        Coach.findByIdAndUpdate(coachId,
                            {
                                email: req.body.email,
                                password: req.body.password,
                                coach_name: req.body.coach_name,
                                tennis_club: req.body.tennis_club,
                                assigned_territory: req.body.assigned_territory,
                                assigned_schools: school,
                                assign_slot: req.body.assign_slot,
                                favorite_pro_player: req.body.favorite_pro_player,
                                handed: req.body.handed,
                                favorite_drill: req.body.favorite_drill
                            }, { useFindAndModify: false })
                            .then(data => {
                                if (!data) {
                                    res.status(404).send({
                                        message: `Cannot update Coach with id=${coachId}. Maybe Coach was not found!`
                                    });
                                } else res.send({ message: "User Coach was updated successfully." });
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Error updating Coach with id=" + coachId
                                });
                            });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + userId
            });
        });
};

exports.deleteCoach = (req, res) => {
    const id = req.params.id;

    Coach.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Coach with id=${id}. Maybe Coach was not found!`
                });
            } else {
                res.send({
                    message: "Coach was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Coach with id=" + id
            });
        });
};