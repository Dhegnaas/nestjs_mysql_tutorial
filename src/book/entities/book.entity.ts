import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'books' }) // Magaca table-ka ee database-ka
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
}
