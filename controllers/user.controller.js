var db = require("../database-mysql");
const bcrypt = require("bcrypt")

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/**
 * Fradj : User/getAll
 */


var selectAll = function (req, res) {
    db.query("SELECT * FROM users", (err, items, fields) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(items);
        }
    });
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/**
 * Ali : profile/selectOne
 */


 var selectOne = function (req, res) {
    const email=req.params.email;

    console.log("sent email", email);
    db.query(`SELECT * FROM users WHERE email = ?`, email, (err,result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(result);
      }
    });
  };








// function remove one user

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

//khairi: user/signUp
var signUp = async (req, res) => {
    console.log(req.body);
    const name = req.body.name
    const email = req.body.email
    // const password=req.body.password
    const role = req.body.role
    const sql = `SELECT * FROM users WHERE email=? `
    db.query(sql,[email], async (err, result) => {
        //console.log(result);
        if (err) {
            res.send(err)
        }
        if (result.length > 0) {
            res.send("user already exist")
        } else {
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            // const role = "admin";
            db.query("INSERT INTO users ( role, name, password, email) VALUES (?,?,?,?)", [role, name, hashedPassword, email], (err, result) => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send(['yes', result])
                }
            })
        }
    })
}

//khairi: user/signIn
var signIn = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const sqlSel = `SELECT * FROM users WHERE email = ?`
    db.query(sqlSel, [email], (err, result) => {
        if (err) {
            res.send(err)
        }
        if (result) {
            try {
                bcrypt.compare(
                    password,
                    result[0].password,
                    function (err, rez) {
                        console.log(rez);
                        if (err) {
                            res.send(err);
                        }
                        if (rez === false) {
                            res.send("login failed");
                        }
                        if (rez === true) {
                            res.send(['yes', result]);
                        }
                    }
                );
            } catch (err) {
                res.send(err);
            }
        } else {
            res.send(err);

        }
    })
}





module.exports = { 
selectAll,
selectOne,
signUp,
signIn
};


