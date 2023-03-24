const db = require("../models");
var bcrypt = require("bcryptjs");
const User = db.user;
const Customer = db.customer;

exports.getCustomers = (req, res) => {
    Customer.find()
        .populate("school", "-__v")
        .populate("coach", "-__v")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        });
};

exports.findCustomerWithSchoolId = (req, res) => {
    const id = req.params.id;
    Customer.find({ school: id })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Customer with School id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Customer with School id=" + id });
        });
};

exports.findParticularCustomer = (req, res) => {
    const id = req.params.id;
    Customer.findById(id)
        .populate("school", "-__v")
        .populate("coach", "-__v")
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Customer with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Customer with id=" + id });
        });
};

exports.updateCustomer = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const userId = req.params.userId;
    const customerId = req.params.customerId;
    const password = bcrypt.hashSync(req.body.password, 8);

    User.findByIdAndUpdate(userId, { email: req.body.email, password: password }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${userId}. Maybe User was not found!`
                });
            } else {
                const current_award = {
                    name: req.body.current_award ? req.body.current_award.name : null,
                    image: req.body.current_award ? req.body.current_award.image : null
                };
                Customer.findByIdAndUpdate(customerId,
                    {
                        password: req.body.password,
                        wristband_level: req.body.wristband_level,
                        tennis_club: req.body.tennis_club,
                        jersey_size: req.body.jersey_size,
                        current_award: current_award,
                    }, { useFindAndModify: false })
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update Customer with id=${customerId}. Maybe Customer was not found!`
                            });
                        } else res.send({ message: "User Customer was updated successfully." });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Customer with id=" + customerId
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

exports.deleteCustomer = (req, res) => {
    const id = req.params.id;

    Customer.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            } else {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};