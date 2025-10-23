import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingDto } from 'src/dto/paging.dto';
import { CategorySupplierDto } from 'src/dto/supplier/supplier.dto';
import { JwtPayload } from 'src/interface/supplier/login-interface';
import { CategorySupplierRepository } from 'src/repos/supplier-repos/category-supplier.repository';
import { SupplierCategoryRepository } from 'src/repos/supplier-repos/supplier-category.repository';

@Injectable()
export class CategorySupplierService {
  constructor(
    @InjectRepository(SupplierCategoryRepository)
    private supplierCategoryRepository: SupplierCategoryRepository,
    @InjectRepository(CategorySupplierRepository)
    private categorySupplierRepo: CategorySupplierRepository,
  ) {}

  async createatSuppliersCategory(user: JwtPayload, dto: CategorySupplierDto) {
    console.log('dto', dto);

    let category = this.supplierCategoryRepository.create(dto);
    let data = await category.save();
    // console.log('data', data);
    return data;
  }
  async getAllCategories() {
    return await this.supplierCategoryRepository.find();
  }
  /**
   *
   * @param query
   * @returns
   */
  async geCategories(query: Pick<PagingDto, 'keyword'>) {
    const searchKey: string = query.keyword || '';
    let data = this.supplierCategoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.selectedSuppliers', 'selectedSup')
      .leftJoinAndSelect('selectedSup.supplier', 'supplier')
      .where('(category.categoryName ilike :q)', { q: `%${searchKey}%` })
      .andWhere('category.status=:status', { status: 'Active' })

      .select([
        'category.categoryName',
        'category.id',
        'selectedSup',
        'selectedSup.supplierCategoryId',
        'supplier.companyName',
        'supplier.id',
        'supplier.accountPicEmail',
        'supplier.windowPersonPhoneNumber',
        'supplier.windowPersonName',
        'supplier.windowPersonPhoneNumber',
        'supplier.accountPicEmail',
      ])
      .orderBy('category.createdAt', 'DESC');

    return await data.getMany();
  }
  async getSupplierByCategory(categoryIdS: number[]) {
    if (categoryIdS.length != 0) {
      const q = this.categorySupplierRepo
        .createQueryBuilder('category')
        .where('category."supplierCategoryId" IN(:...q)', { q: categoryIdS })
        .leftJoinAndSelect('category.supplier', 'supplier')
        .select([
          'category.supplierCategoryId',
          'category.supplier',
          'supplier.companyName',
          'supplier.id',
          'supplier.windowPersonPhoneNumber',
          'supplier.windowPersonName',
          'supplier.accountPicEmail',
        ]);

      const data = await q.getMany();
      let resultArray = Array();
      if (data) {
        for await (const supplier of data) {
          resultArray.push(supplier.supplier);
        }
      }
      return resultArray;
    } else {
      return [];
    }
  }
}
