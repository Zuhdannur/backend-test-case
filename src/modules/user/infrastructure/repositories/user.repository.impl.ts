import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { Repository } from 'typeorm';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        'user.transactions',
        'transaction',
        'transaction.returned_date_at IS NULL',
      )
      .leftJoinAndSelect('transaction.book', 'book')
      .getMany();
  }
  async findById(code: string): Promise<User> {
    return await this.repository.findOne({
      where: {
        code: code,
      },
    });
  }
  async update(user: User): Promise<User> {
    return await this.repository.save(user);
  }
}
