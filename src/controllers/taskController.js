const Task = require('../models/Tasks');

exports.createTask = async (req,res)=>{
  try{
    const task = new Task({
      ...req.body,
      userId: req.user._id // Asociar tarea a usuario
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
    const tasks = await Task.find({ userId: req.user._id });

    if(!tasks.length){
      return res.send("No tienes tareas. Crea nuevas tareas!");
    }

    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getTaskById = async (req,res)=>{
  const _id = req.params.id;

  try {
    const task = await Task.findById({ _id, userId: req.user._id });

    if(!task){
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.updateTask = async (req,res)=>{
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description', 'completed'];
  const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

  if(!isValidOperation){
    return res.status(400).send({ error: 'Actualizacion evitada, no está permitida.' });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if(!task){
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.deleteTask = async (req,res)=>{
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if(!task){
      return res.status(404).send();
    }
    
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
}
