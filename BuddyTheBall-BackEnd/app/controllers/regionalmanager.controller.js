const db = require("../models");
var bcrypt = require("bcryptjs");
const User = db.user;
const RegionalManager = db.regionalmanager;

exports.getRegionalManagers = (req, res) => {
    RegionalManager.find()
        // .populate("assigned_schools", "-__v")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving regional managers."
            });
        });
};

exports.findParticularRegionalManager = (req, res) => {
    const id = req.params.id;

    RegionalManager.findById(id)
        // .populate("assigned_schools", "-__v")
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Regional Manager with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Regional Manager with id=" + id });
        });
};

// exports.findCustomersOfParticularCoach = (req, res) => {
//     const id = req.params.id;

//     Customer.find({ coach: id })
//         .then(data => {
//             if (!data)
//                 res.status(404).send({ message: "Not found Regional Manager with id " + id });
//             else res.send(data);
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .send({ message: "Error retrieving Regional Manager with id=" + id });
//         });
// };

// exports.findCustomersOfParticularCoachOfParticularSchool = (req, res) => {
//     const coachId = req.params.coachId;
//     const schoolId = req.params.schoolId;

//     Customer.find({ coach: coachId, school: schoolId })
//         .then(data => {
//             if (!data)
//                 res.status(404).send({ message: "Not found Coach with id " + id });
//             else res.send(data);
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .send({ message: "Error retrieving Coach with id=" + id });
//         });
// };

exports.updateRegionalManager = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const userId = req.params.userId;
    const regionalManagerId = req.params.regionalManagerId;
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
                        RegionalManager.findByIdAndUpdate(regionalManagerId,
                            {
                                email: req.body.email,
                                password: req.body.password,
                                regional_manager_name: req.body.regional_manager_name,
                                assigned_region: req.body.assigned_region
                            }, { useFindAndModify: false })
                            .then(data => {
                                if (!data) {
                                    res.status(404).send({
                                        message: `Cannot update Regional Manager with id=${regionalManagerId}. Maybe Regional Manager was not found!`
                                    });
                                } else res.send({ message: "User Regional Manager was updated successfully." });
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Error updating Regional Manager with id=" + regionalManagerId
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

exports.deleteRegionalManager = (req, res) => {
    const id = req.params.id;

    RegionalManager.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Regional Manager with id=${id}. Maybe Regional Manager was not found!`
                });
            } else {
                res.send({
                    message: "Regional Manager was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Regional Manager with id=" + id
            });
        });
};