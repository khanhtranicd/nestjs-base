import CategoryEntity from '@modules/database/entities/category.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityFactory } from './ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class AbilityModule {}
