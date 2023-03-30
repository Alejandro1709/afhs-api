import { Router } from 'express';
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  getCharacters,
  updateCharacter,
} from '../controllers/character.controller';

const router = Router();

router.route('/').get(getCharacters).post(createCharacter);

router.route('/:slug').get(getCharacter).patch(updateCharacter).delete(deleteCharacter);

export default router;
