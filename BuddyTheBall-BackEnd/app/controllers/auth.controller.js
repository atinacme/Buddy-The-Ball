const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Customer = db.customer;
const School = db.school;
const Coach = db.coach;
const RegionalManager = db.regionalmanager;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        // username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            if (req.body.roles[0] === "customer") {
                const customer = new Customer({
                    user_id: user._id,
                    email: req.body.email,
                    password: req.body.password,
                    parent_name: req.body.parent_name,
                    player_name: req.body.player_name,
                    player_age: req.body.player_age,
                    wristband_level: req.body.wristband_level,
                    handed: req.body.handed,
                    num_buddy_books_read: req.body.num_buddy_books_read,
                    jersey_size: req.body.jersey_size,
                    current_award: req.body.current_award
                });

                customer.save((err, customer) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.body.school) {
                        School.find(
                            {
                                school_name: { $in: req.body.school }
                            },
                            (err, school) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }

                                customer.school = school.map(school => school._id);
                            }
                        );
                    }
                    if (req.body.coach) {
                        Coach.find(
                            {
                                coach_name: { $in: req.body.coach }
                            },
                            (err, coach) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }

                                customer.coach = coach.map(coach => coach._id);
                                customer.save(err => {
                                    if (err) {
                                        res.status(500).send({ message: err });
                                        return;
                                    }
                                });
                            }
                        );
                    }
                    School.find({ school_name: req.body.school })
                        .then((data => {
                            School.findByIdAndUpdate(data[0]._id, {
                                $push: {
                                    customers: customer
                                }
                            })
                                .then(data => console.log(data));
                        }));
                });
            }
            if (req.body.roles[0] === "coach") {
                const coach = new Coach({
                    user_id: user._id,
                    email: req.body.email,
                    password: req.body.password,
                    coach_name: req.body.coach_name,
                    tennis_club: req.body.tennis_club,
                    assigned_region: req.body.assigned_region,
                    assign_slot: req.body.assign_slot,
                    favorite_pro_player: req.body.favorite_pro_player,
                    handed: req.body.handed,
                    favorite_drill: req.body.favorite_drill
                });

                coach.save((err, coach) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.body.assigned_schools) {
                        School.find(
                            {
                                school_name: { $in: req.body.assigned_schools }
                            },
                            (err, school) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }

                                coach.assigned_schools = school.map(school => school._id);
                                coach.save(err => {
                                    if (err) {
                                        res.status(500).send({ message: err });
                                        return;
                                    }
                                });
                            }
                        );
                    }
                });
            }
            if (req.body.roles[0] === "regionalmanager") {
                const regionalmanager = new RegionalManager({
                    user_id: user._id,
                    email: req.body.email,
                    password: req.body.password,
                    regional_manager_name: req.body.regional_manager_name,
                    assigned_region: req.body.assigned_region
                });

                regionalmanager.save((err, regionalmanager) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                });
            }
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: "User was registered successfully!" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ status: 404, message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    status: 401,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            if (authorities[0] === "ROLE_COACH") {
                Coach.findOne({
                    email: req.body.email
                })
                    .populate("assigned_schools", "-__v")
                    .exec((err, coach_data) => {
                        if (err) {
                            res.status(500).send({ message: err });
                        }
                        return res.status(200).send({
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            roles: authorities,
                            status: 200,
                            coach_data: coach_data,
                            accessToken: token
                        });
                    });
            } else if (authorities[0] === "ROLE_CUSTOMER") {
                Customer.findOne({
                    email: req.body.email
                })
                    .populate("school coach", "-__v")
                    .exec((err, customer_data) => {
                        if (err) {
                            res.status(500).send({ message: err });
                        }
                        return res.status(200).send({
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            roles: authorities,
                            status: 200,
                            customer_data: customer_data,
                            accessToken: token
                        });
                    });
            } else if (authorities[0] === "ROLE_REGIONALMANAGER") {
                RegionalManager.findOne({
                    email: req.body.email
                })
                    // .populate("school coach", "-__v")
                    .exec((err, regionalmanager_data) => {
                        if (err) {
                            res.status(500).send({ message: err });
                        }
                        return res.status(200).send({
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            roles: authorities,
                            status: 200,
                            regionalmanager_data: regionalmanager_data,
                            accessToken: token
                        });
                    });
            } else {
                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            }
        });
};