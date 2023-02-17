const db = require('../models');
const Attendance = db.attendance;

const createAttendance = async (req, res) => {
    try {
        const attendance = new Attendance({
            coach_id: req.body.coach_id,
            school_id: req.body.school_id,
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
        } return res.status(200).send({ data: data, message: 'Attendance Created Successfully!!' });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { createAttendance };