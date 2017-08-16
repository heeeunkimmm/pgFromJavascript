
var dateFormat = require('date-format');

const valueFromUser = process.argv[2];

const pg = require("pg");
const Pool = pg.Pool;
// const Client = pg.Client;

const settings = require("./settings"); // settings.json

const pool = new Pool(settings);
// const client = new pg.Client();

pool.connect((err, client, done) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query("SELECT id, first_name, last_name, birthdate FROM famous_people WHERE last_name=$1 OR first_name=$1", [valueFromUser], (err, result) => {
    done();
    if (err) {
      return console.error("error running query", err);
    }

    output(result.rows);
  });
});

function output(results){
  console.log("Searching...");
  console.log("Found", results.length, "person(s) by the name '", valueFromUser, "'");

  results.forEach(function(info) {
    console.log(info.id, ":", info.first_name, info.last_name, dateFormat('yyyy-MM-dd',info.birthdate));
    });
}







