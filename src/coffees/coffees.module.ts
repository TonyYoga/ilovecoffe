import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ['buddy brew', 'nescafe'],
      // scope: Scope.TRANSIENT,
      // useFactory: async (connection: Connection): Promise<string[]> => {
      // const coffeeBrands = await connection.query('SELECT ....');
      // const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
      // console.log('[!] Async factory');
      // return coffeeBrands;
      // },
      // inject: [Connection],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
