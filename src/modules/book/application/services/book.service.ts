import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/user/domain/user.repository';
import { BOOK_REPOSITORY, BookRepository } from '../../domain/book.repository';
import { ReturnBorrowBook } from '../dto/return.book.dto';
import { CreateBorrowBook } from '../dto/borrow.book.dto';
import { Transaction } from '../../domain/transaction.entity';
import { formatDate } from 'src/shared/utils/helpers';

@Injectable()
export class BookService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(BOOK_REPOSITORY) private readonly bookRepository: BookRepository,
  ) {}

  async getListBook() {
    return await this.bookRepository.findAll();
  }

  async borrowSomeBook(payload: CreateBorrowBook) {
    if (payload.books_code.length === 0)
      throw Error('there is no books borrowed');
    if (payload.books_code.length > 2)
      throw Error('books only can borrowed 2 or lower');

    const user = await this.userRepository.findById(payload.user_code);
    if (!user) throw Error('user not found');

    if (user.got_penalty_until) {
      const date_penalty = new Date(user.got_penalty_until);
      const borrowed_at = new Date(payload.borrow_date_at);

      if (borrowed_at < date_penalty)
        throw Error('you still on penalty periode');
    }

    await Promise.all(
      payload.books_code.map(async (x: any) => {
        const book = await this.bookRepository.findById(x);
        if (!book) throw Error('Book not found');

        if (book.stock === 0)
          throw Error(`${book.code} - ${book.title} is borrowed by someone`);
      }),
    );
    return await this.bookRepository.borrowBooks(payload);
  }

  isMoreThan7DaysAfter(date1: Date, date2: Date): boolean {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 7;
  }

  async returnSomeBook(payload: ReturnBorrowBook) {
    if (payload.books_code.length === 0)
      throw Error('there is no books borrowed');

    const user = await this.userRepository.findById(payload.user_code);
    if (!user) throw Error('user not found');

    const borrowedBooks = await this.bookRepository.getBooksGetBorrowedByUser(
      user.code,
      payload.books_code,
    );

    if (borrowedBooks.length === 0) throw Error('There is no books borrowed');

    let is_got_penalty = null;
    await Promise.all(
      borrowedBooks.map(async (transaction: Transaction) => {
        transaction.returned_date_at = payload.returned_date_at;
        await this.bookRepository.returnBooks(transaction);

        const borrowed_at = transaction.borrow_date_at;
        const returned_at = payload.returned_date_at;

        if (
          returned_at &&
          this.isMoreThan7DaysAfter(
            new Date(borrowed_at),
            new Date(returned_at),
          )
        ) {
          const penalty = new Date(returned_at);
          penalty.setDate(penalty.getDate() + 3);
          user.got_penalty_until = formatDate(penalty);
          this.userRepository.update(user);

          is_got_penalty = true;
        }
      }),
    );

    if (is_got_penalty)
      return 'success return the books, but u got penalty for 3 days cannot borrow books';

    return borrowedBooks;
  }
}
