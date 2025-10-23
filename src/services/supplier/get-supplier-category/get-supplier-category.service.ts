import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { SuppierPagingDto } from 'src/dto/supplier/suppier-paging.dto';
import { SupplierCategoryStatusEnum } from 'src/enum/supplier/supplierCategoryStatus.enum';
import { SupplierCategoryRepository } from 'src/repos/supplier-repos/supplier-category.repository';

@Injectable()
export class GetSupplierCategoryService {
  constructor(
    @InjectRepository(SupplierCategoryRepository)
    private supplierCategoryRepository: SupplierCategoryRepository,
  ) {}

  async listSuppliersCategory(res: Response, pagingDto: SuppierPagingDto) {
    const keyword: string = pagingDto.keyword || '';
    const qb = this.supplierCategoryRepository
      .createQueryBuilder('supplier_category_entity')
      .leftJoinAndSelect('supplier_category_entity.createdBy', 'creator')
      .leftJoinAndSelect('supplier_category_entity.updatedBy', 'updator')
      .orderBy('supplier_category_entity.createdAt', 'DESC');
    qb.where('supplier_category_entity.categoryName ILIKE :q', {
      q: `%${keyword}%`,
    })
      .orWhere('creator.name ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('updator.name ILIKE :q', {
        q: `%${keyword}%`,
      })
      // .orWhere('supplier_category_entity.createdBy ILIKE :q', {
      //   q: `%${keyword}%`,
      // })
      // .orWhere('supplier_category_entity.modifiedBy ILIKE :q', {
      //   q: `%${keyword}%`,
      // })
      .orWhere('supplier_category_entity.status ILIKE :q', {
        q: `%${keyword}%`,
      });

    let data = qb.getMany();
    const page: number = pagingDto.page || 1;
    const limit: number = pagingDto.size || 10;
    const status = pagingDto.status;
    const total = await qb.getCount();
    qb.offset((page - 1) * limit).limit(limit);
    if (
      status === SupplierCategoryStatusEnum.ALL ||
      status === SupplierCategoryStatusEnum.NIL
    ) {
      return res.send({
        data: await qb.getMany(),
        total,
        page,
      });
    }

    if (status === SupplierCategoryStatusEnum.ACTIVE) {
      qb.where('supplier_category_entity.status LIKE :q', {
        q: `%${status}%`,
      });
      return res.send({
        data: await qb.getMany(),
        total,
        page,
      });
    }
    if (status === SupplierCategoryStatusEnum.INACTIVE) {
      qb.where('supplier_category_entity.status ILIKE :q', {
        q: `%${status}%`,
      });
      return res.send({
        data: await qb.getMany(),
        total,
        page,
      });
    }
  }

  async getSupplierCategoryById(id: number) {
    let data = await this.supplierCategoryRepository.findOne(id);
    if (data) {
      return data;
    } else {
      throw new NotFoundException(`Can't find category suppliers`);
    }
  }
}
