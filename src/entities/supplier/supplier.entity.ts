import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IndustryCategoryEntity } from "./industry-category.entity";
import { SupplierPurchasingOrgEntity } from "./supplier-purchase-org.entity";
import { SupplierRoleEntity } from "./supplier-role.entity";
import { SupplierTagsEntity } from "./supplier-tag.entity";

@Entity({ name: "SUPPLIER" })
export class SupplierEntity extends BaseEntity {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn()

  id: number;

  @Column({ type: "varchar", readonly: true, nullable: true })
  companyName: string;

  @Column({ type: "varchar", nullable: false, readonly: true })
  registrationNumber: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  companyType: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  vendorCode: string;

  @Column({ type: "date", readonly: true, nullable: true })
  yearOfEstablishment: Date;

  @Column({ type: "varchar", readonly: true, nullable: true })
  taxRegistrationNumber: string;

  @Column({ type: "varchar", nullable: true, readonly: true })
  addressLine1: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  addressLine2: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  addressLine3: string;

  @Column({ type: "varchar", nullable: false, readonly: true })
  postcode: string;

  @Column({ type: "varchar", nullable: false, readonly: true })
  city: string;

  @Column({ type: "varchar", nullable: false, readonly: true })
  state: string;

  @Column({ type: "varchar", nullable: false, readonly: true })
  country: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  faxNumber: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  website: string;

  @Column({ type: "varchar", nullable: true, readonly: true })
  userName: string;

  @Column({ type: "varchar", nullable: true })
  communicationEmailAddress: string;

  @Column({ type: "varchar", nullable: true })
  windowPersonName: string;

  @Column({ type: "varchar", nullable: true })
  windowPersonPhoneNumber: string;

  @Column({ type: "varchar", nullable: true })
  accountPicEmail: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  documents: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  bankName: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  bankAccountName: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  bankAccountNumber: string;

  @Column({ type: "varchar", readonly: true, nullable: true })
  paymentTerm: string;

  @OneToMany(() => IndustryCategoryEntity, (ic) => ic.supplier)
  @JoinColumn({ name: "industry_category_id" })
  industryCategory: IndustryCategoryEntity[];
  addIndustry(industry: IndustryCategoryEntity) {
    if (this.industryCategory == null) {
      this.industryCategory = Array<IndustryCategoryEntity>();
    }
    this.industryCategory.push(industry);
  }

  @Column({ type: "integer", array: true, nullable: true })
  industryCategoryId: number[];

  @Column({ type: "simple-array", nullable: true })
  selectedSupplierCategory: string[];

  @OneToMany(() => SupplierTagsEntity, (st) => st.supplier)
  @JoinColumn({ name: "supplier_tag_id" })
  supplierTags: SupplierTagsEntity[];
  addSupplierTags(tags: SupplierTagsEntity) {
    if (this.supplierTags == null) {
      this.supplierTags = Array<SupplierTagsEntity>();
    }
    this.supplierTags.push(tags);
  }

  @Column({ type: "integer", array: true, nullable: true })
  supplierTagId: number[];

  @Column({ type: "simple-array", nullable: true })
  selectedSupplierTags: string[];

  @Column({ type: "varchar", nullable: true })
  supplierCertification: string;

  @Column({ type: "varchar", nullable: true })
  bumiputraStatus: string;

  @Column({ type: "varchar", nullable: true })
  paidUpCapital: string;

  @Column({ type: "varchar", nullable: true })
  shareholderName: string;

  @Column({ type: "varchar", nullable: true })
  directorsName: string;

  @Column({ type: "varchar", nullable: true })
  companyLetterhead: string;

  @Column({ type: "varchar", default: "Active" })
  status: string;

  @ManyToOne(() => SupplierRoleEntity)
  @JoinColumn()
  role: SupplierEntity;

  @Column({ type: "varchar", nullable: true })
  supplierEvaluationStatus: string;

  @OneToMany(() => SupplierPurchasingOrgEntity, (se) => se.supplier, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    onUpdate: 'CASCADE',
  })
  purchaserOrg: SupplierPurchasingOrgEntity[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;
}
