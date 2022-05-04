import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

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
    const coffee = this.coffeesService.getOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }
    // return `This action return #${id}coffee`;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
    // return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.update(id, updateCoffeeDto);
    // return `This action update #${id}coffee`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    Logger.log(`id: ${id}`);
    return this.coffeesService.remove(id);
    // return `This action delete #${id}coffee`;
  }
}
