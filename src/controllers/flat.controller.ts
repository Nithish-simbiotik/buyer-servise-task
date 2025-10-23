import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { CreateRFSTemplateDto } from 'src/dto/rfsTemplate/create-rfsTemplate.dto';
import { CreateRFSTemplateService } from 'src/services/rfsTemplate/createRfsTemplate.service';
import { DeleteRFSTemplateService } from 'src/services/rfsTemplate/deleteRfsTemplate.service';
import { GetRFSTemplateService } from 'src/services/rfsTemplate/getRfsTemplate.service';
import { UpdateRFSTemplateService } from 'src/services/rfsTemplate/updateRfsTemplate.service';
import { GetFlatCostService } from 'src/services/flat/getFlatCost.service';
import { AppService } from '../app.service';
import { PagingDto } from '../dto/paging.dto';
import { RFSService } from '../services/rfs/rfs.service';
import { GetFlatCurrencyService } from 'src/services/flat/getFlatCurrency.service';
import { GetFlatDepartmentService } from 'src/services/flat/getDepartment.service';
import { GetFlatPurchaseOrgService } from 'src/services/flat/getFlatPurchaseOrg.service';
// import { FlatRepository } from 'src/repos/flats/costCenter.repository';
import { InjectConnection } from '@nestjs/typeorm';
import { AddressService } from 'src/services/flat/address.service';
import { BusinessAreaService } from 'src/services/flat/businessArea.service';
import { GlCodeService } from 'src/services/flat/glCode.service';
import { IndustryCategoryService } from 'src/services/flat/industryCategory.service';
import { InternalOrderService } from 'src/services/flat/internalOrder.service';
import { PaymentTermService } from 'src/services/flat/paymentTerms.service';
import { PlantService } from 'src/services/flat/plant.service';
import { ProfitCenterService } from 'src/services/flat/profitCenter.service';
import { SAPClassService } from 'src/services/flat/sapClass.service';
import { SAPModelService } from 'src/services/flat/sapModel.service';
import { SAPSeriesService } from 'src/services/flat/sapSeries.service';
import { SupplierTagService } from 'src/services/flat/supplierTag.service';
import { UOMService } from 'src/services/flat/uom.service';
import { UserRolesService } from 'src/services/flat/userRoles.service';
import { WarrantyService } from 'src/services/flat/warranty.service';
import { CompanyService } from 'src/services/flat/company.service';
import { AccountAssignmentService } from 'src/services/flat/getAccoutnAssignment.service';
import { PreviousPurchaseService } from 'src/services/flat/previousPurchase.service';
import { SupplierService } from 'src/services/flat/supplier.service';
import { PartNumberService } from 'src/services/flat/partNumber.service';
import { MailService } from 'src/services/mail/mailservice.service';
import { DecimalService } from 'src/services/flat/getFlatDecimal.service';
import { EventTypeService } from 'src/services/flat/getEventType.service';
import { GetDepartmentService } from 'src/services/user/getDepartment.service';

@ApiTags('flat')
@Controller('flat')
export class FlatController {
  constructor(
    private readonly getCostService: GetFlatCostService,
    private readonly getCurrencyService: GetFlatCurrencyService,
    private readonly getDepartmentService: GetFlatDepartmentService,
    private readonly getPurchaseOrgService: GetFlatPurchaseOrgService,
    private readonly getAddressService: AddressService,
    private readonly getBusinessAreaService: BusinessAreaService,
    private readonly getCompanyService: CompanyService,
    private readonly getAccountAssignmentService: AccountAssignmentService,
    private readonly getGlCodeService: GlCodeService,
    private readonly getIndustryCategoryService: IndustryCategoryService,
    private readonly getInternalOrderService: InternalOrderService,
    private readonly getPaymentTermService: PaymentTermService,
    private readonly getPlantService: PlantService,
    private readonly getProfitCenterService: ProfitCenterService,
    private readonly getSAPClassService: SAPClassService,
    private readonly getSAPModelService: SAPModelService,
    private readonly getSAPSeriesService: SAPSeriesService,
    private readonly getSupplierTagService: SupplierTagService,
    private readonly getUOMService: UOMService,
    private readonly getUserRolesService: UserRolesService,
    private readonly getWarrantyService: WarrantyService,
    private readonly getPreviousPurchaseService: PreviousPurchaseService,
    private readonly getSupplierService: SupplierService,
    private readonly getPartNumberService: PartNumberService,
    private readonly getDecimalService: DecimalService,
    private readonly getEventTypeService: EventTypeService,
    private sendMailService: MailService,
    private getDepartment: GetDepartmentService,
  ) {}

  @Get('/cost-center-list')
  async getFlatCostList() {
    return this.getCostService.getFlatCostList();
  }

  @ApiQuery({
    name: 'companycode',
    required: false,
  })
  @Get('/cost-center-list-by-purchaseQrg')
  async getFlatCostListByPurchaseOrg(
    @Query('companycode') companycode: string,
  ) {
    return this.getCostService.getFlatCostListByPurchaseOrg(companycode);
  }

  @Get('/currency-list')
  async getFlatCurrencyList() {
    return this.getCurrencyService.getFlatCostList();
  }

  // @Post('/department')
  // async saveFlatCurrencyList() {
  //   const data = {
  //     department_name:"Acc",
  //     porg_code:"12345",
  //     display_name:"Accounts",
  //     status:0
  //   }
  //   return this.getDepartmentService.savelatCostList(data);
  // }

  @Get('/department-list')
  async getFlatDepartmentList(@Query() pagingDto: PagingDto) {
    return this.getDepartmentService.getFlatCostList(pagingDto);
  }

  @Get('/purchase-org-list')
  async getFlatPurchaseOrgList(@Query() pagingDto: PagingDto) {
    return this.getPurchaseOrgService.getFlatCostList(pagingDto);
  }

  @ApiParam({
    name: 'id',
    description: 'Gets the Action id',
  })
  @Get('department/:id')
  async getRFSById(@Param() param: { id: number }) {
    return this.getDepartmentService.getDepartmentById(param.id);
  }

  @ApiParam({
    name: 'id',
    description: 'Gets the Action id',
  })
  @Get('departmentby-purchaseorg/:id')
  async getDeptByPurchaseOrg(@Param() param: { id: number }) {
    return this.getDepartmentService.getDepartmentByPurchaseOrg(param.id);
  }

  @ApiParam({
    name: 'id',
    description: 'Gets the Action id',
  })
  @Get('departmentby-email/:id')
  async getDeptByEmail(@Param() param: { id: number }) {
    return this.getDepartment.getDepartmentIdByEmail(param.id);
  }

  @Get('/address-list')
  async getAddressList(@Query() pagingDto: PagingDto) {
    return this.getAddressService.getAddressList(pagingDto);
  }

  @Get('/business-area-list')
  async getBusinessList(@Query() pagingDto: PagingDto) {
    return this.getBusinessAreaService.getBusinessList(pagingDto);
  }

  @Get('/company-list')
  async getCompanyList(@Query() pagingDto: PagingDto) {
    return this.getCompanyService.getCompanytList(pagingDto);
  }

  @Get('/account-assignment-list')
  async getAccountAssignmentList(@Query() pagingDto: PagingDto) {
    return this.getAccountAssignmentService.getAccountAssignmentList(pagingDto);
  }

  @Get('/gl-code-list')
  async getGlCodeList(@Query() pagingDto: PagingDto) {
    return this.getGlCodeService.getGlCodeList(pagingDto);
  }

  @Get('/industry-category-list')
  async getIndustryCategoryList(@Query() pagingDto: PagingDto) {
    return this.getIndustryCategoryService.getIndustryCategoryList(pagingDto);
  }

  @Get('/internalorder-list')
  async getInternalOrdertList() {
    return this.getInternalOrderService.getInternalOrdertList();
  }

  @Get('/payment-terms-list')
  async getPaymentTermList(@Query() pagingDto: PagingDto) {
    return this.getPaymentTermService.getPaymentTermList(pagingDto);
  }
  @Get('/plant-list')
  async getPlantList(@Query() pagingDto: PagingDto) {
    return this.getPlantService.getPlantList(pagingDto);
  }

  @Get('/profit-center-list')
  async getProfitCenterList(@Query() pagingDto: PagingDto) {
    return this.getProfitCenterService.getProfitCenterList(pagingDto);
  }

  @Get('/sap-class-list')
  async getSAPClassList(@Query() pagingDto: PagingDto) {
    return this.getSAPClassService.getSAPClassList(pagingDto);
  }

  @Get('/sap-model-list')
  async getSAPModelList(@Query() pagingDto: PagingDto) {
    return this.getSAPModelService.getSAPModelList(pagingDto);
  }

  @Get('/sap-series-list')
  async getSAPSeriesList(@Query() pagingDto: PagingDto) {
    return this.getSAPSeriesService.getSAPSeriesList(pagingDto);
  }

  @Get('/supplier-tag-list')
  async getSupplierTagList(@Query() pagingDto: PagingDto) {
    return this.getSupplierTagService.getSupplierTagList(pagingDto);
  }

  @Get('/uom-list')
  async getUOMList() {
    return this.getUOMService.getUOMList();
  }

  @Get('/user-roles-list')
  async getUserRolesList(@Query() pagingDto: PagingDto) {
    return this.getUserRolesService.getUserRolesList(pagingDto);
  }
  @Get('/warranty-list')
  async getWarrantyList(@Query() pagingDto: PagingDto) {
    return this.getWarrantyService.getWarrantyList(pagingDto);
  }

  @Get('/previousPurchase-list')
  async getpreviousPurchaseList(@Query() pagingDto: PagingDto) {
    return this.getPreviousPurchaseService.getpreviousPurchaseList(pagingDto);
  }

  @Get('/supplier-list')
  async getSupplierList(@Query() pagingDto: PagingDto) {
    return this.getSupplierService.getSupplierList(pagingDto);
  }

  @Get('/part-number-list')
  async getpartNumberList() {
    return this.getPartNumberService.getPartNumberList();
  }

  @Get('/send-mail')
  async sendMail() {
    return this.sendMailService.sendMailInactiveApproval(
      'sarthakahuja3637@gmail.com',
      'Approval',
      'Sarthak',
      12344,
      'html',
      'title',
      'Sarthak',
    );
  }

  @Get('/decimal-list')
  async getDecimalList() {
    return this.getDecimalService.getDecimalList();
  }

  @Get('/event-type-list')
  async getEventTypeList() {
    return this.getEventTypeService.getEventTypeList();
  }

  @ApiParam({
    name: 'id',
    description: 'Gets the Action id',
  })
  @Get('purchasing-org-list-by-department/:id')
  async getPurchasingOrgListByDepartment(@Param() param: { id: number }) {
    return this.getDepartmentService.getFlatPurchaseOrgNameByDepartmentId(
      param.id,
    );
  }
}
