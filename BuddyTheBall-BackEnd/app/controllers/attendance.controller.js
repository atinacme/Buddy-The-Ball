const db = require('../models');
const Attendance = db.attendance;
const Customer = db.customer;

const createAndUpdateAttendance = async (req, res) => {
    try {
        const check = await Attendance.find({ user_id: req.body.user_id, attendance_date: req.body.attendance_date });
        if (check.length > 0) {
            const data = await Attendance.findOneAndUpdate({
                user_id: req.body.user_id, attendance_date: req.body.attendance_date
            }, { attendance: req.body.attendance });
            if (!data) {
                res.status(404).send({ message: 'Attendance not updated!!' });
            } else {
                Attendance.find().then(data => {
                    if (!data) {
                        res.status(404).send({
                            message: `Cannot update Customer with id=${req.body.customer_id}. Maybe Customer was not found!`
                        });
                    } else {
                        var attendanceRes = data.reduce(function (obj, v) {
                            obj[v.attendance] = (obj[v.attendance] || 0) + 1;
                            return obj;
                        }, {});
                        Customer.update({ 'attendance.attendance_date': req.body.attendance_date }, {
                            '$set': {
                                'attendance.$.attendance': req.body.attendance
                            },
                            total_absent: 'A' in attendanceRes ? attendanceRes.A : null,
                            total_present: 'P' in attendanceRes ? attendanceRes.P : null
                        })
                            .then(data => {
                                if (!data) {
                                    res.status(404).send({
                                        message: `Cannot update Customer with id=${req.body.customer_id}. Maybe Customer was not found!`
                                    });
                                } else res.send({ message: "Attendance was updated successfully." });
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Error updating Customer with id=" + req.body.customer_id
                                });
                            });
                    }
                });
            }
            //  return res.status(200).send({ message: 'Attendance Updated Successfully!!' });
        } else {
            const attendance = new Attendance({
                coach_id: req.body.coach_id,
                school_id: req.body.school_id,
                user_id: req.body.user_id,
                customer_id: req.body.customer_id,
                customer: req.body.customer,
                time_period: req.body.time_period,
                attendance_date: req.body.attendance_date,
                attendance: req.body.attendance,
                start_date: req.body.start_date,
                end_data: req.body.end_data
            });
            const data = attendance.save(attendance);
            if (!data) {
                res.status(404).send({ message: 'Attendance not created' });
            } else {
                data.then(newData => {
                    if (!newData) {
                        res.status(404).send({
                            message: `Cannot update Customer with id=${req.body.customer_id}. Maybe Customer was not found!`
                        });
                    } else {
                        Attendance.find().then(data => {
                            if (!data) {
                                res.status(404).send({
                                    message: `Cannot update Customer with id=${req.body.customer_id}. Maybe Customer was not found!`
                                });
                            } {
                                var attendanceRes = data.reduce(function (obj, v) {
                                    obj[v.attendance] = (obj[v.attendance] || 0) + 1;
                                    return obj;
                                }, {});
                                Customer.findByIdAndUpdate(req.body.customer_id,
                                    {
                                        $push: {
                                            attendance: {
                                                coach_id: req.body.coach_id,
                                                school_id: req.body.school_id,
                                                user_id: req.body.user_id,
                                                customer_id: req.body.customer_id,
                                                customer: req.body.customer,
                                                time_period: req.body.time_period,
                                                attendance_date: req.body.attendance_date,
                                                attendance: req.body.attendance,
                                                start_date: req.body.start_date,
                                                end_data: req.body.end_data
                                            }
                                        },
                                        total_absent: 'A' in attendanceRes ? attendanceRes.A : null,
                                        total_present: 'P' in attendanceRes ? attendanceRes.P : null
                                    }, { useFindAndModify: false })
                                    .then(data => {
                                        if (!data) {
                                            res.status(404).send({
                                                message: `Cannot update Customer with id=${req.body.customer_id}. Maybe Customer was not found!`
                                            });
                                        } else res.send({ message: "User Customer was updated successfully." });
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            message: "Error updating Customer with id=" + req.body.customer_id
                                        });
                                    });
                            }
                        });
                    }
                });

                // res.status(200).send({ data: data, message: 'Attendance Created Successfully!!' });
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

const getAttendanceByDate = async (req, res) => {
    try {
        const data = await Attendance.find({ attendance_date: req.body.attendance_date });
        if (!data) {
            res.status(404).send({ message: 'Attendance not fetched' });
        } return res.status(200).send({ data: data, message: 'Attendance Fetched Successfully!!' });
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteAttendanceByDate = async (req, res) => {
    try {
        const data = await Attendance.findByIdAndDelete(req.params.id);
        if (!data) {
            res.status(404).send({ message: 'Attendance not deleted' });
        } return res.status(200).send({ data: data, message: 'Attendance Deleted Successfully!!' });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { createAndUpdateAttendance, getAttendanceByDate, deleteAttendanceByDate };