import { CreateBorrowBook } from '../application/dto/borrow.book.dto';
import { Book } from './book.entity';
import { Transaction } from './transaction.entity';

export const BOOK_REPOSITORY = 'BOOK_REPOSITORY';
export interface BookRepository {
  findAll(): Promise<Book[]>;
  findById(code: string): Promise<Book>;

  borrowBooks(CreateBorrowBook: CreateBorrowBook): Promise<boolean>;
  getBooksGetBorrowedByUser(
    user_code: string,
    books_list?: string[],
  ): Promise<Transaction[]>;
  returnBooks(transaction: Transaction): Promise<Transaction>;
}
