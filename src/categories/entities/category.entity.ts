import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Book } from '../../book/entities/book.entity'; // Import-gan waa sax haddii uu book module-kaagu ku yaalo 'src/book'

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: '' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Xiriirka Buugaagta (One Category to Many Books)
  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
