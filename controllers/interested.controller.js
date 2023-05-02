const db = require("../database-mysql");

const getNumber = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM event_has_interested where ?`;
  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
const addFirstNum = (req, res) => {
  const { id } = req.params;
  const { interested_count } = req.body;
  const sql = `INSERT INTO event_has_interested (interested_count, event_id) VALUES (?, ?)`;
  db.query(sql, [interested_count, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const modifNum = (req, res) => {
  const { interested_count } = req.body;
  const { id } = req.params;
  const sql = `UPDATE event_has_interested SET interested_count = ? WHERE event_id = ?`;
  db.query(sql, [interested_count, id], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error updating interested count");
    } else {
      res.send(result);
    }
  });
};

module.exports = { getNumber, addFirstNum, modifNum };
