const router = require("express").Router();
const tokenValidator = require("../../middleware/tokenVerify");
const getEvents = require("../../controllers/events/getEvents");
const participate = require("../../controllers/events/participate");
const withdraw = require("../../controllers/events/withdraw");
const getParticipations = require("../../controllers/events/getParticipations");
const isPaid = require("../../controllers/Auth/isPaid");
const getEventsById = require("../../controllers/events/getEventsById")
const getEventsByClub = require("../../controllers/events/getEventsByClub")
const getExpo = require("../../controllers/events/getExpo")
const getEventLink = require('../../controllers/events/getEventLink')
const getParticipantsForEvents = require("../../controllers/events/getParticipantsForEvent")

const getEv=require("../../controllers/events/getEvent");
const { addEvent } = require("../../controllers/events/addEvents");

router.get("/getEvents", getEvents);
router.put("/participate", tokenValidator, isPaid, participate);
router.put("/withdraw", tokenValidator, withdraw);
router.get("/getParticipations", tokenValidator, getParticipations);
router.get("/getEventsByClub/:club", getEventsByClub);
router.get("/getEventById/:eventId", getEventsById);
router.get("/getExpo", getExpo);
router.get("/getEventLink", getEventLink)
router.get("/getParticipantsForEvents/:eventId", getParticipantsForEvents);
router.post('/add', addEvent)

router.post("/getEv",getEv.getParticipantsh);

module.exports = router;
