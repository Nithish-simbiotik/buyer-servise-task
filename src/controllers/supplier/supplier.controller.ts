import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseIntPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';

import {
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GetSupplierModuleAccessService } from 'src/services/supplier/get-supplier-module-access/get-supplier-module-access-rights.service';
import { GetSingleSupplierModuleAccessRight } from 'src/services/supplier/get-single-supplier-module-access-rights/get-single-supplier-module-access-rights.service';
import { CreateSupplierModuleAccessService } from 'src/services/supplier/create-supplier-module-access/create-supplier-module-access-rights.service';
import { UpdateSupplierModuleAccessService } from 'src/services/supplier/update-supplier-module-acces-rights/update-supplier-module-access-rights.service';
import { ExportSupplierModuleAccessRightsService } from 'src/services/supplier/export-supplier-module-access-rights/export-supplier-module-access-rights.service';
import { UpdateSupplierService } from 'src/services/supplier/update-supplier/update-supplier.service';
import { UploadSupplierService } from 'src/services/supplier/upload-supplier/upload-supplier.service';
import { GetSingleSupplierService } from 'src/services/supplier/get-single-supplier/get-single-supplier.service';
import { GetSupplierListService } from 'src/services/supplier/get-supplier-list/get-supplier-list.service';
import { ExportSupplierService } from 'src/services/supplier/export-supplier/export-supplier.service';
import { ExportSupplierTemplateService } from 'src/services/supplier/export-supplier-template/export-supplier-template.service';
import { CreateSupplierRoleService } from 'src/services/supplier/create-supplier-role/create-supplier-role.service';
import { GetSupplierRoleListService } from 'src/services/supplier/get-supplier-role-list/get-supplier-role-list.service';
import { GetSingleSupplierRoleService } from 'src/services/supplier/get-single-supplier-role/get-single-supplier-role.service';
import { ExportSupplierRoleService } from 'src/services/supplier/export-supplier-role/export-supplier-role.service';
import { UpdateSupplierRoleService } from 'src/services/supplier/update-supplier-role/update-supplier-role.service';
import { GetIndustryCategoryListService } from 'src/services/supplier/get-industry-category-list/get-industry-category-list.service';
import { GetSingleIndustryCategoryService } from 'src/services/supplier/get-single-industry-category/get-single-industry-category.service';
import { GetSupplierTagsListService } from 'src/services/supplier/get-supplier-tags-list/get-supplier-tags-list.service';
import { GetSingleSupplierTagService } from 'src/services/supplier/get-single-supplier-tag/get-single-supplier-tag.service';
import { CategorySupplierService } from 'src/services/supplier/create-suppliers-category/create-suppliers-category.service';
import { GetSupplierCategoryService } from 'src/services/supplier/get-supplier-category/get-supplier-category.service';
import { UpdateCategorySupplierService } from 'src/services/supplier/update-suppliers-category/update-suppliers-category.service';
import { SupplierModuleAccessEntity } from 'src/entities/supplier/supplier-module-acces.entity';
import { SupplierModuleAccessRightsDto } from 'src/dto/supplier/supplier-module-access-rights.dto';
import { ExportDto } from 'src/dto/export.dto';
import {
  CategorySupplierDto,
  SupplierCatUpdateDto,
  SupplierDto,
} from 'src/dto/supplier/supplier.dto';
import { SupplierEntity } from 'src/entities/supplier/supplier.entity';
import { SupplierRoleDto } from 'src/dto/supplier/supplier-role.dto';
import { SupplierRoleEntity } from 'src/entities/supplier/supplier-role.entity';
import {
  SuppierPagingDto,
  SupplierIds,
} from 'src/dto/supplier/suppier-paging.dto';
import { User } from 'src/decorators/auth/auth-user.decorator';
import { ManageSupplierService } from 'src/services/rfx/manage-rfx-form/manage-supplier/manage-supplier.service';
import { SupplierStatus } from 'src/enum/rfx/rfx-form-status.enum';
import { GetRfxFormService } from 'src/services/rfx/manage-rfx-form/get-rfx-form/get-rfx-form.service';
import { RfxSupplierInvitationDto } from 'src/dto/rfx-form/rfx-from-supplier-invitation-status.dto';
import { LoginService } from 'src/services/supplier/login/supplier-login-service';
import { SupplierLoginDto } from 'src/dto/supplier/supplier-login.dto';
import { JwtPayload } from 'src/interface/supplier/login-interface';

@ApiTags('supplier')
@Controller('supplier')
export class SupplierController {
  constructor(
    //Supplier ModuleAccess Services
    private getModuleAccessService: GetSupplierModuleAccessService,
    private getSingleSupplierModuleAccessRight: GetSingleSupplierModuleAccessRight,
    private createModuleAccessService: CreateSupplierModuleAccessService,
    private updateModuleAccessService: UpdateSupplierModuleAccessService,
    private exportSupplierModuleAccessRights: ExportSupplierModuleAccessRightsService,

    //Supplier Services
    private updateSupplierService: UpdateSupplierService,
    private uploadSupplierService: UploadSupplierService,
    private getSingleSupplierService: GetSingleSupplierService,
    private getSupplierServices: GetSupplierListService,
    private exportSupplierService: ExportSupplierService,
    private exportSupplierTemplateService: ExportSupplierTemplateService,

    //Supplier Role Service
    private createSupplierRoleService: CreateSupplierRoleService,
    private getSupplierRoleListService: GetSupplierRoleListService,
    private getSingleSupplierRoleService: GetSingleSupplierRoleService,
    private exportSupplierRoleService: ExportSupplierRoleService,
    private updateSupplierRoleService: UpdateSupplierRoleService,

    //Industry Category Service
    private getIndustryCategory: GetIndustryCategoryListService,
    private getSingleIndustryService: GetSingleIndustryCategoryService,

    //Supplier Tags Service
    private getSupplierTags: GetSupplierTagsListService,
    private getSingleSupplierTagService: GetSingleSupplierTagService,

    //create supplier category service
    private categorySupplierService: CategorySupplierService,
    private getSupplierCategoryService: GetSupplierCategoryService,
    private updateupplierCategoryService: UpdateCategorySupplierService,
    // RFX supplier
    private manageSupplierService: ManageSupplierService,
    private readonly querService: GetRfxFormService,
    private loginService: LoginService,
  ) { }
  //Supplier Login
  @ApiOperation({ summary: ' API for supplier login' })
  @Post('/login')
  public async userLogin(@Body() loginDto: SupplierLoginDto) {
    console.log('Login', loginDto);

    return this.loginService.loginSupplier(loginDto);
  }

  // Supplier Module Access APIs start
  @Get('/get-module-access-rights')
  public async getModuleAccessRights(
    @Res() res: Response,
    @Query() pagingDto: SuppierPagingDto,
  ) {
    return await this.getModuleAccessService.getModuleAccess(res, pagingDto);
  }

  @Get('/get-single-module-access-rights/:supplier_module_access_id')
  public async getSingleModuleAccessRight(
    @Param('supplier_module_access_id') supplier_module_access_id: number,
  ): Promise<SupplierModuleAccessEntity> {
    return await this.getSingleSupplierModuleAccessRight.getSingleUserModuleAccessRights(
      supplier_module_access_id,
    );
  }

  @Post('/create-module-access-rights')
  public async createModuleAccessRights(
    @Body() supplierModuleAccessRightsDto: SupplierModuleAccessRightsDto,
  ): Promise<SupplierModuleAccessEntity> {
    return await this.createModuleAccessService.create(
      supplierModuleAccessRightsDto,
    );
  }
  @Put('/update-module-access-rights/:supplier_module_access_id')
  public async updateModuleAccessRights(
    @Param('supplier_module_access_id') supplier_module_access_id: number,
    @Body() supplierModuleAccessRightsDto: SupplierModuleAccessRightsDto,
  ): Promise<SupplierModuleAccessEntity> {
    return await this.updateModuleAccessService.update(
      supplier_module_access_id,
      supplierModuleAccessRightsDto,
    );
  }

  @Post('/export-supplier-module-access-rights')
  async downloadSupplierModuleAccessRightsList(
    @Res() res: Response,
    @Query() exportDto: ExportDto,
  ) {
    return await this.exportSupplierModuleAccessRights.exportSupplierModuleAccessRightsService(
      res,
      exportDto,
    );
  }
  // Supplier Module Access APIs end

  // Supplier APIs start
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/upload-supplier')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        let i = file.originalname.lastIndexOf('.');
        let fileExt = i < 0 ? '' : file.originalname.substr(i);
        file.filename = uuidv4() + fileExt;
        file.originalname = file.filename;
        if (file) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
    }),
  )
  async upload(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.uploadSupplierService.upload(res, file);
  }

  @Put('/update-supplier/:supplier_id')
  public async updateUser(
    @Param('supplier_id') supplier_id: number,
    @Body() supplierDto: SupplierDto,
  ): Promise<SupplierEntity> {
    return await this.updateSupplierService.update(supplier_id, supplierDto);
  }

  @Get('/single-supplier/:supplier_id')
  public async getSingleSupplier(
    @Param('supplier_id') supplier_id: number,
  ): Promise<SupplierEntity> {
    return await this.getSingleSupplierService.getSingleSupplier(supplier_id);
  }

  @Get('/supplier-list')
  public async getSupplierList(
    @Res() res: Response,
    @Query() pagingDto: SuppierPagingDto,
  ) {
    return await this.getSupplierServices.getAllSupplierList(res, pagingDto);
  }

  @Post('/export-suppliers')
  async downloadSupplierList(
    @Res() res: Response,
    @Query() exportDto: ExportDto,
  ) {
    return await this.exportSupplierService.exportSupplier(res, exportDto);
  }
  @Post('/export-supplier-template')
  async downloadSupplierTemplate(@Res() res: Response) {
    return await this.exportSupplierTemplateService.exportSupplierTemplate(res);
  }
  // Supplier APIs end

  // Supplier Role APIs start
  @Post('/create-supplier-role')
  public async createSupplierRole(
    @Body() supplierRoleDto: SupplierRoleDto,
  ): Promise<SupplierRoleEntity> {
    return await this.createSupplierRoleService.createSupplierRole(
      supplierRoleDto,
    );
  }

  @Get('/supplier-role-list')
  public async getSupplierRoleList(
    @Res() res: Response,
    @Query() pagingDto: SuppierPagingDto,
  ) {
    return await this.getSupplierRoleListService.getAllSupplierRoles(
      res,
      pagingDto,
    );
  }
  @Get('/single-supplier-role/:supplier_role_id')
  public async getSingleSupplierRole(
    @Param('supplier_role_id') supplier_role_id: number,
  ): Promise<SupplierRoleEntity> {
    return await this.getSingleSupplierRoleService.getSingleSupplierRole(
      supplier_role_id,
    );
  }

  @Post('/export-supplier-roles')
  async downloadSupplierRoleList(
    @Res() res: Response,
    @Query() exportDto: ExportDto,
  ) {
    return await this.exportSupplierRoleService.exportSupplierRole(
      res,
      exportDto,
    );
  }

  @Put('/update-supplier-role/:supplier_role_id')
  public async updateSupplierRole(
    @Param('supplier_role_id') supplier_role_id: number,
    @Body() supplierRoleDto: SupplierRoleDto,
  ): Promise<SupplierRoleEntity> {
    return await this.updateSupplierRoleService.update(
      supplier_role_id,
      supplierRoleDto,
    );
  }
  // Supplier Role APIs end

  //Industry Category API start
  @Get('/industry-category-list')
  public async getIndustryCategoryList() {
    return await this.getIndustryCategory.getIndustryCategoryList();
  }

  @Get('/single-industry-category/:industry_category_id')
  public async getSingleIndustryCategory(
    @Param('industry_category_id') industry_category_id: number,
  ) {
    return await this.getSingleIndustryService.getSingleIndustryCategory(
      industry_category_id,
    );
  }

  //Industry Category API end

  //Supplier Tags API start
  @Get('/supplier-tags-list')
  public async getSupplierTagsList() {
    return await this.getSupplierTags.getSupplierTagsList();
  }
  @Get('/single-supplier-category/:supplier_tag_id')
  public async getSingleSupplierTag(
    @Param('supplier_tag_id') supplier_tag_id: number,
  ) {
    return await this.getSingleSupplierTagService.getSingleSupplierTag(
      supplier_tag_id,
    );
  }

  @ApiOperation({ summary: 'Api for creation of category suppliers' })
  @Post('create-category-supplier')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async addCategorySupplier(
    @Body() dto: CategorySupplierDto,
    @User() user: JwtPayload,
  ) {
    return await this.categorySupplierService.createatSuppliersCategory(
      user,
      dto,
    );
  }

  @ApiOperation({
    summary: ' API for to get all the list of category suppliers',
  })
  @Get('supplier-category-list')
  //@ApiBearerAuth()
  //@UseGuards(AuthGuard('jwt'))
  async getCategorySupplierList(
    @Query() pagingDto: SuppierPagingDto,
    @Res() res: Response,
  ) {
    return this.getSupplierCategoryService.listSuppliersCategory(
      res,
      pagingDto,
    );
  }

  @ApiOperation({
    summary: ' API for to get a  category suppliers by id',
  })
  @Get('category-supplier-list/:id')
  async getCategorySuppliersById(@Param('id', ParseIntPipe) id: number) {
    return await this.getSupplierCategoryService.getSupplierCategoryById(id);
  }
  // @Get("getSuppliers")
  // async getSupplierForDropdown() {
  //   return await this.categorySupplierService.getAllCategories();
  // }
  @ApiOperation({
    summary: ' API for category drop down',
  })
  @Get('suppliersCategoryDrop')
  async getSupplierForDropdown(
    @Query() pagingDto: Pick<SuppierPagingDto, 'keyword'>,
  ) {
    return await this.categorySupplierService.geCategories(pagingDto);
  }

  @ApiOperation({ summary: ' API to update the supplier category' })
  @Patch('/supplier-category/:id')
  //@ApiBearerAuth()
  @ApiBody({ type: SupplierCatUpdateDto })
  // @UseGuards(AuthGuard('jwt'))
  async updateSupplierCat(
    @Res() res: Response,
    @Param() param: { id: number },
    //@User() user: JwtPayload,
    @Body() supplier: SupplierCatUpdateDto,
  ) {
    return await this.updateupplierCategoryService.updateSupplierCat(
      res,
      param.id,
      supplier,
    );
  }
  @Get('suppliersDrop')
  async getSupplierListForDropdown(
    @Query() pagingDto: Pick<SuppierPagingDto, 'keyword'>,
  ) {
    return await this.getSupplierServices.getSupplierListDrop(pagingDto);
  }
  @Post('supplierslist')
  async getSupplierListByCategory(
    // @Query('categoryId',ParseIntPipe) categoryId:number
    @Body() dto: SupplierIds,
  ) {
    return await this.categorySupplierService.getSupplierByCategory(
      dto.categoryIds,
    );
  }
  @ApiOperation({ summary: 'Api for supplier invitation details' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('invitation/:rfxId')
  async getRfxInvitation(
    @Param('rfxId', ParseIntPipe) rfxId: number,
    @User() user: JwtPayload,
  ) {
    const data = await this.querService.getRfxInvitaionDetails(
      rfxId,
      user.userId,
    );
    // const data = await this.querService.getRfxInvitaionDetails(33, 180);
    if (data) {
      await this.manageSupplierService.updateSupplierStatus(
        data.supplier.id,
        user.userId,
        { status: SupplierStatus.PREVIEWED,isPreviewed:true },
      );
      return data;
    }
  }
  @ApiOperation({ summary: 'Api for supplier update ivitation status ' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('invitation/action/:supplierId')
  async updateIvitationStatus(
    @Param('supplierId', ParseIntPipe) supplierId: number,
    @User() user: JwtPayload,
    @Body() dto: RfxSupplierInvitationDto,
  ) {
    console.log("dto",dto);
    console.log("user",user);
    
    return await this.manageSupplierService.updateSupplierStatus(
      supplierId,
      user.userId,
      dto,
    );
  }
  // list api
  @ApiOperation({ summary: 'Api for supplier event List' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('event-list')
  async getRfxEventListForSuppliers(
    @User() user: JwtPayload,
    @Query('status') supplierStatus:SupplierStatus
  ) {
    return await this.querService.getRfxEventList(
      user,
      supplierStatus
    );
  }
  //Supplier Tags API end
}
