import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Task } from "../modals/TaskModels.js";
import { createTask } from "../JioSchema/taskValidation.js";

export const addTask = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id;
  const value = await createTask.validateAsync(req.body);
  const task2 = await Task.create(value);
  res.status(201).json({
    success: true,
    task: task2,
  });
});

export const updateTask = catchAsyncErrors(async (req, res, next) => {
  let _id = req.body._id;
  const newData = {
    end: req.body.end,
  };
  const task = await Task.findByIdAndUpdate(_id, newData, {
    new: true,
  });
  res.status(200).json({
    success: true,
    task,
  });
});

export const getTask = catchAsyncErrors(async (req, res, next) => {
  try {
    const task = await Task.find();
    res.status(200).json({
      success: true,
      task: task,
    });
  } catch (error) {}
});

export const getTaskByUser = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = {
      _id: req.params.id,
    };
    const task = await Task.find({ user });
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {}
});
