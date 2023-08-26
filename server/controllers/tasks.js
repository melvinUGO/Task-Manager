const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");

const getAllTasks = async (req, res) => {
  const { userId } = req.user;
  const { completed, sort } = req.query;

  // filter completed and uncompleted task
  if (completed) {
    console.log(completed);
    const booleanCompleted = completed === "true" ? true : false;
    console.log(booleanCompleted);
    const tasks = await Task.find({ userId, completed: booleanCompleted });

    return res.status(StatusCodes.OK).json({ tasks });
  }

  // sort
  if (sort) {
    const tasks = await Task.find({ userId }).sort({ createdAt: sort });
    return res.status(StatusCodes.OK).json({ tasks });
  }

  const tasks = await Task.find({ userId });
  res.status(StatusCodes.OK).json({ tasks });
};

const createTask = async (req, res) => {
  const { name } = req.body;
  const { userId } = req.user;

  const task = await Task.create({ name, userId });

  res.status(StatusCodes.CREATED).json({ task });
};

const getTask = async (req, res) => {
  const { id: taskID } = req.params;
  const { userId } = req.user;

  const task = await Task.findOne({ _id: taskID, userId });
  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No task with id : ${taskID}` });
  }

  res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  const { userId } = req.user;

  const task = await Task.findOneAndDelete({ _id: taskID, userId });
  if (!task) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No task with id : ${taskID}` });
  }
  res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
  const { id: taskID } = req.params;
  const { userId } = req.user;

  const task = await Task.findOneAndUpdate({ _id: taskID, userId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No task with id : ${taskID}` });
  }

  res.status(StatusCodes.OK).json({ task });
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
