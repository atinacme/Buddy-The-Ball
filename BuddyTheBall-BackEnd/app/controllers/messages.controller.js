const db = require("../models");
const Coach = db.coach;
const User = db.user;
const Role = db.role;
const Customer = db.customer;
const Messages = db.messages;

const createMessage = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to create can not be empty!"
        });
    }

    if (req.body.receiver_role === 'customer') {
        Customer.find(
            {
                _id: { $in: req.body.receiver_id }
            },
            (err, player) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                } else {
                    var player_name = player.map(player => player.player_name);
                    var player_profile_url = player.map(player => player.profile_data.url);
                    const message = new Messages({
                        sender_id: req.body.sender_id,
                        sender_name: req.body.sender_name,
                        sender_role: req.body.sender_role,
                        sender_profile_url: req.body.sender_profile_url,
                        receiver_id: req.body.receiver_id,
                        receiver_name: player_name[0],
                        receiver_role: 'customer',
                        receiver_profile_url: player_profile_url[0],
                        message: req.body.message
                    });
                    message
                        .save(message)
                        .then(data => {
                            res.status(200).send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the Message."
                            });
                        });

                }
            }
        );
    } else if (req.body.receiver_role === 'coach') {
        Coach.find(
            {
                _id: { $in: req.body.receiver_id }
            },
            (err, coach) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                } else {
                    var coach_name = coach.map(coach => coach.coach_name);
                    var coach_profile_url = coach.map(coach => coach.profile_data.url);
                    const message = new Messages({
                        sender_id: req.body.sender_id,
                        sender_name: req.body.sender_name,
                        sender_role: req.body.sender_role,
                        sender_profile_url: req.body.sender_profile_url,
                        receiver_id: req.body.receiver_id,
                        receiver_name: coach_name[0],
                        receiver_role: 'coach',
                        receiver_profile_url: coach_profile_url[0],
                        message: req.body.message
                    });
                    message
                        .save(message)
                        .then(data => {
                            res.status(200).send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the Message."
                            });
                        });
                }
            }
        );
    } else {
        Role.find({ name: 'superadmin' },
            (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                } else {
                    User.find({ roles: role[0]._id },
                        (err, receiver_id) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            } else {
                                const message = new Messages({
                                    sender_id: req.body.sender_id,
                                    sender_name: req.body.sender_name,
                                    sender_role: req.body.sender_role,
                                    sender_profile_url: req.body.sender_profile_url,
                                    receiver_id: receiver_id[0]._id,
                                    receiver_name: 'Super Admin',
                                    receiver_role: 'superadmin',
                                    receiver_profile_url: null,
                                    message: req.body.message
                                });
                                message
                                    .save(message)
                                    .then(data => {
                                        res.status(200).send(data);
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            message:
                                                err.message || "Some error occurred while creating the Message."
                                        });
                                    });
                            }
                        });
                }
            });
    }
};

const getMessagesBySenderId = (req, res) => {
    const id = req.params.id;
    Messages.find({ sender_id: id })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Sender with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Sender with id=" + id });
        });
};

module.exports = {
    createMessage,
    getMessagesBySenderId
};