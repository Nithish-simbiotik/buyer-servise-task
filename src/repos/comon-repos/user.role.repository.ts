import { UserRoleEntity } from "src/entities/comon/user-role.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UserRoleEntity)
export class UserRoleRepository extends Repository<UserRoleEntity> {
  constructor() {
    super();
  }
}