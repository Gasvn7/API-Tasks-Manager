const express = require("express");
const taskController = require("../controllers/taskController.js");
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth, taskController.createTask);

router.get('/', auth, taskController.getAllTasks);
router.get('/:id', auth, taskController.getTaskById);

router.put('/:id', auth, taskController.updateTask);

router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;