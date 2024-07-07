import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './domain/book.entity';
import { BookService } from './application/services/book.service';
import { BOOK_REPOSITORY } from './domain/book.repository';
import { BookRepositoryImpl } from './infrastructure/repositories/book.repository.impl';
import { BookController } from './controller/book.controller';
import { USER_REPOSITORY } from '../user/domain/user.repository';
import { UserRepositoryImpl } from '../user/infrastructure/repositories/user.repository.impl';
import { User } from '../user/domain/user.entity';
import { Transaction } from './domain/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Transaction])],
  providers: [
    BookService,
    {
      provide: BOOK_REPOSITORY,
      useClass: BookRepositoryImpl,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
