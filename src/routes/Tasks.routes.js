const express = require("express");
const taskController = require("../controllers/taskController");
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { taskValidationSchema } = require('../validation');

const router = express.Router();

router.post('/', auth, validate(taskValidationSchema), taskController.createTask);

router.get('/', auth, taskController.getAllTasks);
router.get('/:id', auth, taskController.getTaskById);

router.put('/:id', auth, validate(taskValidationSchema), taskController.updateTask);

router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;