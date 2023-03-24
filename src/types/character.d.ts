export default interface ICharacter {
  id?: string;
  name: string;
  actor: string;
  image?: string;
  birthdate?: string[];
  work?: string[];
  otherWork?: string[];
  status: 'VIVO' | 'MUERTO' | 'LUCHITO' | 'DESCONOCIDO';
  gender: 'HOMBRE' | 'MUJER';
  height?: number;
  nicknames?: string[];
  catchphrases?: string[];
}
