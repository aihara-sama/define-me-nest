import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Post('/')
  createCategory(@Body() createCategoryInput: CreateCategoryInput) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Put(':id')
  updateCategory(
    @Body() updateCategoryInput: UpdateCategoryInput,
    @Param('id') id: number,
  ) {
    return this.categoriesService.update(id, updateCategoryInput);
  }
  @Get(':id')
  findOneCategory(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }
  @Get()
  findAllCategories() {
    return this.categoriesService.findAll();
  }

  @Delete(':id')
  removeOneCategory(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
