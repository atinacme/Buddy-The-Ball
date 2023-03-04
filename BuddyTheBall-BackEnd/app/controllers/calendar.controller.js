const db = require("../models");
const Calendar = db.calendar;

const createAgenda = async (req, res) => {
    try {
        const agenda = { [req.body.agenda_date]: req.body.agenda_data };
        const calendar = new Calendar({
            user_id: req.body.user_id,
            agenda: agenda,
            agenda_date: req.body.agenda_date,
            agenda_data: req.body.agenda_data
        });
        calendar.save(calendar);
        return res.status(200).send({
            data: calendar,
            message: 'Agenda Created Successfully !!'
        });
    } catch (error) {
        console.log(error);
    }
};

const getAgendaByDate = async (req, res) => {
    try {
        const data = await Calendar.find({ agenda_date: req.body.agenda_date });
        if (data.length === 0)
            res.status(404).send({ message: 'No Agenda found on date ' + req.body.agenda_date });
        else res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};

const getAgendaByCoach = async (req, res) => {
    try {
        const data = await Calendar.find({ agenda_date: req.body.agenda_date });
        if (data.length === 0)
            res.status(404).send({ message: 'No Agenda found on date ' + req.body.agenda_date });
        else res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};

const updateAgenda = async (req, res) => {
    const agendaId = req.params.id;
    const agenda = { [req.body.agenda_date]: req.body.agenda_data };
    try {
        const data = await Calendar.findByIdAndUpdate(agendaId, {
            user_id: req.body.user_id,
            agenda: agenda,
            agenda_date: req.body.agenda_date,
            agenda_data: req.body.agenda_data
        });
        if (data.length === 0)
            res.status(404).send({ message: 'Agenda not Updated on date ' + req.body.agenda_date });
        else res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createAgenda,
    getAgendaByDate,
    updateAgenda
};