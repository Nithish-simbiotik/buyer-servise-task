import { DepartmentEntity } from "src/entities/comon/department.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(DepartmentEntity)
export class DepartmentRepository extends Repository<DepartmentEntity> {
  constructor() {
    super();
  }
}