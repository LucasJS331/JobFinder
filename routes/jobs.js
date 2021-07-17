const express = require('express');
const router = express.Router();
const jobController = require("../controllers/JobController");

router.get("/", jobController.index);
router.get('/add', jobController.createJobPage);
router.get('/view/:id', jobController.viewJob);
router.post('/add', jobController.addJob);

module.exports = router;