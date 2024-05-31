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

const generateId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

router.get("/:link", (req, res) => {
  const id = req.url.slice(1);
  if (id.length !== 4) {
    return res.status(400).send("Invalid link entered.");
  }

  database.query(
    `SELECT link, clicks from links where id = '${id}'`,
    function (err, results) {
      if (err) throw err;
      if (results.length === 0) {
        return res.status(400).send("Invalid link entered.");
      }

      database.query(
        `UPDATE links SET clicks = ${results[0].clicks + 1} WHERE ID = "${id}"`,
        function (err) {
          if (err) throw err;
        }
      );

      return res.send(results[0].link);
    }
  );
});

router.post("/shorten", (req, res) => {
  let { link } = req.body;

  if (!link.match(/^(http|https):\/\//)) {
    link = "https://" + link;
  }

  if (!link.match(/^(http|https):\/\/(?:www\.)?([a-zA-Z0-9-]{1,63}\.){1,127}(?:[a-zA-Z]{2,63})(?:\/[^\s]*)?/)) {
    return res.status(400).send("Invalid URL entered.")
  }

  let id;
  let unique = true;

  do {
    unique = true;
    id = generateId();
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
  res.send(id);
});

module.exports = router;
