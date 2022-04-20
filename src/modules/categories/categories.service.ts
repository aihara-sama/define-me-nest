import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}
  create(createCategoryInput: CreateCategoryInput) {
    return this.categoriesRepo.create(createCategoryInput);
  }

  findAll() {
    return this.categoriesRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoriesRepo.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.categoriesRepo.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.categoriesRepo.save({ ...category, ...updateCategoryInput });
  }

  async remove(id: number) {
    const category = await this.categoriesRepo.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.categoriesRepo.remove(category);
  }
}
