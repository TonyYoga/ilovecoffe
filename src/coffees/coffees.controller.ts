import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() pagination) {
    const { limit, offset } = pagination;
    return this.coffeesService.getAll();
    // return `This action return coffee Limit: ${limit} Offset: ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.getOne(id);
    // return `This action return #${id}coffee`;
  }

  @Post()
  create(@Body() body) {
    return this.coffeesService.create(body);
    // return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.update(id, body);
    // return `This action update #${id}coffee`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    Logger.log(`id: ${id}`);
    return this.coffeesService.remove(id);
    // return `This action delete #${id}coffee`;
  }
}
