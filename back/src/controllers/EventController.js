import Event from "../models/Event.js"

function getEvents(req, res) {
    Event.findAll().then((events) => {
        res.json(events);
    });
}


function deleteEvent(req, res) {
    const { id } = req.params;
    Event.destroy({ where: { id } }). then (() => {
        res.status(204).json({ message: "Evennement supprimé"})
    });
}

function getEventById(req, res) {
    const { id } = req.params;
    Event.findOne({ where: { id } }).then((event) => {
        if(event) {
           res.json(event);
        } else {
      res.status(404).json({ error: "Evennement non trouvé" });
    }
    })
}


export default {
    getEvents,
    deleteEvent,
    getEventById
}