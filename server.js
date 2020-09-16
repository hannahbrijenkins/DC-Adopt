const express = require("express");
const routes = require(`./controllers`);
const sequelize = require(`./config/connection`);
const path = require("path");

// const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

//const sequelize = require("./config/config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    // sequelize.sync({ force: false });
});