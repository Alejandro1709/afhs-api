import characters from '../data/characters';
import Character from '../models/Character';
import type { Request, Response } from 'express';
import type ICharacter from '../types/character';

export const getCharacters = async (_req: Request, res: Response) => {
  try {
    const characters: ICharacter[] = await Character.find();
    res.status(200).json(characters);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Failed', message: error });
  }
};

export const getCharacter = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const character = await Character.findOne({ slug });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json(character);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Failed', message: error });
  }
};

export const createCharacter = async (req: Request, res: Response) => {
  try {
    const savedCharacter = await Character.create(req.body);

    res.status(201).json(savedCharacter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Failed', message: error });
  }
};

export const updateCharacter = async (req: Request, res: Response) => {
  const { name, actor, image, birthdate, work, otherWork, status, gender, height, nicknames, catchphrases } = req.body;

  const { slug } = req.params;

  const character = characters.find((character) => character.slug === slug);

  if (!character) {
    return res.status(404).json({ message: 'Character not found' });
  }

  const updatedCharacter = {
    ...character,
    name,
    slug: name.toLowerCase().replace(/ /g, '-'),
    actor,
    image,
    birthdate,
    work,
    otherWork,
    status,
    gender,
    height,
    nicknames,
    catchphrases,
  };

  const index = characters.findIndex((character) => character.slug === slug);

  characters[index] = updatedCharacter;

  res.status(200).json(updatedCharacter);
};

export const deleteCharacter = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const character = await Character.findOne({ slug });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    await character.deleteOne();

    res.status(200).json({ message: 'Character deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Failed', message: error });
  }
};
