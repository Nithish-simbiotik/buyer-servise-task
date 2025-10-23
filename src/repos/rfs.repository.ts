import { InjectRepository } from "@nestjs/typeorm";
import { fstat } from "fs";
import { CreateRFSDto, DeliveryAddressDto } from "src/dto/rfs/create-rfs.dto";
import { PreprBillOfQuantityEntity } from "src/entities/prepr/prepr-bill-of-quantity.entity";
import { PreprCostCenterEntity } from "src/entities/prepr/prepr-cost-center.entity";
import { PreprDeliveryAddressEntity } from "src/entities/prepr/prepr-delivery-address.entitty";
import { PreprSupplierEntity } from "src/entities/prepr/prepr-supplier.entity";
import { PreprSupportingDocumentEntity } from "src/entities/prepr/prepr-supporting-documents.entity";
import { PreprWarrantyEntity } from "src/entities/prepr/prepr-warranty.entity";
import { PreprHistoryEntity } from "src/entities/prepr/prepr_history.entity";
import { PrePrLevelsEntity } from "src/entities/prepr/prepr_Level.entity";
import { PreprNotificationsEntity } from "src/entities/prepr/prepr_notifications.entity";
import { PreprPreviousPurchaseEntity } from "src/entities/prepr/prepr_previousPurchase.entity";
import { PreprTeamMemberEntity } from "src/entities/prepr/prepr_TeamMember.entity";
import { ActionType } from "src/enum/rfs/actionType.enum";
import { SubmitType } from "src/enum/rfs/submitType.enum";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { PreprEntity } from "../entities/prepr/prepr.entity";
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { GetFlatPurchaseOrgService } from "src/services/flat/getFlatPurchaseOrg.service";
import { GetAllUsers } from "src/services/user/getAllUser.service";
import { GetFlatCostService } from "src/services/flat/getFlatCost.service";
import { GetFlatCurrencyService } from "src/services/flat/getFlatCurrency.service";
import { WarrantyService } from "src/services/flat/warranty.service";
import { GetDepartmentService } from "src/services/user/getDepartment.service";
import { PreprCopyEntity } from "src/entities/prepr/prepr.entitycopy";
import { AddressService } from "src/services/flat/address.service";
@EntityRepository(PreprEntity)
export class RFSRepository extends Repository<PreprEntity> {

  constructor(
  ) {
    super();
  }

  async createRFS(user: JwtPayload, createRFSDto: CreateRFSDto, getPurchaseOrg: GetFlatPurchaseOrgService, getUserService: GetAllUsers) {
    let rfs = new PreprEntity();
    rfs.templateId = createRFSDto.templateId;
    rfs.title = createRFSDto.title;
    rfs.templateName = createRFSDto.templateName;
    rfs.expectedDeliveryLeadTime = createRFSDto.expectedDeliveryLeadTime;
    rfs.justificationOfPurchase = createRFSDto.justificationOfPurchase;
    rfs.recommandedNewSupplier = createRFSDto.recommandedNewSupplier;
    rfs.internalReferenceNumber = createRFSDto.internalReferenceNumber;
    // rfs.acceptableBrands = createRFSDto.acceptableBrands;
    rfs.estimateCost = createRFSDto.estimateCost;
    // rfs.equivalentBrandRequired = createRFSDto.equivalentBrandRequired;
    rfs.reminderAlert = createRFSDto.reminderAlert;
    rfs.reminderFrequency = createRFSDto.reminderFrequency;
    rfs.reminderInterval = createRFSDto.reminderInterval;
    rfs.notifyMe = createRFSDto.notifyMe;
    rfs.submitStatus = createRFSDto.submitStatus;
    rfs.urgent_job = createRFSDto.urgent_job;
    rfs.urgentJobOption = createRFSDto.urgentJobOption;
    rfs.created_by = createRFSDto.created_by;
    rfs.createdById =  createRFSDto.createdById;
    // rfs.departmentId= createRFSDto.departmentId;
    rfs.updated_by = createRFSDto.updated_by;
    rfs.purchasingOrg = createRFSDto.purchasingOrg;
    if (createRFSDto.purchasingOrg)
      rfs.purchasingOrgName = await getPurchaseOrg.getFlatPurchaseOrgNameById(createRFSDto.purchasingOrg)
    rfs.form_department = createRFSDto.form_department
    rfs.requestor_department = user.department
    rfs.requestor_email = user.email;
    rfs.requestor_name = user.userName;
    rfs.requestor_phone_number = createRFSDto.requestor_phone_number;
    rfs.userId = user.userId.toString();
    rfs.warranty = createRFSDto.warranty;
    rfs.costCenter = createRFSDto.costCenter;
    rfs.previousPurchase = createRFSDto.previousPurchase;
    rfs.deliveryAddress = createRFSDto.deliveryAddress;
    rfs.deliveryAddressId = createRFSDto.deliveryAddressId;
    rfs.deliveryAddressType = createRFSDto.deliveryAddressType;
    rfs.currency = createRFSDto.currency;
    rfs.sourcingSelection = createRFSDto.sourcingSelection;
    rfs.template_department = createRFSDto.template_department;
    // rfs.gpd_acceptance_date=createRFSDto.gpd_acceptance_date;
    // rfs.final_approval_date = createRFSDto.final_approval_date;

    // if (createRFSDto.deliveryAddress) {
    //   let address = new PreprDeliveryAddressEntity();
    //   address.title = createRFSDto.deliveryAddress.title;
    //   address.addressLine1 = createRFSDto.deliveryAddress.addressLine1;
    //   address.addressLine2 = createRFSDto.deliveryAddress.addressLine2;
    //   address.city = createRFSDto.deliveryAddress.city;
    //   address.state = createRFSDto.deliveryAddress.state;
    //   address.country = createRFSDto.deliveryAddress.country;
    //   address.zipCode = createRFSDto.deliveryAddress.zipCode;
    //   await getRepository(PreprDeliveryAddressEntity).save(address);
    //   rfs.deliveryAddress = address;
    // }

    // if (createRFSDto.warranty) {
    //   let warranty = new PreprWarrantyEntity();
    //   warranty.name = createRFSDto.warranty.name;
    //   await getRepository(PreprWarrantyEntity).save(warranty);  
    //   rfs.warranty = warranty;
    // }
    if (createRFSDto.recommandedSuppliers) {
      let suppliers = [];
      for await (const sup of createRFSDto.recommandedSuppliers) {
        let supplier = new PreprSupplierEntity();
        // supplier.name = sup.name;
        supplier.supplierId = sup.supplierId
        await getRepository(PreprSupplierEntity).save(supplier);
        suppliers.push(supplier);
      }
      rfs.recommandedSuppliers = suppliers;
    }
    // if (createRFSDto.costCenter) {
    //   let cc = new PreprCostCenterEntity();
    //   cc.code = createRFSDto.costCenter.code;
    //   cc.companycode = createRFSDto.costCenter.companycode;
    //   cc.description = createRFSDto.costCenter.description;
    //   await getRepository(PreprCostCenterEntity).save(cc);
    //   rfs.costCenter = cc;
    // }
    // if (createRFSDto.previousPurchase) {
    //   let pp = new PreprPreviousPurchaseEntity();
    //   pp.previousRequest = createRFSDto.previousPurchase.previousPurchase;     
    //   await getRepository(PreprPreviousPurchaseEntity).save(pp);
    //   rfs.previousPurchase = pp;
    // } 
    if (createRFSDto.teamMembers) {
      let teamMembers = [];
      for await (const tItem of createRFSDto.teamMembers) {
        let teamMember = new PreprTeamMemberEntity();
        teamMember.userId = tItem.userId;
        teamMember.viewStatus = tItem.viewStatus;
        await getRepository(PreprTeamMemberEntity).save(teamMember);
        teamMembers.push(teamMember);
      }
      rfs.teamMembers = teamMembers;
    }
    // if (createRFSDto.supportingDocuments) {
    //   let docs = [];
    //   for await (const supportingDoc of createRFSDto.supportingDocuments) {
    //     let doc = new PreprSupportingDocumentEntity();
    //     // doc.documentType = supportingDoc.documentType;
    //     doc.fileId = supportingDoc.fileId;
    //     // doc.fileType = supportingDoc.fileType;
    //     await getRepository(PreprSupportingDocumentEntity).save(doc);
    //     docs.push(doc);
    //   }
    //   rfs.supportingDocuments = docs;
    // }
    if (createRFSDto.boq) {
      let boqs = [];
      for await (const boqItem of createRFSDto.boq) {
        let boq = new PreprBillOfQuantityEntity();
        boq.brand = boqItem.brand;
        boq.itemName = boqItem.itemName;
        boq.itemDescription = boqItem.itemDescription;
        boq.model = boqItem.model;
        boq.partNumberId = boqItem.partNumberId;
        boq.quantity = boqItem.quantity;
        boq.uomId = boqItem.uomId;
        boq.costCenterId = boqItem.costCenterId;
        boq.internalOrderNoId = boqItem.internalOrderNoId;
        boq.equivalentBrandAllowed = boqItem.equivalentBrandAllowed;
        boq.wordOrderNo = boqItem.wordOrderNo;
        await getRepository(PreprBillOfQuantityEntity).save(boq);
        boqs.push(boq);
      }
      rfs.boq = boqs;
    }

    if (createRFSDto.levels) {
      let levels = [];
      for await (const lItem of createRFSDto.levels) {
        let level = new PrePrLevelsEntity();
        level.level = lItem.level;
        level.levelName = lItem.levelName;
        level.userRole = lItem.userRole;
        level.activeLevel = 0;
        level.departmentId = lItem.departmentId;
        level.departmentTypeForm = lItem.departmentTypeForm;
        level.userId = lItem.userId;
        await getRepository(PrePrLevelsEntity).save(level);
        levels.push(level);
      }
      rfs.levels = levels;
    }

    if (createRFSDto.levels) {
      let notifications = [];
      for await (const nitem of createRFSDto.levels) {
        let notification = new PreprNotificationsEntity();
        notification.level = nitem.level;
        notification.reminderInterval = createRFSDto.reminderInterval;
        notification.reminderFrequency = createRFSDto.reminderFrequency;
        notification.totalLevels = createRFSDto.levels.length;
        notification.userRole = nitem.userRole;
        notification.departmentId = nitem.departmentId;
        notification.status = createRFSDto.submitStatus;

        await getRepository(PreprNotificationsEntity).save(notification);
        notifications.push(notification);
      }
      rfs.notifications = notifications;
    }
    // rfs.userId = createRFSDto.userId;
    let historyList = [];


    console.log("In History")
    let history = new PreprHistoryEntity();
    history.action = createRFSDto.submitStatus == SubmitType.CANCELLED ? "Cancelled" : ActionType.UPDATE;
    history.actionBy = user.userName
    history.remarks = createRFSDto.submitStatus == SubmitType.CANCELLED ? "Cancelled" : 'Created';
    history.preprId = rfs.id;
    historyList.push(history);
    await getRepository(PreprHistoryEntity).save(history);
    rfs.history = historyList;

    //console.log(rfs)

    const result = await this.save(rfs);
    if (createRFSDto.submitStatus == SubmitType.SUBMITED) {
      await getRepository(PreprNotificationsEntity)
        .createQueryBuilder()
        .update()
        .set({ status: SubmitType.PENDING, remark: "" })
        .where('"preprId" = :id and level = 1', { id: rfs.id })
        .execute();
    }
    return rfs;
  }

  async rfsSupportingDocument(dataa: any, docPath: any) {
    let data = dataa.map((e, i) => {
      let temp = docPath.find(element => element.originalname === e.fileName)
      console.log(temp)
      if (temp.url) {
        e.url = temp.url;
      }
      return e;
    })
    console.log(data, "oprrrr");
    let docs = [];
    let preprId = data[0].preprId
    for (let i = 0; i < data.length; i++) {

      let doc = new PreprSupportingDocumentEntity();
      doc.availability = data[i].availability;
      doc.preprId = data[i].preprId;
      doc.fileOriginalName = data[i].fileName;
      doc.filePath = data[i].url;
      doc.uploadDate = data[i].uploadedDate;
      doc.offset = data[i].offset;
      doc.description = data[i].description;
      await getRepository(PreprSupportingDocumentEntity).save(doc);
    }
    // rfs.supportingDocuments = docs;
    let docData = await getRepository(PreprSupportingDocumentEntity).find({ preprId: preprId });
    return docData;
  }

  // async updateSupportingDocument(dataa: any, docPath: any) {
  //   // let data = dataa.map((e, i) => {
  //   //   let temp = docPath.find(element => element.originalname === e.fileName)
  //   //   console.log(temp)
  //   //   if (temp.url) {
  //   //     e.url = temp.url;
  //   //   }
  //   //   return e;
  //   // })
  //   // console.log(data, "oprrrr");
  //   let docs = [];
  //   for (let i = 0; i < data.length; i++) {

  //   }
  //   // rfs.supportingDocuments = docs;

  // }

  async updateRFS(id: number, user: JwtPayload, createRFSDto: CreateRFSDto, getPurchaseOrg: GetFlatPurchaseOrgService, getUserService: GetAllUsers, getCostCenter: GetFlatCostService, getCurrencyService: GetFlatCurrencyService, getWarrantyService: WarrantyService, getDepartmentService: GetDepartmentService,getDeliveryAddress:AddressService) {
    let rfs = await this.findOne({ id: id },
      { relations: ['recommandedSuppliers', 'supportingDocuments', 'teamMembers', 'boq', 'history', 'notifications', 'levels'] });
    // console.log(rfs);
    // return;
    rfs.templateId = createRFSDto.templateId;
    rfs.title = createRFSDto.title;
    rfs.templateName = createRFSDto.templateName;
    rfs.expectedDeliveryLeadTime = createRFSDto.expectedDeliveryLeadTime;
    rfs.justificationOfPurchase = createRFSDto.justificationOfPurchase;
    rfs.recommandedNewSupplier = createRFSDto.recommandedNewSupplier;
    rfs.internalReferenceNumber = createRFSDto.internalReferenceNumber;
    // rfs.acceptableBrands = createRFSDto.acceptableBrands;
    rfs.estimateCost = createRFSDto.estimateCost;
    // rfs.equivalentBrandRequired = createRFSDto.equivalentBrandRequired;
    rfs.reminderAlert = createRFSDto.reminderAlert;
    rfs.reminderFrequency = createRFSDto.reminderFrequency;
    rfs.reminderInterval = createRFSDto.reminderInterval;
    rfs.notifyMe = createRFSDto.notifyMe;
    rfs.submitStatus = createRFSDto.submitStatus;
    rfs.urgent_job = createRFSDto.urgent_job;
    rfs.urgentJobOption = createRFSDto.urgentJobOption;
    rfs.updated_by = user.userName;
    rfs.purchasingOrg = createRFSDto.purchasingOrg;
    if (createRFSDto.purchasingOrg)
      rfs.purchasingOrgName = await getPurchaseOrg.getFlatPurchaseOrgNameById(createRFSDto.purchasingOrg)
    rfs.form_department = createRFSDto.form_department;
    rfs.template_department = createRFSDto.template_department;
    rfs.requestor_department = await getUserService.getDepatmentIdByUserId(user.userId);
    // rfs.requestor_email = user.email;
    // rfs.requestor_name = user.userName;
    rfs.requestor_phone_number = createRFSDto.requestor_phone_number;
    // rfs.userId = createRFSDto.userId;
    rfs.warranty = createRFSDto.warranty;
    rfs.costCenter = createRFSDto.costCenter;
    rfs.previousPurchase = createRFSDto.previousPurchase;
    rfs.deliveryAddress = createRFSDto.deliveryAddress;
    rfs.deliveryAddressId = createRFSDto.deliveryAddressId;
    rfs.deliveryAddressType = createRFSDto.deliveryAddressType;
    rfs.currency = createRFSDto.currency;
    rfs.sourcingSelection = createRFSDto.sourcingSelection;
    rfs.createdById =  createRFSDto.createdById;
    // rfs.departmentId= createRFSDto.departmentId;

    // if (createRFSDto.deliveryAddress) {
    //   let address = new PreprDeliveryAddressEntity();
    //   address.title = createRFSDto.deliveryAddress.title;
    //   address.addressLine1 = createRFSDto.deliveryAddress.addressLine1;
    //   address.addressLine2 = createRFSDto.deliveryAddress.addressLine2;
    //   address.city = createRFSDto.deliveryAddress.city;
    //   address.state = createRFSDto.deliveryAddress.state;
    //   address.country = createRFSDto.deliveryAddress.country;
    //   address.zipCode = createRFSDto.deliveryAddress.zipCode;
    //   address.preprId = rfs.id;

    //   if(rfs.deliveryAddress)
    //   {
    //     address.id = rfs.deliveryAddress.id;
    //     console.log("Yes");
    //     await getRepository(PreprDeliveryAddressEntity).update({id:rfs.deliveryAddress.id},address);
    //   }
    //   else
    //   {
    //     console.log("No");
    //     await getRepository(PreprDeliveryAddressEntity).save(address);
    //   }
    //   rfs.deliveryAddress = address;
    // }
    // if (createRFSDto.warranty) {
    //   let warranty = new PreprWarrantyEntity();
    //   warranty.name = createRFSDto.warranty.name;
    //   warranty.preprId = rfs.id;
    //   if(rfs.warranty)
    //   {
    //     warranty.id = rfs.warranty.id;
    //     console.log("Yes");
    //     await getRepository(PreprWarrantyEntity).update({id:rfs.warranty.id},warranty);
    //   }
    //   else
    //   {
    //     console.log("No");
    //     await getRepository(PreprWarrantyEntity).save(warranty);
    //   }
    //   rfs.warranty = warranty;
    // }
    if (createRFSDto.recommandedSuppliers) {
      let suppliers = [];
      for await (const sup of createRFSDto.recommandedSuppliers) {
        let supplier = new PreprSupplierEntity();
        // supplier.name = sup.name;
        supplier.supplierId = sup.supplierId;
        await getRepository(PreprSupplierEntity).save(supplier);
        suppliers.push(supplier);
      }
      rfs.recommandedSuppliers = suppliers;
    }
    // if (createRFSDto.costCenter) {
    //   let cc = new PreprCostCenterEntity();
    //   cc.code = createRFSDto.costCenter.code;
    //   cc.companycode = createRFSDto.costCenter.companycode;
    //   cc.description = createRFSDto.costCenter.description;
    //   cc.preprId = rfs.id;
    //   if(rfs.costCenter)
    //   {
    //     cc.id = rfs.costCenter.id;
    //     console.log("Yes");
    //     await getRepository(PreprCostCenterEntity).update({id:rfs.costCenter.id},cc);
    //   }
    //   else
    //   {
    //     console.log("No");
    //     await getRepository(PreprCostCenterEntity).save(cc);
    //   }
    //   rfs.costCenter = cc;
    // }
    // if (createRFSDto.previousPurchase) {
    //   let pp = new PreprPreviousPurchaseEntity();
    //   pp.previousRequest = createRFSDto.previousPurchase.previousPurchase;     
    //   pp.preprId = rfs.id;
    //   if(rfs.previousPurchase)
    //   {
    //     pp.id = rfs.previousPurchase.id;
    //     console.log("Yes");
    //     await getRepository(PreprPreviousPurchaseEntity).update({id:rfs.previousPurchase.id},pp);
    //   }
    //   else
    //   {
    //     console.log("No");
    //     await getRepository(PreprPreviousPurchaseEntity).save(pp);
    //   }
    //   rfs.previousPurchase = pp;
    // } 
    if (createRFSDto.teamMembers) {
      let teamMembers = [];
      for await (const tItem of createRFSDto.teamMembers) {
        let teamMember = new PreprTeamMemberEntity();
        teamMember.userId = tItem.userId;
        // teamMember.name = tItem.name;
        // teamMember.userName = tItem.userName;
        // teamMember.userRole = tItem.userRole;
        // teamMember.emailAddress = tItem.emailAddress;
        teamMember.viewStatus = tItem.viewStatus;
        await getRepository(PreprTeamMemberEntity).save(teamMember);
        teamMembers.push(teamMember);
      }
      rfs.teamMembers = teamMembers;
    }
    // if (createRFSDto.supportingDocuments) {
    //   let docs = [];
    //   for await (const supportingDoc of createRFSDto.supportingDocuments) {
    //     let doc = new PreprSupportingDocumentEntity();
    //     // doc.documentType = supportingDoc.documentType;
    //     doc.fileId = supportingDoc.fileId;
    //     // doc.fileType = supportingDoc.fileType;
    //     await getRepository(PreprSupportingDocumentEntity).save(doc);
    //     docs.push(doc);
    //   }
    //   rfs.supportingDocuments = docs;
    // }
    if (createRFSDto.boq) {
      let boqs = [];
      for await (const boqItem of createRFSDto.boq) {
        let boq = new PreprBillOfQuantityEntity();
        boq.brand = boqItem.brand;
        boq.itemName = boqItem.itemName;
        boq.itemDescription = boqItem.itemDescription;
        boq.model = boqItem.model;
        boq.partNumberId = boqItem.partNumberId;
        boq.quantity = boqItem.quantity;
        boq.uomId = boqItem.uomId;
        boq.costCenterId = boqItem.costCenterId;
        boq.internalOrderNoId = boqItem.internalOrderNoId;
        boq.equivalentBrandAllowed = boqItem.equivalentBrandAllowed;
        boq.wordOrderNo = boqItem.wordOrderNo;
        await getRepository(PreprBillOfQuantityEntity).save(boq);
        boqs.push(boq);
      }
      rfs.boq = boqs;
    }

    if (createRFSDto.levels) {
      let levels = [];
      for await (const lItem of createRFSDto.levels) {
        let level = new PrePrLevelsEntity();
        level.level = lItem.level;
        level.levelName = lItem.levelName;
        level.userRole = lItem.userRole;
        level.activeLevel = 0;
        level.departmentId = lItem.departmentId;
        level.departmentTypeForm = lItem.departmentTypeForm;
        level.userId = lItem.userId;
        await getRepository(PrePrLevelsEntity).save(level);
        levels.push(level);
      }
      rfs.levels = levels;
    }

    if (createRFSDto.levels) {
      let notifications = [];
      for await (const nitem of createRFSDto.levels) {
        let notification = new PreprNotificationsEntity();
        notification.level = nitem.level;
        notification.reminderInterval = createRFSDto.reminderInterval;
        notification.reminderFrequency = createRFSDto.reminderFrequency;
        notification.totalLevels = createRFSDto.levels.length;
        notification.userRole = nitem.userRole;
        notification.departmentId = nitem.departmentId;
        await getRepository(PreprNotificationsEntity).save(notification);
        notifications.push(notification);
      }
      rfs.notifications = notifications;
    }
    let rfsN: any = await getRepository(PreprCopyEntity).findOne({ preprId: id })
    // rfs.userId = createRFSDto.userId;
    if (!createRFSDto.isDraftAS && !rfsN.firstTimeCheck) {
      let historyList = await rfs.history;
      let updatedValues = await this.getPrePrDiff(id, createRFSDto, getPurchaseOrg, getCostCenter, getCurrencyService, getWarrantyService, getDepartmentService,getDeliveryAddress);
      if (updatedValues != "") {
        let history = new PreprHistoryEntity();
        history.action = await this.getPrePrDiff(id, createRFSDto, getPurchaseOrg, getCostCenter, getCurrencyService, getWarrantyService, getDepartmentService,getDeliveryAddress);
        history.actionBy = user.userName;
        if (createRFSDto.submitStatus == SubmitType.CANCELLED)
          history.remarks = 'Cancelled';
        else
          history.remarks = 'Updated';
        history.preprId = rfs.id;
        historyList.push(history);
        await getRepository(PreprHistoryEntity).save(history);
      }
      rfs.history = historyList;
    } else if (!createRFSDto.isDraftAS && createRFSDto.submitStatus == SubmitType.CANCELLED) {
      let historyList = await rfs.history;
      let history = new PreprHistoryEntity();
      history.action = "Cancelled"
      history.actionBy = user.userName;
      history.remarks = 'Cancelled';
      history.preprId = rfs.id;
      historyList.push(history);
      await getRepository(PreprHistoryEntity).save(history);

      rfs.history = historyList;
    }
    //console.log(rfs)
    // await delete rfs.deliveryAddress
    // await delete rfs.warranty
    // await delete rfs.costCenter
    // await delete rfs.previousPurchase
    const result = await this.save(rfs)
    if (createRFSDto.submitStatus == SubmitType.SUBMITED) {
      await getRepository(PreprNotificationsEntity)
        .createQueryBuilder()
        .update()
        .set({ status: SubmitType.PENDING, remark: "" })
        .where('"preprId" = :id and level = 1', { id: rfs.id })
        .execute();
    }
    return await this.findOne({ id: id },
      { relations: ['recommandedSuppliers', 'supportingDocuments', 'teamMembers', 'boq', 'history', 'notifications', 'levels'] });


  }

  //copy rfs
  async copyRFS(id: number, user: JwtPayload) {
    let rfsN = await this.findOne({ id: id },
      { relations: ['recommandedSuppliers', 'supportingDocuments', 'teamMembers', 'boq', 'notifications', 'levels'] });
    let rfs = new PreprEntity();
    rfs.templateId = rfsN.templateId;
    rfs.title = rfsN.title;
    rfs.templateName = rfsN.templateName;
    rfs.expectedDeliveryLeadTime = rfsN.expectedDeliveryLeadTime;
    rfs.justificationOfPurchase = rfsN.justificationOfPurchase;
    rfs.recommandedNewSupplier = rfsN.recommandedNewSupplier;
    rfs.internalReferenceNumber = rfsN.internalReferenceNumber;
    // rfs.acceptableBrands = rfsN.acceptableBrands;
    rfs.estimateCost = rfsN.estimateCost;
    // rfs.equivalentBrandRequired = rfsN.equivalentBrandRequired;
    rfs.reminderAlert = rfsN.reminderAlert;
    rfs.reminderFrequency = rfsN.reminderFrequency;
    rfs.reminderInterval = rfsN.reminderInterval;
    rfs.notifyMe = rfsN.notifyMe;
    rfs.submitStatus = rfsN.submitStatus;
    rfs.urgent_job = rfsN.urgent_job;
    rfs.urgentJobOption = rfsN.urgentJobOption;
    rfs.created_by = rfsN.created_by;
    rfs.updated_by = rfsN.updated_by;
    rfs.purchasingOrg = rfsN.purchasingOrg;
    rfs.requestor_department = user.department
    rfs.requestor_email = user.email;
    rfs.requestor_name = user.userName;
    rfs.requestor_phone_number = rfsN.requestor_phone_number;
    rfs.userId = rfsN.userId
    rfs.warranty = rfsN.warranty;
    rfs.costCenter = rfsN.costCenter;
    rfs.previousPurchase = rfsN.previousPurchase;
    rfs.deliveryAddress = rfsN.deliveryAddress;
    rfs.deliveryAddressId = rfsN.deliveryAddressId;
    rfs.deliveryAddressType = rfsN.deliveryAddressType;
    rfs.currency = rfsN.currency;
    rfs.sourcingSelection = rfsN.sourcingSelection;
    // rfs.gpd_acceptance_date=rfsN.gpd_acceptance_date;
    // rfs.final_approval_date = rfsN.final_approval_date;
    if (rfsN.recommandedSuppliers) {
      let suppliers = [];
      for await (const sup of rfsN.recommandedSuppliers) {
        let supplier = new PreprSupplierEntity();
        // supplier.name = sup.name;
        supplier.supplierId = sup.supplierId
        await getRepository(PreprSupplierEntity).save(supplier);
        suppliers.push(supplier);
      }
      rfs.recommandedSuppliers = suppliers;
    }
    if (rfsN.teamMembers) {
      let teamMembers = [];
      for await (const tItem of rfsN.teamMembers) {
        let teamMember = new PreprTeamMemberEntity();
        teamMember.userId = tItem.userId;
        teamMember.viewStatus = tItem.viewStatus;
        await getRepository(PreprTeamMemberEntity).save(teamMember);
        teamMembers.push(teamMember);
      }
      rfs.teamMembers = teamMembers;
    }
    // if (rfsN.supportingDocuments) {
    //   let docs = [];
    //   for await (const supportingDoc of rfsN.supportingDocuments) {
    //     let doc = new PreprSupportingDocumentEntity();
    //     // doc.documentType = supportingDoc.documentType;
    //     doc.fileId = supportingDoc.fileId;
    //     // doc.fileType = supportingDoc.fileType;
    //     await getRepository(PreprSupportingDocumentEntity).save(doc);
    //     docs.push(doc);
    //   }
    //   rfs.supportingDocuments = docs;
    // }
    if (rfsN.boq) {
      let boqs = [];
      for await (const boqItem of rfsN.boq) {
        let boq = new PreprBillOfQuantityEntity();
        boq.brand = boqItem.brand;
        boq.itemName = boqItem.itemName;
        boq.itemDescription = boqItem.itemDescription;
        boq.model = boqItem.model;
        boq.partNumberId = boqItem.partNumberId;
        boq.quantity = boqItem.quantity;
        boq.uomId = boqItem.uomId;
        boq.costCenterId = boqItem.costCenterId;
        boq.internalOrderNoId = boqItem.internalOrderNoId;
        boq.equivalentBrandAllowed = boqItem.equivalentBrandAllowed;
        boq.wordOrderNo = boqItem.wordOrderNo;
        await getRepository(PreprBillOfQuantityEntity).save(boq);
        boqs.push(boq);
      }
      rfs.boq = boqs;
    }

    if (rfsN.levels) {
      let levels = [];
      for await (const lItem of rfsN.levels) {
        let level = new PrePrLevelsEntity();;
        level.level = lItem.level;
        level.levelName = lItem.levelName;
        level.userRole = lItem.userRole;
        // level.userId = 1;
        level.departmentId = lItem.departmentId;
        await getRepository(PrePrLevelsEntity).save(level);
        levels.push(level);
      }
      rfs.levels = levels;
    }

    if (rfsN.levels) {
      let notifications = [];
      for await (const nitem of rfsN.levels) {
        let notification = new PreprNotificationsEntity();
        notification.level = nitem.level;
        notification.reminderInterval = rfsN.reminderInterval;
        notification.reminderFrequency = rfsN.reminderFrequency;
        notification.totalLevels = rfsN.levels.length;
        notification.userRole = nitem.userRole;
        notification.departmentId = nitem.departmentId;
        notification.status = rfsN.submitStatus;
        await getRepository(PreprNotificationsEntity).save(notification);
        notifications.push(notification);
      }
      rfs.notifications = notifications;
    }
    rfs.userId = user.userName;
    let historyList = [];
    if (rfsN.submitStatus == SubmitType.SUBMITED) {
      console.log("In History")
      let history = new PreprHistoryEntity();
      history.action = ActionType.UPDATE;
      history.actionBy = "User To Be Added";
      history.remarks = '';
      history.preprId = rfs.id;
      historyList.push(history);
      await getRepository(PreprHistoryEntity).save(history);
      rfs.history = historyList;
    }
    //console.log(rfs)

    const result = await this.save(rfs);
    if (rfsN.submitStatus == SubmitType.SUBMITED) {
      await getRepository(PreprNotificationsEntity)
        .createQueryBuilder()
        .update()
        .set({ status: SubmitType.PENDING, remark: "" })
        .where('"preprId" = :id and level = 1', { id: rfs.id })
        .execute();
    }
    return rfs;
  }


  async deleteRFS(id: number) {
    let rfs = await this.delete({ id: id });
    return rfs;
  }

  async updateStatus(prepr_id: number, status: SubmitType) {
    let data = await this.findOne({ id: prepr_id });
    console.log(data, prepr_id, status)
    data.submitStatus = status;
    await this.save(data);
    let rfsN = await this.findOne({ id: prepr_id });
    if (rfsN.submitStatus == SubmitType.SUBMITED) {
      await getRepository(PreprNotificationsEntity)
        .createQueryBuilder()
        .update()
        .set({ status: SubmitType.PENDING, remark: "" })
        .where('"preprId" = :id and level = 1', { id: rfsN.id })
        .execute();
      await getRepository(PrePrLevelsEntity)
        .createQueryBuilder()
        .update()
        .set({ activeLevel: 1 })
        .where('"preprId" = :id', { id: prepr_id })
        .execute();
    }
    return rfsN;
  }

  async getPrePrDiff(preprId: number, createRFSDto: CreateRFSDto, getPurchaseOrg: GetFlatPurchaseOrgService, getCostCenter: GetFlatCostService, getCurrencyService: GetFlatCurrencyService, getWarrantyService: WarrantyService, getDepartmentService: GetDepartmentService,getDeliveryAddress:AddressService) {
    let labelNames = {
      "purchasingOrg": "Purchasing Org",
      "purchasingOrgName": "Purchasing Org Name",
      "internalReferenceNumber": "Internal Refrence Number",
      "urgent_job": "Urgent Job",
      "urgentJobOption": "Urgent Job Option",
      "justificationOfPurchase": "Justification Of Purchase",
      "expectedDeliveryLeadTime": "Expected Delivery Lead Time",
      "deliveryAddressType": "Delivery Address Type",
      "deliveryAddress": "Delivery Address",
      "deliveryAddressId":"Delivery Address",
      "currency": "Base Currency",
      "warranty": "Warranty",
      "costCenter": "Cost Center",
      "sourcingSelection": "Sourcing Selection",
      "estimateCost": "Estimate Cost",
      "previousPurchase": "Previous Purchase",
      "reminderAlert": "Reminder Alert",
      "reminderInterval": "Reminder Interval",
      "reminderFrequency": "Reminder Frequency",
      "notifyMe": "Notify Me",
      "updated_by": "Updated By",
      "created_by": "Created By",
      "updated_At": "Updated At",
      "created_At": "Created At",
      "submitStatus": "Sumbit Status",
      "title": "Title",
      "requestor_phone_number": "Phone Number",
      "recommandedNewSupplier": "Recommanded New Supplier"
    }
    // let rfsN: any = await this.findOne({ id: preprId },
    let rfsN: any = await getRepository(PreprCopyEntity).findOne({ preprId: preprId },
      { relations: ['recommandedSuppliers', 'supportingDocuments', 'teamMembers', 'boq', 'levels'] });
    console.log(rfsN, "copy data")
    console.log(createRFSDto, "create DTO data")
    let updateString = "";
    let listofRelatedTable = ["supportingDocuments", "teamMembers", "levels", "boq", "recommandedSuppliers"]
    for (let i in rfsN) {
      // console.log(rfsN[i], "rfsn");
      // console.log(createRFSDto[i]);
      if (i != "id" && i != "preprId") {
        if (!(listofRelatedTable.includes(i))) {

          if (i == "expectedDeliveryLeadTime" && rfsN[i])
            rfsN[i] = rfsN[i].toISOString();
          if (rfsN[i] != createRFSDto[i] && (rfsN[i] != undefined) && (createRFSDto[i] != undefined)) {
            if (i != "costCenter" && i != "warranty" && i != "currency" && i != "purchasingOrg" && i != "requestor_department" && i != "created_by" && i != "form_department" && i != "urgent_job" && i!="deliveryAddressId" && i!="deliveryAddress" && i!= "submitStatus" && i !="updated_by" )
              updateString += `${labelNames[i]} - ${createRFSDto[i]} $`
            if (i == "currency") {
              let currencyValue = await getCurrencyService.getFlatCurrenyNameById(createRFSDto[i])
              updateString += `${labelNames[i]} - ${currencyValue} $`
            }
            if (i == "warranty") {
              let warrantyValue = await getWarrantyService.getWarrantyNameById(createRFSDto[i])
              updateString += `${labelNames[i]} - ${warrantyValue} $`
            }
            if (i == "costCenter") {
              let costCenterValue = await getCostCenter.getFlatCostCenterNameById(createRFSDto[i])
              updateString += `${labelNames[i]} - ${costCenterValue} $`
            }
            if (i == "purchasingOrg") {
              let purchasingOrgValue = await getPurchaseOrg.getFlatPurchaseOrgNameById(createRFSDto[i])
              updateString += `${labelNames[i]} - ${purchasingOrgValue} $`
            }
            if (i == "form_department") {
              let formDepartmentValue = await getDepartmentService.getDepartmentNameById(createRFSDto[i])
              updateString += ` Department - ${formDepartmentValue} $`
            }
            if (i == "urgent_job" && createRFSDto[i] == true) {

              updateString += `Urgent Job  - true $`
              updateString += `Urgent Job Option - ${createRFSDto["urgentJobOption"]} $`
            }
            if(i=="deliveryAddressId"){
              let deliveryAddressValue = await getDeliveryAddress.getDeliveryAddressNameById(createRFSDto[i])
              // console.log(deliveryAddressValue,"Address value")
              let address=`${deliveryAddressValue.title},${deliveryAddressValue.address_line_1},${deliveryAddressValue.address_line_2},${deliveryAddressValue.city},${deliveryAddressValue.state},${deliveryAddressValue.zip_code},${deliveryAddressValue.country}`
              updateString += `Delivery Address - ${address} $`
            }
            if(i=="deliveryAddressType" && createRFSDto[i]=="Manual"){
              updateString += `Delivery Address - ${createRFSDto["deliveryAddress"]} $`
            }
          }
        }

        else {
          if (i == listofRelatedTable[0]) {
            let firstIndex = 0, secondIndex = 0;
            while (firstIndex < rfsN[i].length && secondIndex < createRFSDto[i].length) {
              if (rfsN[i][firstIndex].fileOriginalName != createRFSDto[i][secondIndex].fileOriginalName) {
                updateString += `Supporting Documents - ${firstIndex + 1} - ${createRFSDto[i][secondIndex].fileOriginalName} $`
              }
              if (rfsN[i][firstIndex].availability !== createRFSDto[i][secondIndex].availability) {
                updateString += `Supporting  Documents - ${firstIndex + 1} - ${createRFSDto[i][secondIndex].availability}  $`
              }
              firstIndex++;
              secondIndex++;
            }
            // while (firstIndex < rfsN[i].length) {
            //   updateString += `Value of Supporting Documents Removed from  ${rfsN[i][firstIndex].fileOriginalName} $`
            //   firstIndex++;
            // }
            while (secondIndex < createRFSDto[i].length) {
              updateString += `Supporting Documents Added with File Name  ${createRFSDto[i][secondIndex].fileOriginalName} % $`
              secondIndex++;
            }

          }
          if (i == listofRelatedTable[3]) {
            let firstIndex = 0, secondIndex = 0;
            while (firstIndex < rfsN[i].length && secondIndex < createRFSDto[i].length) {
              if (rfsN[i][firstIndex].itemName != createRFSDto[i][secondIndex].itemName) {
                updateString += `Row ${firstIndex + 1} - Item Name - ${createRFSDto[i][secondIndex].itemName} $`
              }
              if (rfsN[i][firstIndex].itemDescription != createRFSDto[i][secondIndex].itemDescription) {
                updateString += `Row ${firstIndex + 1} - Item Description - ${createRFSDto[i][secondIndex].itemDescription} $`
              }
              if (rfsN[i][firstIndex].brand != createRFSDto[i][secondIndex].brand) {
                updateString += `Row ${firstIndex + 1} - Brand - ${createRFSDto[i][secondIndex].brand} $`
              }
              if (rfsN[i][firstIndex].model != createRFSDto[i][secondIndex].model) {
                updateString += `Row ${firstIndex + 1} - Model - ${createRFSDto[i][secondIndex].model} $`
              }
              if (rfsN[i][firstIndex].equivalentBrandAllowed != createRFSDto[i][secondIndex].equivalentBrandAllowed) {
                updateString += `Row ${firstIndex + 1} - Equivalent Brand Allowed - ${createRFSDto[i][secondIndex].equivalentBrandAllowed} $`
              }
              if (rfsN[i][firstIndex].costCenterId != createRFSDto[i][secondIndex].costCenterId) {
                updateString += `Row ${firstIndex + 1} - Cost Center - ${createRFSDto[i][secondIndex].costCenterId} $`
              }
              if (rfsN[i][firstIndex].wordOrderNo != createRFSDto[i][secondIndex].wordOrderNo) {
                updateString += `Row ${firstIndex + 1} - Work Order - ${createRFSDto[i][secondIndex].wordOrderNo} $`
              }
              if (rfsN[i][firstIndex].internalOrderNoId != createRFSDto[i][secondIndex].internalOrderNoId) {
                updateString += `Row ${firstIndex + 1} - Internal Order No - ${createRFSDto[i][secondIndex].internalOrderNoId} $`
              }
              if (rfsN[i][firstIndex].partNumberId != createRFSDto[i][secondIndex].partNumberId) {
                updateString += `Row ${firstIndex + 1} - Part Number - ${createRFSDto[i][secondIndex].partNumberId} $`
              }
              if (rfsN[i][firstIndex].uomId != createRFSDto[i][secondIndex].uomId) {
                updateString += `Row${firstIndex + 1} - UOM - ${createRFSDto[i][secondIndex].uomId} $`
              }
              if (rfsN[i][firstIndex].quantity != createRFSDto[i][secondIndex].quantity) {
                updateString += `Row ${firstIndex + 1} - Quantity - ${createRFSDto[i][secondIndex].quantity} $`
              }
              firstIndex++;
              secondIndex++;
            }
            if (rfsN[i].length < createRFSDto[i].length) {
              updateString += "New Row added in Bill of Quantity $"
            }
            if (rfsN[i].length > createRFSDto[i].length) {
              updateString += "Row removed in Bill of Quantity $"
            }
          }
          if (i == listofRelatedTable[1]) {
            // let firstIndex = 0, secondIndex = 0;
            // while (firstIndex < rfsN[i].length && secondIndex < createRFSDto[i].length) {
            //   if (rfsN[i][firstIndex].userId != createRFSDto[i][secondIndex].userId) {
            //     updateString += `Value in Team Member at ${firstIndex + 1} index change to ${createRFSDto[i][secondIndex].userId} $`
            //   }
            //   if (rfsN[i][firstIndex].viewStatus != createRFSDto[i][secondIndex].viewStatus) {
            //     updateString += `Value in Bill of Qunatity at ${firstIndex + 1} index change to ${createRFSDto[i][secondIndex].viewStatus} $`
            //   }
            //   firstIndex++;
            //   secondIndex++;
            // }

            //team members
            if (rfsN[i].length < createRFSDto[i].length) {
              let diff = createRFSDto[i].length-rfsN[i].length
              if(diff>1) 
              updateString += `New Team Members Added $`
              else
              updateString += `New Team Member Added $`
            }
            if (rfsN[i].length > createRFSDto[i].length) {
              let diff = rfsN[i].length-createRFSDto[i].length
              if(diff>1)
              updateString += `Team Members Removed $`
              else
              updateString += `Team Member Removed $`

            }
          }
          if (i == listofRelatedTable[2]) {
            let firstIndex = 0, secondIndex = 0;
            // while (firstIndex < rfsN[i].length && secondIndex < createRFSDto[i].length) {
            //   if (rfsN[i][firstIndex].level != createRFSDto[i][secondIndex].level) {
            //     updateString += `Value of Level change to  ${createRFSDto[i][secondIndex].level} $`
            //   }
            //   if (rfsN[i][firstIndex].userRole != createRFSDto[i][secondIndex].userRole) {
            //     updateString += `Value of user role change to  ${createRFSDto[i][secondIndex].userRole} at Level ${createRFSDto[i][secondIndex].level} $`
            //   }
            //   firstIndex++;
            //   secondIndex++;
            // }
            if (rfsN[i].length < createRFSDto[i].length) {
              updateString += `New Approval Level Added $`
            }
            if (rfsN[i].length > createRFSDto[i].length) {
              updateString += `Approval Level Removed $`
            }
          }
          if (i == listofRelatedTable[4]) {
            // let firstIndex = 0, secondIndex = 0;
            // while (firstIndex < rfsN[i].length && secondIndex < createRFSDto[i].length) {
            //   if (rfsN[i][firstIndex].supplierId != createRFSDto[i][secondIndex].supplierId) {

            //     updateString += `Value of Supplier change to  ${createRFSDto[i][secondIndex].supplierId} $`
            //   }
            //   if (rfsN[i][firstIndex].userRole != createRFSDto[i][secondIndex].userRole) {
            //     updateString += `Value of user role change to  ${createRFSDto[i][secondIndex].userRole} at Level ${createRFSDto[i][secondIndex].level} $`
            //   }
            //   firstIndex++;
            //   secondIndex++;
            // }
            if (rfsN[i].length < createRFSDto[i].length) {
              updateString += `New Recommended Supplier Added $`
            }
            if (rfsN[i].length > createRFSDto[i].length) {
              updateString += `Recommended Supplier Removed $`
            }
          }
         
        }
      }
      // }


    }
    console.log(updateString);
    return updateString;
  }

}