import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityFactory } from './ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class AbilityModule {}
