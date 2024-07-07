import { User } from 'src/modules/user/domain/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_code: string;

  @Column({ type: 'date', nullable: true })
  borrow_date_at: string;

  @Column({ type: 'date', nullable: true })
  returned_date_at: string;

  @Column()
  book_code: string;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_code' })
  user: User;

  @ManyToOne(() => Book, (book) => book.transactions)
  @JoinColumn({ name: 'book_code' })
  book: Book;
}
