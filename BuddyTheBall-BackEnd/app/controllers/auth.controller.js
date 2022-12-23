const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Customer = db.customer;
const School = db.school;
const Coach = db.coach;

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
                    parent_name: req.body.parent_name,
                    player_age: req.body.player_age,
                    wristband_level: req.body.wristband_level,
                    handed: req.body.handed,
                    num_buddy_books_read: req.body.num_buddy_books_read,
                    jersey_size: req.body.jersey_size,
                    class_photos: req.body.class_photos,
                    current_award: req.body.current_award,
                    message: req.body.message
                });

                customer.save((err, customer) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.body.school_name) {
                        School.find(
                            {
                                school_name: { $in: req.body.school_name }
                            },
                            (err, school) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }

                                customer.school_name = school.map(school => school._id);
                            }
                        );
                    }
                    if (req.body.school_coach) {
                        Coach.find(
                            {
                                coach_name: { $in: req.body.school_coach }
                            },
                            (err, coach) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }

                                customer.school_coach = coach.map(coach => coach._id);
                                customer.save(err => {
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
            if (req.body.roles[0] === "coach") {
                const coach = new Coach({
                    coach_name: req.body.coach_name,
                    tennis_club: req.body.tennis_club,
                    favorite_pro_player: req.body.favorite_pro_player,
                    handed: req.body.handed,
                    favorite_drill: req.body.favorite_drill,
                    class_photos: req.body.class_photos,
                    calendar_slot: req.body.calendar_slot,
                    message: req.body.message
                });

                coach.save((err, coach) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.body.alloted_schools) {
                        School.find(
                            {
                                school_name: { $in: req.body.alloted_schools }
                            },
                            (err, school) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }

                                coach.alloted_schools = school.map(school => school._id);
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
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
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
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
};