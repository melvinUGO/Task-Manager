const Task = require("../model/task");

const getAllTask = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
};

const getTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      res.status(404).json({ msg: "no task with id " + taskID });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `no task with id : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _ID: taskID });

    if (!task) {
      return res.status(404).json({ msg: `no task with id : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { getAllTask, getTask, createTask, updateTask, deleteTask };
