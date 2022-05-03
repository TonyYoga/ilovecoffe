import { Injectable, Logger } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'first',
      brand: 'new F',
      flavors: ['1', '2'],
    },
    {
      id: 2,
      name: 'second',
      brand: 'new S',
      flavors: ['3', '4'],
    },
  ];

  public getAll() {
    return this.coffees;
  }

  public getOne(id: string) {
    return this.coffees.find((item) => item.id === +id);
  }

  public create(createCoffeeDTO: any) {
    return this.coffees.push(createCoffeeDTO);
  }

  public update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.getOne(id);
    if (existingCoffee) {
      //update existing entry
    }
  }

  public remove(id: string) {
    let coffeeIndex = -1;
    coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    Logger.log(`index: ${coffeeIndex}`);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
