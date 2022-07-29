import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreController } from './store.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SellerService } from '../seller/seller.service';
import UserEntity from '@modules/database/entities/user.entity';
import SellerEntity from '@modules/database/entities/seller.entity';
import CategoryEntity from '@modules/database/entities/category.entity';
import { AbilityModule } from '@modules/ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SellerEntity, CategoryEntity]), AbilityModule],
  controllers: [StoreController],
  providers: [UserService, SellerService],
  exports: [UserService],
})
export class StoreModule {}
