import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ default: 0 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  // Xiriirka Category-ga (Many Books to One Category)
  @ManyToOne(() => Category, (category) => category.books)
  category: Category; 
}
