import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}
  @Post('/')
  createCard(@Body() createCardInput: CreateCardInput) {
    return this.cardsService.create(createCardInput);
  }

  @Put(':id')
  updateCard(
    @Body() updateCardInput: UpdateCardInput,
    @Param('id') id: number,
  ) {
    return this.cardsService.update(id, updateCardInput);
  }
  @Get(':id')
  findOneCard(@Param('id') id: number) {
    return this.cardsService.findOne(id);
  }
  @Get()
  findAllCards() {
    return this.cardsService.findAll();
  }

  @Delete(':id')
  removeOneCard(@Param('id') id: number) {
    return this.cardsService.remove(id);
  }
}
