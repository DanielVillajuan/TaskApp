const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();

  res.render("index", { tasks }); // le decimos que renderice el index.ejs , 2do parametro para pasarle todas las tareas de la bd al front {tasks} = {tasks:tasks}
});

router.post("/add", async (req, res) => {
  const task = new Task(req.body);

  await task.save();

  res.redirect("/");
});

router.get("/turn/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  task.status = !task.status;

  await task.save();

  res.redirect("/");
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;

  await Task.updateOne({ _id: id }, req.body);

  res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  res.render("edit", { task });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params; // params contiene todo lo del request

  await Task.remove({ _id: id });

  res.redirect("/");
});

module.exports = router;
