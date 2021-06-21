const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: String,
  description: String,
  status: {
    type: Boolean,
    default: false,
  }, // por defecto el dato que almaceno es false por eso se crea el objeto
});

module.exports = mongoose.model("tasks", TaskSchema); // tasks es la coleccion que va a contener documentos de TaskSchema
