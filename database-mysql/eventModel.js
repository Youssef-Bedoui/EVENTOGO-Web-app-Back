// import the database connection
const conn = require("./index.js");

module.exports = {
  getOne: (id, callback)=> {
    const sql = "SELECT * FROM events where id=?";
    conn.query(sql, id, (err, result)=> {
      callback(err, result);
    });
  },
  selectManyById: (id, callback)=> {
    const sql =
      "SELECT * FROM events t1 INNER JOIN users t2 ON t1.user_id = t2.id and t2.id =?;";
    conn.query(sql, [id], (err, results)=> {
      callback(err, results);
    });
  },
  selectManyByCountry: (id, callback) =>{
    const sql =
      "SELECT * FROM events t1 INNER JOIN users t2 ON t1.user_id = t2.id and t2.country = ?;";
    conn.query(sql, [id], (err, results) =>{
      callback(err, results);
    });
  },
  select: (callback)=>{
    const sql = "SELECT * FROM events";
    conn.query(sql, (err, result) =>{
      callback(err, result);
    });
  },

  add: (event, callback) =>{
    const sql = "INSERT INTO events SET ?";
    conn.query(sql, event, (err, results) =>{
      callback(err, results);
    });
  },
  modifOne: (event, id, callback) =>{
    const sql = "UPDATE events SET ? WHERE id=?";
    conn.query(sql, [event, id], (err, results) =>{
      callback(err, results);
    });
  },
  deleteOne: (id, callback) =>{
    const sql = "DELETE FROM events WHERE id = ?";
    conn.query(sql, id, (err, results)=> {
      callback(err, results);
    });
  },
};
