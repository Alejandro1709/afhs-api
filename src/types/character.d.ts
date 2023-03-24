type STATUS = 'VIVO' | 'MUERTO' | 'LUCHITO' | 'DESCONOCIDO' | 'DESAPARECIDO';

type GENDER = 'HOMBRE' | 'MUJER';
export default interface ICharacter {
  id?: string | number;
  name: string;
  slug?: string;
  actor: string | string[];
  image?: string;
  birthdate?: string[];
  work?: string[];
  otherWork?: string[];
  status: STATUS;
  gender: GENDER;
  height?: number;
  nicknames?: string[];
  catchphrases?: string[];
}
