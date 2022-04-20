import { Controller, Get, Query } from '@nestjs/common';
import { ISearch } from './interfaces/search.interface';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get()
  searchCards(@Query() query: ISearch) {
    this.searchService.search(query);
  }
}
