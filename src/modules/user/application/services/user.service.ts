import { Inject, Injectable } from '@nestjs/common';
import {
  BOOK_REPOSITORY,
  BookRepository,
} from 'src/modules/book/domain/book.repository';
import { Transaction } from 'src/modules/book/domain/transaction.entity';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/user/domain/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(BOOK_REPOSITORY) private readonly bookRepository: BookRepository,
  ) {}

  async getListMember() {
    const listMember = (await this.userRepository.findAll()).map(
      (item: any) => {
        const { transactions, ...other } = item;
        other.total_borrowed_books = transactions.length;
        other.books_borrowed = transactions.map(
          (transaction: Transaction) => transaction.book.title,
        );
        return other;
      },
    );
    return listMember;
  }
}
