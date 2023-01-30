const db = require("../models");
const Coach = db.coach;
const User = db.user;
const School = db.school;
const Customer = db.customer;
const Messages = db.messages;

const updateMessage = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    var messanger_name;

    if (req.body.role === 'customer') {
        messanger_name = Customer.find(
            {
                player_name: { $in: req.body.messanger_id }
            },
            (err, player) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                return player.map(player => player.player_name);
            }
        );
    } else if (req.body.role === 'coach') {
        messanger_name = Coach.find(
            {
                coach_name: { $in: req.body.messanger_id }
            },
            (err, coach) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                return coach.map(coach => coach.coach_name);
            }
        );
    } else {
        messanger_name = 'Super Admin';
    }

    console.log("messenger---->", messanger_name);

    // Messages.findByIdAndUpdate(id, {
    //     $push: {
    //         messanger_id: req.body.messanger_id,
    //         message: req.body.message,
    //         messanger_name: messanger_name,
    //         message_to_id: req.body.message_to_id,
    //         message_to_name: req.body.message_to_name,
    //         url: req.body.url
    //     }
    // }, { new: true })
    //     .then(data => {
    //         if (!data)
    //             res.status(404).send({ message: "Can't send message with Photo id " + id });
    //         else res.send(data);
    //     })
    //     .catch(err => {
    //         res
    //             .status(500)
    //             .send({ message: "Error sending message with Photo id=" + id });
    //     });
};

module.exports = {
    updateMessage,
};