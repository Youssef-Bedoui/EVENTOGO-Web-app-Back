const db = require("../database-mysql");

const selectAll = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM favorite INNER JOIN events ON favorite.id_event=events.id WHERE id_user= ?`;
  db.query(sql, id, (err, items) => {
    if (err) {
      res.send(err);
    } else {
      res.send(items);
    }
  });
};

const addFavorite = (req, res) => {
  const sql = `INSERT into favorite set ?`;
  db.query(sql, req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else res.send(result);
  });
};

const deleteFavorite = (req, res) => {
  const { id_event } = req.params;
  const { id_user } = req.body;
  console.log(id_event, id_user);
  const sql = `DELETE FROM favorite WHERE id_user = ? AND id_event= ?`;
  db.query(sql, [id_user, id_event], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

module.exports = {
  selectAll,
  addFavorite,
  deleteFavorite,
};
