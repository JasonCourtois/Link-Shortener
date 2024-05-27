require("dotenv").config();
const mysql = require("mysql");
const express = require("express");

const router = express.Router();
const database = mysql.createConnection({
  user: "root",
  password: process.env.PASSWORD,
  host: "localhost",
  database: "short_links",
});
database.connect();

const generateLink = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

router.get("/:link", (req, res) => {
  const link = req.url.slice(1);
  if (link.length !== 4) {
    return res.status(400).send("Invalid link entered.");
  }

  database.query(
    `SELECT link from links where id = '${link}'`,
    function (err, results) {
      if (err) throw err;
      if (results.length === 0) {
        return res.status(400).send("Invalid link entered.");
      }
      return res.send(results[0].link);
    }
  );
});

router.post("/shorten", (req, res) => {
  const { link } = req.body;

  let id;
  let unique = true;

  do {
    id = generateLink();
    database.query(
      `SELECT count(*) as count from links where id = '${id}'`,
      function (err, results) {
        if (err) throw err;
        if (results[0].count !== 0) {
          unique = false;
        }
      }
    );
  } while (!unique);

  const sql = `INSERT INTO links (id, link) VALUES ("${id}", "${link}")`;
  database.query(sql);
  res.send("short.com/" + id);
});

module.exports = router;
