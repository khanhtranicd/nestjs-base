import { AbilityFactory } from './../ability/ability.factory';
import { UserController } from './user.controller';
import { EmployeeService } from '../seller/seller.service';
import { expect, describe, beforeEach, it } from '@jest/globals';
import { I18nService } from 'nestjs-i18n';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import SellerEntity from '@modules/database/entities/seller.entity';
import UserEntity from '@modules/database/entities/user.entity';
describe('UserController', () => {
  let userController: UserController;
  let i18n: I18nService;
  let userService: UserService;
  let employeeService: EmployeeService;
  let abilityFactory: AbilityFactory;
  let employeeRepository: Repository<SellerEntity>;
  let userRepository: Repository<UserEntity>;
  beforeEach(async () => {
    employeeService = new EmployeeService(employeeRepository, userRepository);
    userController = new UserController(i18n, userService, employeeService, abilityFactory);
  });
  describe('registration', () => {
    it('should check exist registration ', async () => {
      expect(userController.registration).toBeDefined();
    });
  });
  describe('findAll', () => {
    it('should check exist findAll ', async () => {
      expect(employeeService.findAll).toBeDefined();
    });
  });
});
