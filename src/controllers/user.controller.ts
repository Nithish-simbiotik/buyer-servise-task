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
import { ApiParam, ApiTags } from '@nestjs/swagger';
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
import { GetAllUsers } from 'src/services/user/getAllUser.service';
import { GetAllUsersByDepartmentId } from 'src/services/user/getAllUserByDepartmentId.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private getAllUserService: GetAllUsers,
    private getAllUserByDepartmentService: GetAllUsersByDepartmentId,
    private UserRolesService: UserRolesService,
  ) {}

  @Get('/allUserList')
  async getUserList() {
    return await this.getAllUserService.getAllUsers();
  }

  @ApiParam({
    name: 'id',
    description: 'Gets the Action id',
  })
  @Get('/allUserListByDepartment/:id')
  async getUserListByDepartment(@Param() param: { id: number }) {
    console.log('Param : ', param.id);
    return await this.getAllUserByDepartmentService.getAllUsersByDepartmentId(
      param.id,
    );
  }

  @ApiParam({
    name: 'id',
    description: 'Gets the Action id',
  })
  @Get('user-role-by-department/:id')
  async getUserRoleByDepartment(@Param() param: { id: number }) {
    console.log('Param : ', param.id);
    return await this.UserRolesService.getUserRoleByDepartmentId(param.id);
  }
}
