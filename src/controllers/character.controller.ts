import characters from '../data/characters';
import type { Request, Response } from 'express';

export const getCharacters = async (_req: Request, res: Response) => {
  res.status(200).json(characters);
};

export const getCharacter = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const character = characters.find((character) => character.slug === slug);

  if (!character) {
    res.status(404).json({ message: 'Character not found' });
  }

  res.status(200).json(character);
};

export const createCharacter = async (req: Request, res: Response) => {
  const { name, actor, image, birthdate, work, otherWork, status, gender, height, nicknames, catchphrases } = req.body;

  const newCharacter = {
    id: characters.length + 1,
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

  characters.push(newCharacter);

  res.status(201).json(newCharacter);
};

export const updateCharacter = async (req: Request, res: Response) => {
  const { name, actor, image, birthdate, work, otherWork, status, gender, height, nicknames, catchphrases } = req.body;

  const { slug } = req.params;

  const character = characters.find((character) => character.slug === slug);

  if (!character) {
    res.status(404).json({ message: 'Character not found' });
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

  const character = characters.find((character) => character.slug === slug);

  if (!character) {
    res.status(404).json({ message: 'Character not found' });
  }

  const index = characters.findIndex((character) => character.slug === slug);

  characters.splice(index, 1);

  res.status(200).json({ message: 'Character deleted' });
};
