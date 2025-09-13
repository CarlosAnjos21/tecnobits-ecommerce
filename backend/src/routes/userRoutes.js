import express from 'express';
import * as userController from '../controllers/UserController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/me', protect, userController.getMe);

//apenas admin
router.put('/:id', protect, authorize('admin'), userController.updateUser);
router.delete('/:id', protect, authorize('admin'), userController.deleteUser)


export default router;