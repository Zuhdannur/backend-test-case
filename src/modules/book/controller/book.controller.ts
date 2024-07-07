import { Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Book } from '../domain/book.entity';
import { BookService } from '../application/services/book.service';
import { ReturnBorrowBook } from '../application/dto/return.book.dto';
import { CreateBorrowBook } from '../application/dto/borrow.book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @ApiOperation({ summary: 'Get All Member' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: [Book],
  })
  @Get()
  async getAllBooks() {
    try {
      return {
        message: 'success',
        data: await this.bookService.getListBook(),
      };
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: 'Return Books Borrowed' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: [Book],
  })
  @Post('/return')
  async returnBooks(@Body() returnBorrowBook: ReturnBorrowBook) {
    try {
      const res = await this.bookService.returnSomeBook(returnBorrowBook);
      return {
        message: 'success',
        data: res,
      };
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Borrow Books' })
  @ApiResponse({
    status: 200,
    description: 'Books successfult borrowed',
  })
  async borrowBooks(@Body() CreateBorrowBook: CreateBorrowBook) {
    try {
      const res = await this.bookService.borrowSomeBook(CreateBorrowBook);
      return {
        message: 'success',
        data: res,
      };
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
}
