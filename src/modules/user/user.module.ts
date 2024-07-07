import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { USER_REPOSITORY } from './domain/user.repository';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { Book } from '../book/domain/book.entity';
import { BOOK_REPOSITORY } from '../book/domain/book.repository';
import { BookRepositoryImpl } from '../book/infrastructure/repositories/book.repository.impl';
import { Transaction } from '../book/domain/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Transaction])],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: BOOK_REPOSITORY,
      useClass: BookRepositoryImpl,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
