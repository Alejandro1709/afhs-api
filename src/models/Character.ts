import mongoose, { Schema } from 'mongoose';
import type ICharacter from '../types/character';

const characterSchema = new Schema<ICharacter>({
  name: { type: String, required: true },
  slug: { type: String },
  actor: [
    {
      type: String,
      required: true,
    },
  ],
  image: { type: String },
  birthdate: [
    {
      type: String,
    },
  ],
  work: [
    {
      type: String,
    },
  ],
  otherWork: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ['VIVO', 'MUERTO', 'LUCHITO', 'DESCONOCIDO', 'DESAPARECIDO'],
    required: true,
    default: 'DESCONOCIDO',
  },
  gender: {
    type: String,
    enum: ['HOMBRE', 'MUJER'],
    required: true,
  },
  height: { type: Number },
  nicknames: [
    {
      type: String,
    },
  ],
  catchphrases: [
    {
      type: String,
    },
  ],
});

const Character = mongoose.model<ICharacter>('Character', characterSchema);

export default Character;
