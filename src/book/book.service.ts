import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    const newBook = this.bookRepository.create({
        title: createBookDto.title,
        author: createBookDto.author,
        price: createBookDto.price,
        category: { id: createBookDto.categoryId } 
    });
    return this.bookRepository.save(newBook);
  }

  findAll() {
    return this.bookRepository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id }, relations: ['category'] });
    if (!book) throw new NotFoundException(`Buugga leh ID #${id} lama helin`);
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id); // Hubi inuu jiro marka hore
    return this.bookRepository.save({ ...book, ...updateBookDto });
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    return this.bookRepository.remove(book);
  }
}
