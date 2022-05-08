import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeReactoring1652012202939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`ALTER TABLE "coffee" RENAME "name" TO "title"`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`ALTER TABLE "coffee" RENAME "title" TO "name"`);
  }
}
