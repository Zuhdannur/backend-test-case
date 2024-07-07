import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class Book {
  @PrimaryColumn()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;

  @OneToMany(() => Transaction, (transaction) => transaction.book)
  transactions: Transaction[];
}
