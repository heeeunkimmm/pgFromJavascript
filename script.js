
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
  client.query("SELECT * FROM famous_people WHERE last_name=$1 OR first_name=$1", [valueFromUser], (err, result) => {
    done();
    if (err) {
      return console.error("error running query", err);
    }

    console.log("Searching...");

    const final = result.rows

    console.log("Found", final.length, "person(s) by the name '", valueFromUser, "'")

    final.forEach(function(info) {
      console.log(info.id, ":", info.first_name, info.last_name, info.birthdate);
    });

  });
});







