const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Acces-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    next();
});

const db = require("./app/models");

//Create tables in db
db.sequelize.sync();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "GDKN demo" });
});

require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});