const express = require("express");
const controller = require("../../../controllers/tasksController");
const Task = require("../../../models/tasks");
const mapResponse = require("../../../helpers/responseMapper");
const { checkToken } = require("../../../helpers/middlewares");

const router = express.Router();

router.get("/", checkToken, async (req, res) => {
  const tasks = await controller.getAllTaks();
  if (typeof tasks === "object") {
    res.send(mapResponse(tasks, true));
  } else {
    res.send(
      mapResponse(
        { data: [] },
        false,
        "Error trying to get the list of tasks, please try again"
      )
    );
  }
});

router.post("/add", checkToken, async (req, res) => {
  const { description } = req.body;
  const result = await controller.addTask({ description });
  if (result instanceof Task) {
    res.send(mapResponse(result._doc, true, "")).json();
  }
  res.send(mapResponse({}, false, "Error trying to add the task")).json();
});

router.delete("/:id", checkToken, async (req, res) => {
  try {
    const _id = req.params.id.toString();
    const result = await controller.removeTask(_id);
    if (result.ok === 1) {
      res
        .send(mapResponse({ _id }, true, "Item has been removed successfully"))
        .json();
    } else {
      res
        .send(mapResponse({ _id }, false, "Error trying to remove the task"))
        .json();
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/edit/:id", checkToken, async (req, res) => {
  const result = await controller.editTask({
    ...req.body,
    _id: req.params.id.toString(),
  });
  if (result instanceof Task) {
    res.send(mapResponse(result._doc, true, "")).json();
  }
  res
    .send(mapResponse({ data: {} }, false, "Error trying to edit the task"))
    .json();
});

module.exports = router;
