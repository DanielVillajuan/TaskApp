const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");

// connecting to db
mongoose
  .connect("mongodb://localhost/crud-mongo")
  .then((db) => console.log("Db connected"))
  .catch((err) => console.log(err));

// importing routes
const indexRoutes = require("./routes/index");

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views")); // app.set("views", __dirname + "/views"); para evitar el problema del SO usamos path
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev")); // utilizamos morgan para ver en consola las interacciones con las peticiones
app.use(express.urlencoded({ extended: false })); // lee los datos de un formulario sin imagenes

// routes
app.use("/", indexRoutes);

// starting server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
