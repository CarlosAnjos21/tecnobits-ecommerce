import express from 'express';
import * as userController from '../controllers/UserController.js';


const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

//apenas admin
// router.put('/:id', protect, authorize('admin'), userController.updateUser);


export default router;