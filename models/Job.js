const Sequelize = require('sequelize');
const db = require('../db/connection');

const Job = db.define('job',{
    titulo: {
        type: Sequelize.STRING,
    },

    salary: {
        type: Sequelize.STRING,
    },

    company: {
        type: Sequelize.STRING,
    },

    email: {
        type: Sequelize.STRING,
    },

    new_job: {
        type: Sequelize.INTEGER,
    },

    description: {
        type: Sequelize.STRING,
    },

});

module.exports = Job;