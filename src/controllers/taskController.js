const Task = require('../models/Tasks');

exports.createTask = async (req,res)=>{
  try{
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId
    });

    await task.save();
    res.status(201).send(task);
  } catch (error) {
    console.error('Error al crear la tarea: ', error);
    res.status(400).send(error);
  }
}

exports.getAllTasks = async (req,res)=>{
  try {
    const tasks = await Task.find({});

    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getTaskById = async (req,res)=>{
  try {
    const task = await Task.findById(req.params.id);
    if(!task){
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.updateTask = async (req,res)=>{
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if(!task){
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.deleteTask = async (req,res)=>{
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task){
      return res.status(404).send();
    }
    
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
}
