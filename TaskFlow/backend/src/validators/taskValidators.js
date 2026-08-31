const { body } = require('express-validator');

const taskValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium or High'),
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be Pending, In Progress or Completed'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date'),
];

module.exports = { taskValidator };
