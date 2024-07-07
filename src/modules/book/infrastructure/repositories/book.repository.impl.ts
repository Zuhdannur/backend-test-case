import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../../domain/book.entity';
import { BookRepository } from '../../domain/book.repository';
import { In, IsNull, Repository } from 'typeorm';
import { CreateBorrowBook } from '../../application/dto/borrow.book.dto';
import { Transaction } from '../../domain/transaction.entity';

export class BookRepositoryImpl implements BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}
  async findAll(): Promise<Book[]> {
    return this.repository.find();
  }
  async findById(code: string): Promise<Book> {
    return await this.repository.findOne({
      where: {
        code: code,
      },
    });
  }

  async borrowBooks(createBorrowBook: CreateBorrowBook) {
    await Promise.all(
      createBorrowBook.books_code.map(async (item: any) => {
        const payload: any = {
          ...createBorrowBook,
        };

        delete payload.books_code;

        const book = await this.repository.findOne({
          where: {
            code: item,
          },
        });
        book.stock = book.stock - 1;
        this.repository.save(book);

        payload.book_code = book.code;
        await this.transactionRepository.save(payload);
      }),
    );
    return true;
  }

  async getBooksGetBorrowedByUser(
    user_code: string,
    books_list?: string[],
  ): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      where: {
        user_code: user_code,
        returned_date_at: IsNull(),
        book_code: In(books_list),
      },
    });
  }

  async returnBooks(transaction: Transaction): Promise<Transaction> {
    const book = await this.repository.findOne({
      where: {
        code: transaction.book_code,
      },
    });
    book.stock = book.stock + 1;
    this.repository.save(book);

    return await this.transactionRepository.save(transaction);
  }
}
