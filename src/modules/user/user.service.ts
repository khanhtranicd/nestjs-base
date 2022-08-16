import UserEntity from '@modules/database/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@shared/base/base.service';
import { Repository } from 'typeorm';
import { createUserData } from './user.type';
import { DELETE_MODE } from '@shared/common/constants';
import { getManager } from 'typeorm';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    super({
      repository: userRepository,
      deleteMode: DELETE_MODE.Hard,
    });
  }

  public async fetchAllUser(payload = {}): Promise<any> {
    const condition = {};
    const searchOptions = {
      where: condition,
    };

    const users: any = await this.userRepository.find(searchOptions);
    console.log('users', users);
    return users;
  }

  public async findByEmail(email: string): Promise<any> {
    const user = await this.findOne({ email });
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

  public async register(payload: createUserData): Promise<any> {
    const checkExisting = await this.findOne({ email: payload.email });
    if (checkExisting) {
      return {
        error: true,
        data: {},
        message: 'Data existed',
      };
    }

    const UserEntity: UserEntity = this.userRepository.create(payload);
    await this.userRepository.save(UserEntity);

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
