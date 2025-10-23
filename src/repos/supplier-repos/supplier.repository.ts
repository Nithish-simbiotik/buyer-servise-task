import { EntityRepository, Repository, getRepository, In, Not } from 'typeorm';
import { Request, Response } from 'express';
import { SupplierEntity } from 'src/entities/supplier/supplier.entity';
import { PagingDto } from 'src/dto/paging.dto';
import { ExportDto } from 'src/dto/export.dto';
import { IndustryCategoryEntity } from 'src/entities/supplier/industry-category.entity';
import { SupplierTagsEntity } from 'src/entities/supplier/supplier-tag.entity';
import { SupplierDto } from 'src/dto/supplier/supplier.dto';
import { SuppierPagingDto } from 'src/dto/supplier/suppier-paging.dto';

@EntityRepository(SupplierEntity)
export class SupplierRepository extends Repository<SupplierEntity> {
  constructor() {
    super();
  }
  /**
   *Get Single Supplier
   */
  public async getSingleSupplier(supplier_id: number): Promise<SupplierEntity> {
    return await this.createQueryBuilder('list')
      .where('list.id = :supplier_id', { supplier_id })
      .getOne();
  }

  /**
   *Supplier Listing
   */
  public async getAllSupplierList(res: Response, pagingDto: PagingDto) {
    const qb = this.createQueryBuilder('list')
      .leftJoinAndSelect('list.role', 'supplierRoles')
      .orderBy('list.createdAt', 'DESC');
    const keyword = pagingDto.keyword || '';
    qb.where(`LOWER("companyName") ILIKE LOWER(:q)`, { q: `%${keyword}%` })
      .orWhere(`LOWER("vendorCode") ILIKE LOWER(:q)`, { q: `%${keyword}%` })
      .orWhere(`LOWER("phoneNumber") ILIKE LOWER(:q)`, { q: `%${keyword}%` })
      .orWhere(`LOWER("communicationEmailAddress") ILIKE LOWER(:q)`, {
        q: `%${keyword}%`,
      })
      .orWhere(`LOWER(list.status) LIKE LOWER(:q)`, { q: `%${keyword}%` })
      .orWhere(`LOWER("windowPersonName") LIKE LOWER(:q)`, {
        q: `%${keyword}%`,
      })
      .orWhere(`LOWER("supplierEvaluationStatus") ILIKE LOWER(:q)`, {
        q: `%${keyword}%`,
      });

    const page: number = pagingDto.page || 1;
    const limit: number = pagingDto.size || 10;
    const total = await qb.getCount();
    qb.offset((page - 1) * limit).limit(limit);
    return res.send({
      data: await qb.getMany(),
      total,
      page,
    });
  }

  /**
   *Supplier Export
   */
  public async exportSupplierList(
    exportDto: ExportDto,
  ): Promise<SupplierEntity[]> {
    let keyword = exportDto.keyword || '';
    return await this.createQueryBuilder('supplier')
      .leftJoinAndSelect('supplier.role', 'supplierRoles')
      .leftJoinAndSelect('supplier.industryCategory', 'industryCategory')
      .leftJoinAndSelect('supplier.supplierTags', 'supplierTags')
      .where(`companyName ILIKE :q`, { q: `%${keyword}%` })
      .orWhere(`vendorCode ILIKE :q`, { q: `%${keyword}%` })
      .orWhere(`phoneNumber ILIKE :q`, {
        q: `%${keyword}%`,
      })
      .orWhere(`communicationEmailAddress ILIKE :q`, {
        q: `%${keyword}%`,
      })
      .orWhere(`supplier.status LIKE :q`, { q: `%${keyword}%` })
      .orWhere(`windowPersonName ILIKE :q`, {
        q: `%${keyword}%`,
      })
      .orWhere(`supplierEvaluationStatus ILIKE :q`, {
        q: `%${keyword}%`,
      })
      .orderBy('supplier.createdAt', 'DESC')
      .getMany();
  }

  /**
   *Update Supplier
   */
  public async updateSupplier(
    supplier_id: number,
    supplierDto: SupplierDto,
  ): Promise<SupplierEntity> {
    const {
      communicationEmailAddress,
      windowPersonName,
      windowPersonPhoneNumber,
      industryCategoryId,
      supplierTagId,
    } = supplierDto;
    const updateSupplier = await this.findOne(supplier_id);
    updateSupplier.communicationEmailAddress = communicationEmailAddress;
    updateSupplier.windowPersonName = windowPersonName;
    updateSupplier.windowPersonPhoneNumber = windowPersonPhoneNumber;
    updateSupplier.industryCategoryId = industryCategoryId;
    updateSupplier.supplierTagId = supplierTagId;
    const industries = await getRepository(IndustryCategoryEntity).find({
      where: { id: In(supplierTagId) },
    });
    industries.forEach((industry) => {
      updateSupplier.addIndustry(industry);
    });
    updateSupplier.selectedSupplierCategory = industries.map(
      (industry) => industry.industryCategory,
    );
    const category_tags = await getRepository(SupplierTagsEntity).find({
      where: { id: In(supplierTagId) },
    });
    category_tags.forEach((tag) => {
      updateSupplier.addSupplierTags(tag);
    });
    updateSupplier.selectedSupplierTags = category_tags.map(
      (tag) => tag.supplierTag,
    );
    await this.save(updateSupplier);
    return updateSupplier;
  }

  /**
   *Import Supplier List
   */
  public async importSupplier(res: Response, downloaded) {
    const array = JSON.parse(downloaded);

    let supplierArr = [];
    try {
      for (let i = 1; i < array.length; i++) {
        let newSupplier = new SupplierEntity();
        newSupplier.companyName = array[i][1];
        newSupplier.registrationNumber = array[i][2];
        newSupplier.companyType = array[i][3];
        newSupplier.vendorCode = array[i][4];
        newSupplier.yearOfEstablishment = array[i][5];
        newSupplier.taxRegistrationNumber = array[i][6];
        newSupplier.addressLine1 = array[i][7];
        newSupplier.addressLine2 = array[i][8];
        newSupplier.addressLine3 = array[i][9];
        newSupplier.postcode = array[i][10];
        newSupplier.city = array[i][11];
        newSupplier.state = array[i][12];
        newSupplier.country = array[i][13];
        newSupplier.phoneNumber = array[i][14];
        newSupplier.faxNumber = array[i][15];
        if (array[i][16].text) {
          newSupplier.website = array[i][16].text;
        } else {
          newSupplier.website = array[i][16];
        }
        newSupplier.website = array[i][16];
        if (array[i][17].text) {
          newSupplier.userName = array[i][17].text;
        } else {
          newSupplier.userName = array[i][17];
        }
        newSupplier.communicationEmailAddress = array[i][18].text;
        newSupplier.windowPersonName = array[i][19];
        newSupplier.windowPersonPhoneNumber = array[i][20];
        newSupplier.accountPicEmail = array[i][21].text;
        newSupplier.bankName = array[i][22];
        newSupplier.bankAccountName = array[i][23];
        newSupplier.bankAccountNumber = array[i][24];
        newSupplier.paymentTerm = array[i][25];
        const industries = array[i][26].split(',');
        const industryData = await getRepository(IndustryCategoryEntity).find({
          where: { industry_category: In(industries) },
        });
        console.log(industryData);

        industryData.forEach((industry) => {
          newSupplier.addIndustry(industry);
        });
        newSupplier.industryCategoryId = industryData.map((data) => data.id);
        newSupplier.selectedSupplierCategory = industryData.map(
          (data) => data.industryCategory,
        );
        const supplier_tags = array[i][27].split(',');
        const category_tags = await getRepository(SupplierTagsEntity).find({
          where: { supplier_tag: In(supplier_tags) },
        });
        category_tags.forEach((tag) => {
          newSupplier.addSupplierTags(tag);
        });
        newSupplier.supplierTagId = category_tags.map((tag) => tag.id);
        newSupplier.selectedSupplierTags = category_tags.map(
          (tag) => tag.supplierTag,
        );
        newSupplier.bumiputraStatus = array[i][28];
        newSupplier.paidUpCapital = array[i][29];
        newSupplier.shareholderName = array[i][30];
        newSupplier.directorsName = array[i][31];
        supplierArr.push(newSupplier);

        if (array.length - 1 === i) {
          try {
            await this.save(supplierArr);
            res.send(supplierArr);
          } catch (error) {
            res.send(error);
          }
        }
      }
    } catch (error) {
      res.send(error);
    }
  }
  async getSupplierList(query: Pick<PagingDto, 'keyword'>) {
    const keyword: string = query.keyword || '';
    const qb = this.createQueryBuilder('sup').orderBy('sup.createdAt', 'DESC');
    qb.where('sup.companyName ILIKE :q', {
      q: `%${keyword}%`,
    });
    // qb.orWhere('sup.status', { status: 'Active' });

    qb.select([
      'sup.companyName',
      'sup.id',
      'sup.windowPersonName',
      'sup.windowPersonPhoneNumber',
      'sup.accountPicEmail',
    ]);
    let data = await qb.getMany();
    return data;
  }
}
