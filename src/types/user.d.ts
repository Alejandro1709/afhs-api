type ROLE = 'admin' | 'user';

export default interface IUser {
  _id?: string | number;
  name: string;
  email: string;
  password: string;
  role: ROLE;
}