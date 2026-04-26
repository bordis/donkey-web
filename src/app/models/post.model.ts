import { User } from './user.model';

export interface Post {
  id: number;
  donkeyName: string;
  content: string;
  photoUrl?: string;
  author: User;
  createdAt: string;
}
