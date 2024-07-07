import { User } from './user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(code: string): Promise<User>;
  update(user: User): Promise<User>;
}
