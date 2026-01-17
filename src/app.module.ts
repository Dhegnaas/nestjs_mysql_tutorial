import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Profile } from './Typeorm/entities/Profile';
import { Post } from './Typeorm/entities/Post';
import { BookModule } from './book/book.module';
import { Book } from './book/entities/book.entity';
import { Category } from './categories/entities/category.entity';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs_mysql_tutorial',
      entities: [User, Profile, Post, Book, Category],
      synchronize: true,
    }),
    UsersModule,
    BookModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
