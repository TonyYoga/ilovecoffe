import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable({ scope: Scope.REQUEST })
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],
  ) {
    console.log('CoffeesService instantiated');
  }

  public getAll(pagination: PaginationQueryDto) {
    const { limit, offset } = pagination;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  public async getOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee id #${id} not found`);
    }
    return coffee;
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recomendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recomended_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);
      queryRunner.commitTransaction();
    } catch (err) {
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }

  async create(createCoffeeDTO: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDTO.flavors.map((name) => this.proloadFlavourByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDTO,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  public async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.proloadFlavourByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee id #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  public async remove(id: string) {
    const coffee = await this.coffeeRepository.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async proloadFlavourByName(name: string) {
    const existingFlavor = await this.flavorRepository.findOne({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
