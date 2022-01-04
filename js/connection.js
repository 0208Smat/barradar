const pgp = require('pg-promise')();

module.exports.db = pgp('postgres://admin:smat2022@localhost:5432/barradarbackend');
