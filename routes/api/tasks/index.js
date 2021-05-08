const express = require("express");
const controller = require("../../../controllers/tasksController");
const Task = require("../../../models/tasks");
const mapResponse = require("../../../helpers/responseMapper");

const router = express.Router();

router.get("/", async (req, res) => {
    const tasks = await controller.getAllTaks();
    if (typeof tasks === "object" && tasks.length) {
        res.send(mapResponse({ data: tasks }));
    } else {
        res.send(mapResponse({ data: [] }, false, "Error trying to get the list of tasks, please try again"));
    }
});

router.post("/add", async (req, res) => {
    const { description } = req.body;
    const result = await controller.addTask({ description });
    if (result instanceof Task) {
        res.send(mapResponse(result, true, "")).json();
    }
    res.send(mapResponse({ data: {} }, false, "Error trying to add the task")).json();
});

router.delete("/:id", async (req, res) => {
    const _id = req.params.id.toString();
    const result = await controller.removeTask(_id);
    if (result.ok === 1) {
        res.send(mapResponse({ _id }, true, "Items has been removed successfully")).json();
    } else {
        res.send(mapResponse({ _id }, false, "Error trying to remove the task")).json();
    }
});

router.get("/edit/:id", async (req, res) => {
    const result = await controller.editTask({
        ...req.body,
        _id: req.params.id.toString(),
    });
    if (result instanceof Task) {
        res.send(mapResponse(result, true, "")).json();
    }
    res.send(mapResponse({ data: {} }, false, "Error trying to edit the task")).json();
});

module.exports = router;
