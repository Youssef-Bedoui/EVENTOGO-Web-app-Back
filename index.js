const express = require("express");
const userRoutes = require("./routes/user.routes");
const eventRoutes = require("./routes/event.routes");
const favoriteRoutes = require("./routes/favorite.routes");
const interestedRoutes = require("./routes/interested.routes");
const sendEmailRoutes = require("./routes/sendEmail.routes");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/public"));



app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/interested", interestedRoutes);
app.use("/api/sendEmail", sendEmailRoutes);

app.post("/addEvent", (req, res) => {
  const { image, title, description, date, type } = req.body;
  eventRoutes.addEvent(title, description, date, image, type, (err, events) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(events);
    }
  });
});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});
