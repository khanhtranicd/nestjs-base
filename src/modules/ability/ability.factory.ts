import UserEntity from '@modules/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InferSubjects, Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability';
import { AUTHORITY } from '@shared/common/constants';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof UserEntity> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: UserEntity) {
    const { can, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
    if (
      user.authority === AUTHORITY.Administrator ||
      user.authority === AUTHORITY.Manager ||
      user.authority === AUTHORITY.GA
    ) {
      can(Action.Manage, 'all');
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
