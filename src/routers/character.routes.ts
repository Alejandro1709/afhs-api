import { Router } from 'express';
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  getCharacters,
  updateCharacter,
} from '../controllers/character.controller';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.route('/').get(getCharacters).post(protect, createCharacter);

router.route('/:slug').get(getCharacter).patch(protect, updateCharacter).delete(protect, deleteCharacter);

export default router;
