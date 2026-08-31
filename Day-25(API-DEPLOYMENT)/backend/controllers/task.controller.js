const Task = require('../models/Task');

const getTasks = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    const filter = {
      user: req.user.userId,
    };

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: 'i',
      };
    }

    const tasks = await Task.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title || title.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Task title must contain at least 2 characters',
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      user: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
