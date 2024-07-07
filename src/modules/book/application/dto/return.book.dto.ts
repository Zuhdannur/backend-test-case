import { ApiProperty } from '@nestjs/swagger';

export class ReturnBorrowBook {
  @ApiProperty({ description: 'value is use user code', default: 'M001' })
  readonly user_code: string;

  @ApiProperty({
    description: 'value is date when return the book',
    default: '2024/07/07',
  })
  readonly returned_date_at: string;

  @ApiProperty({
    description: 'list of books that want to returned',
    default: ['SHR-1', 'TW-11'],
  })
  readonly books_code: string[];
}
