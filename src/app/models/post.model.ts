import { User } from './user.model';
import { Donkey } from './donkey.model';

export interface Post {
  id: number;
  content: string;
  photoUrl?: string;
  donkey: Donkey;
  author: User;
  createdAt: string;
}
