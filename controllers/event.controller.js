const db = require("../database-mysql");
const {
  getOne,
  select,
  add,
  modifOne,
  deleteOne,
  selectManyById,
  selectManyByCountry,
} = require("../database-mysql/eventModel.js");

module.exports = {
  selectOne: (req, res) => {
    getOne(req.params.id, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(results);
      }
    });
  },
  selectAllById: (req, res) => {
    selectManyById(req.params.id, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(results);
      }
    });
  },
  selectAllByCountry: (req, res) => {
    selectManyByCountry(req.params.id, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(results);
      }
    });
  },

  selectAll: (req, res) => {
    select((err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(results);
      }
    });
  },
  addEvent: (req, res) => {
    add(req.body, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(results);
      }
    });
  },
  modifEvent: (req, res) => {
    modifOne(req.body, req.params.id, (err, results) => {
      console.log(req.params.id);
      if (err) {
        res.status(500).send(err);
        console.log(err);
      } else {
        res.status(201).json(results);
      }
    });
  },
  deleteEvent: (req, res) => {
    let id = req.params.id;
    deleteOne(id, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(results);
      }
    });
  },
};
