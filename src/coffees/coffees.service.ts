import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'one',
      brand: 'new',
      flavors: ['one', 'two'],
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
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
