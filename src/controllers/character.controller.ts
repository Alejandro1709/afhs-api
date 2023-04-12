import Character from '../models/Character';
import cloudinary from '../utils/cloudinary';
import catchAsync from '../utils/catchAsync';
import type { Request, Response } from 'express';
import type ICharacter from '../types/character';

export const getCharacters = catchAsync(async (_req: Request, res: Response) => {
  const characters: ICharacter[] = await Character.find();
  res.status(200).json(characters);
});

export const getCharacter = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const character = await Character.findOne({ slug });

  if (!character) {
    return res.status(404).json({ message: 'Character not found' });
  }

  res.status(200).json(character);
});

export const createCharacter = catchAsync(async (req: Request, res: Response) => {
  const result = await cloudinary.uploader.upload(req.body.image, {
    folder: 'afhs'
  })

  const savedCharacter = await Character.create({
    ...req.body,
    image: result.secure_url,
  });

  res.status(201).json(savedCharacter);
});

export const updateCharacter = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const character = await Character.findOneAndUpdate({ slug }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!character) {
    return res.status(404).json({ message: 'Character not found' });
  }

  res.status(200).json(character);
});

export const deleteCharacter = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const character = await Character.findOne({ slug });

  if (!character) {
    return res.status(404).json({ message: 'Character not found' });
  }

  await character.deleteOne();

  res.status(200).json({ message: 'Character deleted' });
});
