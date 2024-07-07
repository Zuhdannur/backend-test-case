import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from 'src/modules/book/domain/transaction.entity';
import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    example: 'code',
    description: 'The unique identifier of the use',
  })
  @PrimaryColumn()
  code: string;

  @ApiProperty({
    example: 'Angga',
    description: 'The name of users',
  })
  @Column()
  name: string;

  @Column({ type: 'date', nullable: true })
  got_penalty_until: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
