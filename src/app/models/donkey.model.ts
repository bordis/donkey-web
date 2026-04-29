import { User } from './user.model';

export interface Donkey {
  id: number;
  name: string;
  bio?: string;
  photoUrl?: string;
  registeredBy: User;
  createdAt: string;
}
