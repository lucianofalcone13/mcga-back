const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    description: String,
});

const Task = mongoose.model('Task', schema);

module.exports = Task;