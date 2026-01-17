import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service'; // <-- Halkan ayaa magaca lagu saxay
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService], // <-- Halkan ayaa magaca lagu saxay
})
export class BookModule {}
