const actionHandler = require("../helpers/actionHandler");
const handleError = require("../helpers/errorHandler");
const taskModel = require("../models/tasks");

const controller = {
    getAllTaks: () => {
        return actionHandler(() => taskModel.find());
    },
    addTask: (data) => {
        return actionHandler(() => taskModel.create(data));
    },
    removeTask: (id) => {
        return actionHandler(() => taskModel.deleteOne({ _id: id }));
    },
    editTask: (data) => {
        return actionHandler(() => taskModel.findOneAndUpdate({ _id: data._id }, data, { new: true, useFindAndModify: false }, handleError));
    }
}

module.exports = controller;