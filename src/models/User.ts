import mongoose, { Schema } from 'mongoose';
import type IUser from '../types/user';

const UserSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  }
}, {
  timestamps: true,
});

export default mongoose.model<IUser>('User', UserSchema);