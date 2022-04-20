import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { CardsModule } from './modules/cards/cards.module';
import { LinksModule } from './modules/links/links.module';
import { AppController } from './app.controller';
import { ImagesController } from './images.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { CategoriesController } from './modules/categories/categories.controller';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist'),
      renderPath: '',
    }),
    TypeOrmModule.forRoot(),
    // CategoriesModule,
    CardsModule,
    LinksModule,
    SearchModule,
  ],
  controllers: [AppController, ImagesController],
  providers: [],
})
export class AppModule {}
