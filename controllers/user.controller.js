const db = require("../database-mysql");
const bcrypt = require("bcrypt");

const getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, items, fields) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(items);
    }
  });
};

const selectUser = (req, res) => {
  const { email } = req.params;

  console.log("sent email", email);
  db.query(`SELECT * FROM users WHERE email = ?`, email, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
};
const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM users WHERE id = ?`, id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, name, email, country, city, isBanned } = req.body;
  const fieldsToUpdate = {};

  if (password !== undefined && password !== "") {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    fieldsToUpdate.password = hashedPassword;
  }

  if (name) fieldsToUpdate.name = name;
  if (email) fieldsToUpdate.email = email;
  if (country) fieldsToUpdate.country = country;
  if (city) fieldsToUpdate.city = city;
  if (isBanned) fieldsToUpdate.isBanned = isBanned;

  db.query(
    `UPDATE users SET ? WHERE id = ?`,
    [fieldsToUpdate, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(result);
      }
    }
  );
};

const updateVerificationCode = async (req, res) => {
  const { email, code } = req.body;
  console.log(code, email);
  db.query(
    `UPDATE users SET verificationCode = ? WHERE email = ?`,
    [code, email],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(result);
      }
    }
  );
};

const signUp = async (req, res) => {
  const { name, email, password, country, activationToken } = req.body;
  console.log(req.body);
  const role = "user"; //by default user
  const sql = `SELECT * FROM users WHERE email=? `;
  db.query(sql, [email], async (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      res.send("user already exist");
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      db.query(
        "INSERT INTO users ( role, name, password, email,country, isBanned,activationToken) VALUES (?,?,?,?,?,?,?)",
        [role, name, hashedPassword, email, country, "false", activationToken],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send({msg:"fullfill", result});
          }
        }
      );
    }
  });
};

const signIn = (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;
  db.query(sql, [email], (err, result) => {
    if (err) {
      res.send(err);
    } else if (result.length === 0) {
      res.send("Wrong Email or Password !");
    } else {
      if (result[0].isBanned == "true") {
        res.send({ msg: "This user is Banned !" });
      } else {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (err) {
            res.send(err);
          } else if (response) {
            res.send(["yes", result]);
          } else {
            res.send("Wrong Email or Password !");
          }
        });
      }
    }
  });
};

module.exports = {
  getAllUsers,
  selectUser,
  deleteUser,
  updateUser,
  updateVerificationCode,
  signUp,
  signIn,
};
