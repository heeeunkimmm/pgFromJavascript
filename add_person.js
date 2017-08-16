const settings = require("./settings"); // settings.json
const pg = require("pg");
const Pool = pg.Pool;
const pool = new Pool(settings);

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const valueFromUser = process.argv[2];


knex.select('*')
    .from('famous_people')
    .where('last_name', valueFromUser)
    .orWhere('first_name', valueFromUser)
    .then(function(info) {
      console.log("Searching...");
      console.log("Found ", info.length, "person(s) by the name", "'", valueFromUser, "'");
      info.forEach(function(user) {
        console.log(user.id, ":", user.first_name, user.last_name, user.birthdate);
      })
    })
    .catch(function(err) {
      console.error(err);
    })
