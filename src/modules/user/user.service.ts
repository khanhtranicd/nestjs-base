import UserEntity from '@modules/database/entities/user.entity';
import CategoryEntity from '@modules/database/entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@shared/base/base.service';
import { Repository } from 'typeorm';
import { createUserData } from './user.type';
import { DELETE_MODE, GENRE, PAGINATION } from '@shared/common/constants';
import { getManager } from 'typeorm';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
  ) {
    super({
      repository: userRepository,
      deleteMode: DELETE_MODE.Hard,
    });
  }

  public async fetchAllUser(payload): Promise<any> {
    const { authority = '' } = payload;
    const condition = {};
    const searchOptions = {
      relations: ['employee'],
      where: condition,
    };
    if (authority) {
      condition['authority'] = authority;
    }

    const users: any = await this.userRepository.find(searchOptions);
    users.length &&
      (await Promise.all(
        users.map(async (user) => {
          const authority = await this.categoryRepository.findOne({ genre_id: GENRE.AUTHORITY, id: user.authority });
          return (user.authorityTitle = authority.name);
        }),
      ));
    return users;
  }

  async searchUsers(params: any): Promise<any> {
    !params['name'] && (params['name'] = '');
    let conditionEnFull =
      "CONCAT(sellers.first_name, ' ', sellers.last_name) LIKE :fullName";
    const conditionWhere: any = {
      fullName: `%${params['name']}%`,
    };
    if (params['authority']) {
      conditionEnFull += ' AND users.authority = :authority';
      conditionWhere.authority = params['authority'];
    }
    const [users, total]: any = await this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.seller', 'sellers')
      .where(conditionEnFull, conditionWhere)
      .limit(PAGINATION.PerPage)
      .offset((params['page'] - 1) * PAGINATION.PerPage)
      .getManyAndCount();

    users.length &&
      (await Promise.all(
        users.map(async (user) => {
          const authority = await this.categoryRepository.findOne({ genre_id: GENRE.AUTHORITY, id: user.authority });
          return (user.authorityTitle = authority.name);
        }),
      ));

    return { users, total };
  }

  public async findByEmail(email: string): Promise<any> {
    const user = await this.findOne({
      relations: ['employee'],
      where: { employee: { email } },
    });
    if (!user) {
      throw new NotFoundException();
    }
  }

  public async findById(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      relations: ['employee'],
      where: { id },
    });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  private async findByEmployeeId(employeeId: number): Promise<any> {
    return await this.findOne({
      relations: ['employee'],
      where: { employee_id: employeeId },
    });
  }

  public async getUserRoles(): Promise<any> {
    return await this.categoryRepository.find({ genre_id: GENRE.AUTHORITY });
  }

  public async register(payload: createUserData): Promise<any> {
    const checkExistUser = await this.findByEmployeeId(payload.seller_id);
    if (!payload.id && checkExistUser) {
      return {
        error: true,
        data: {},
        message: 'Data existed',
      };
    }

    const UserEntity: UserEntity = this.userRepository.create();
    const { seller_id, user_password, authority } = payload;
    seller_id && (UserEntity.seller_id = seller_id);
    user_password && (UserEntity.user_password = user_password);
    authority && (UserEntity.authority = authority);
    if (payload.id) {
      await this.userRepository.update(payload.id, UserEntity);
    } else {
      await this.userRepository.save(UserEntity);
    }

    return {
      error: false,
      data: UserEntity,
      message: 'Success',
    };
  }

  async deleteUser(id: number): Promise<any> {
    await this.userRepository.delete(id);

    // Delete all sessions
    try {
      const entityManager = getManager();
      await entityManager.query(`
        DELETE FROM sessions WHERE JSON_EXTRACT(data, "$.passport.user.id") = ${Number(id)};
      `);
    } catch (error) {
      console.log(`Cannot kill all sessions of user id: ${id}`);
      console.log(error);
    }
  }
}
