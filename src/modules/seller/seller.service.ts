import { DELETE_MODE } from './../../shared/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { BaseService } from '@shared/base/base.service';
import SellerEntity from '@modules/database/entities/seller.entity';
import { PAGINATION } from '@shared/common/constants';
import UserEntity from '@modules/database/entities/user.entity';
import * as _ from 'lodash';

@Injectable()
export class SellerService extends BaseService<SellerEntity> {
  constructor(
    @InjectRepository(SellerEntity) private sellerRepository: Repository<SellerEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      repository: sellerRepository,
      deleteMode: DELETE_MODE.Soft,
    });
  }

  async register(data): Promise<any> {
    const sellerEntity: SellerEntity = this.sellerRepository.create();
    const { number } = data;
    sellerEntity.created_date = number;
    await this.sellerRepository.save(sellerEntity);
    return sellerEntity;
  }

  async registration(seller: SellerEntity): Promise<any> {
    if (seller.id) {
      return await this.sellerRepository.update(seller.id, seller);
    }

    return await this.sellerRepository.save(seller);
  }

  async deleteSeller(id: number): Promise<any> {
    await this.sellerRepository.delete(id);
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const existingSeller = await this.sellerRepository.findOne({ email });
    return !!existingSeller;
  }

  async checkEmailExistsExceptId(id: number, email: string): Promise<any> {
    const exists = await this.sellerRepository.findOne({
      where: {
        id: Not(id),
        email,
      },
    });
    return exists;
  }

  async searchSellers(params: any): Promise<any> {
    !params['name'] && (params['name'] = '');
    let conditionEnFull =
      "CONCAT(first_name, ' ', last_name) LIKE :fullName AND delete_flg = false";

    const conditionWhere: any = {
      fullName: `%${params['name']}%`,
    };
    if (params['position']) {
      conditionEnFull += ' AND position = :position';
      conditionWhere.position = params['position'];
    }
    if (params['status']) {
      conditionEnFull += ' AND status = :status';
      conditionWhere.status = params['status'];
    }
    const [sellers, total]: any = await this.sellerRepository
      .createQueryBuilder()
      .where(conditionEnFull, conditionWhere)
      .limit(PAGINATION.PerPage)
      .offset((params['page'] - 1) * PAGINATION.PerPage)
      .getManyAndCount();

    return { sellers, total };
  }

  async findById(id: number): Promise<SellerEntity> {
    const seller = await this.sellerRepository.findOne({ id });
    if (!seller) {
      throw new NotFoundException();
    }
    return seller;
  }

  async findAllSellersExceptUserRegistered(): Promise<SellerEntity[]> {
    const users = await this.userRepository.find();
    const userIds = _.map(users, 'seller_id');
    return await this.sellerRepository
      .createQueryBuilder()
      .where('id NOT IN (:...userIds) AND delete_flg = false', { userIds })
      .orderBy('id', 'DESC')
      .getMany();
  }

  findAll(): Promise<SellerEntity[]> {
    return this.sellerRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  findByEmail(email: string): Promise<SellerEntity> {
    return this.sellerRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.sellerRepository.delete(id);
  }

  public removeTemporaryFields(seller: SellerEntity) {
    delete seller.full_name;
    return super.removeTemporaryFields(seller);
  }
}
