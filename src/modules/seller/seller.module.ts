import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import SellerEntity from '@modules/database/entities/seller.entity';
import { AbilityModule } from '@modules/ability/ability.module';
import { UserService } from '@modules/user/user.service';
import UserEntity from '@modules/database/entities/user.entity';
import CategoryEntity from '@modules/database/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity, UserEntity, CategoryEntity]), AbilityModule],
  controllers: [SellerController],
  providers: [SellerService, UserService],
  exports: [SellerService],
})
export class SellerModule {}
