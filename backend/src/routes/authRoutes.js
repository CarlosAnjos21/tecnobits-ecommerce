import express from 'express';
import * as authController from '../controllers/AuthController.js';
import { getProfile, updateProfile } from '../controllers/UserController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { updateProfileSchema } from '../validators/userSchemas.js';

const router = express.Router();

// Rotas de autenticação pública
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rotas de perfil privado (protegidas)
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, validate(updateProfileSchema), updateProfile);

export default router;