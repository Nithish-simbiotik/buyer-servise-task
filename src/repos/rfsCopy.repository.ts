
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { PreprBillOfQuantityEntity } from "src/entities/prepr/prepr-bill-of-quantity.entity";
import { PreprSupplierEntity } from "src/entities/prepr/prepr-supplier.entity";
import { PreprSupportingDocumentEntity } from "src/entities/prepr/prepr-supporting-documents.entity";
import { PreprHistoryEntity } from "src/entities/prepr/prepr_history.entity";
import { PrePrLevelsEntity } from "src/entities/prepr/prepr_Level.entity";
import { PreprNotificationsEntity } from "src/entities/prepr/prepr_notifications.entity";
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
import { PreprTeamMemberCopyEntity } from "src/entities/prepr/prepr_TeamMember.entitycopy";
import { PreprBillOfQuantityCopyEntity } from "src/entities/prepr/prepr-bill-of-quantity.entityCopy";
import { PrePrLevelsCopyEntity } from "src/entities/prepr/prepr_Level.entitycopy";
import { PreprSupplierCopyEntity } from "src/entities/prepr/prepr-supplier.entitycopy";
@EntityRepository(PreprCopyEntity)
export class RFSCopyRepository extends Repository<PreprCopyEntity> {

  constructor(
  ) {
    super();
  }

  async createRFS(user: JwtPayload, data: any, getPurchaseOrg: GetFlatPurchaseOrgService, getUserService: GetAllUsers) {
    let rfs = new PreprCopyEntity();

    rfs.preprId= data.id;
    // rfs.templateId = data.templateId;
    rfs.title = data.title;
    rfs.templateName = data.templateName;
    rfs.expectedDeliveryLeadTime = data.expectedDeliveryLeadTime;
    rfs.justificationOfPurchase = data.justificationOfPurchase;
    rfs.recommandedNewSupplier = data.recommandedNewSupplier;
    rfs.internalReferenceNumber = data.internalReferenceNumber;
    // rfs.acceptableBrands = data.acceptableBrands;
    rfs.estimateCost = data.estimateCost;
    // rfs.equivalentBrandRequired = data.equivalentBrandRequired;
    rfs.reminderAlert = data.reminderAlert;
    rfs.reminderFrequency = data.reminderFrequency;
    rfs.reminderInterval = data.reminderInterval;
    rfs.notifyMe = data.notifyMe;
    rfs.submitStatus = data.submitStatus;
    rfs.urgent_job = data.urgent_job;
    rfs.urgentJobOption = data.urgentJobOption;
    rfs.created_by = data.created_by;
    rfs.updated_by = data.updated_by;
    rfs.purchasingOrg = data.purchasingOrg;
    if (data.purchasingOrg)
      rfs.purchasingOrgName = await getPurchaseOrg.getFlatPurchaseOrgNameById(data.purchasingOrg)
    rfs.form_department = data.form_department
    rfs.requestor_department = user.department
    rfs.requestor_email = data.email;
    rfs.requestor_name = data.userName;
    rfs.requestor_phone_number = data.requestor_phone_number;
    rfs.userId = user.userId.toString();
    rfs.warranty = data.warranty;
    rfs.costCenter = data.costCenter;
    rfs.previousPurchase = data.previousPurchase;
    rfs.deliveryAddress = data.deliveryAddress;
    rfs.deliveryAddressId = data.deliveryAddressId;
    rfs.deliveryAddressType = data.deliveryAddressType;
    rfs.currency = data.currency;
    rfs.sourcingSelection = data.sourcingSelection;
    rfs.template_department = data.template_department;
    rfs.firstTimeCheck=true;
    
    if (data.recommandedSuppliers) {
      let suppliers = [];
      for await (const sup of data.recommandedSuppliers) {
        let supplier = new PreprSupplierCopyEntity();
        supplier.supplierId = sup.supplierId
        await getRepository(PreprSupplierCopyEntity).save(supplier);
        suppliers.push(supplier);
      }
      rfs.recommandedSuppliers = suppliers;
    }
   
    if (data.teamMembers) {
      let teamMembers = [];
      for await (const tItem of data.teamMembers) {
        let teamMember = new PreprTeamMemberEntity();
        teamMember.userId = tItem.userId;
        teamMember.viewStatus = tItem.viewStatus;
        await getRepository(PreprTeamMemberCopyEntity).save(teamMember);
        teamMembers.push(teamMember);
      }
      rfs.teamMembers = teamMembers;
    }
    
    if (data.boq) {
      let boqs = [];
      for await (const boqItem of data.boq) {
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
        await getRepository(PreprBillOfQuantityCopyEntity).save(boq);
        boqs.push(boq);
      }
      rfs.boq = boqs;
    }

    if (data.levels) {
      let levels = [];
      for await (const lItem of data.levels) {
        let level = new PrePrLevelsEntity();
        level.level = lItem.level;
        level.levelName = lItem.levelName;
        level.userRole = lItem.userRole;
        level.activeLevel = 0;
        level.departmentId = lItem.departmentId;
        level.departmentTypeForm = lItem.departmentTypeForm;
        level.userId = lItem.userId;
        await getRepository(PrePrLevelsCopyEntity).save(level);
        levels.push(level);
      }
      rfs.levels = levels;
    }
    let historyList = [];


   

    const result = await this.save(rfs);
    // if (data.submitStatus == SubmitType.SUBMITED) {
    //   await getRepository(PreprNotificationsEntity)
    //     .createQueryBuilder()
    //     .update()
    //     .set({ status: SubmitType.PENDING, remark: "" })
    //     .where('"preprId" = :id and level = 1', { id: rfs.id })
    //     .execute();
    // }
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
    let docData = await getRepository(PreprSupportingDocumentEntity).find({ preprId: preprId });
    return docData;
  }

 

  async updateRFS(user: JwtPayload, data:PreprEntity, getPurchaseOrg: GetFlatPurchaseOrgService, getUserService: GetAllUsers, getCostCenter: GetFlatCostService, getCurrencyService: GetFlatCurrencyService, getWarrantyService: WarrantyService, getDepartmentService: GetDepartmentService) {
    let rfs = await this.findOne({ preprId: data.id },
      { relations: ['recommandedSuppliers', 'supportingDocuments', 'teamMembers', 'boq','levels'] });
   console.log(data,"Data")
    // rfs.templateId = data.templateId;
    rfs.title = data.title;
    rfs.templateName = data.templateName;
    rfs.expectedDeliveryLeadTime = data.expectedDeliveryLeadTime;
    rfs.justificationOfPurchase = data.justificationOfPurchase; 
    rfs.recommandedNewSupplier = data.recommandedNewSupplier;
    rfs.internalReferenceNumber = data.internalReferenceNumber;
    rfs.estimateCost = data.estimateCost;
    rfs.reminderAlert = data.reminderAlert;
    rfs.reminderFrequency = data.reminderFrequency;
    rfs.reminderInterval = data.reminderInterval;
    rfs.notifyMe = data.notifyMe;
    rfs.submitStatus = data.submitStatus;
    rfs.urgent_job = data.urgent_job;
    rfs.urgentJobOption = data.urgentJobOption;
    rfs.updated_by = user.userName;
    rfs.purchasingOrg = data.purchasingOrg;
    if (data.purchasingOrg)
      rfs.purchasingOrgName = await getPurchaseOrg.getFlatPurchaseOrgNameById(data.purchasingOrg)
    rfs.form_department = data.form_department;
    rfs.template_department = data.template_department;
    rfs.requestor_department = await getUserService.getDepatmentIdByUserId(user.userId);
    rfs.requestor_phone_number = data.requestor_phone_number;
    rfs.warranty = data.warranty;
    rfs.costCenter = data.costCenter;
    rfs.previousPurchase = data.previousPurchase;
    rfs.deliveryAddress = data.deliveryAddress;
    rfs.deliveryAddressId = data.deliveryAddressId;
    rfs.deliveryAddressType = data.deliveryAddressType;
    rfs.currency = data.currency;
    rfs.sourcingSelection = data.sourcingSelection;
    rfs.firstTimeCheck=false;

    
    if (data.recommandedSuppliers) {
      let suppliers = [];
      for await (const sup of data.recommandedSuppliers) {
        let supplier = new PreprSupplierCopyEntity();
      
        supplier.supplierId = sup.supplierId;
        await getRepository(PreprSupplierCopyEntity).save(supplier);
        suppliers.push(supplier);
      }
      rfs.recommandedSuppliers = suppliers;
    }
   
   
    if (data.teamMembers) {
      let teamMembers = [];
      for await (const tItem of data.teamMembers) {
        let teamMember = new PreprTeamMemberCopyEntity();
        teamMember.userId = tItem.userId;
        teamMember.viewStatus = tItem.viewStatus;
        await getRepository(PreprTeamMemberCopyEntity).save(teamMember);
        teamMembers.push(teamMember);
      }
      rfs.teamMembers = teamMembers;
    }
  
    if (data.boq) {
      let boqs = [];
      for await (const boqItem of data.boq) {
        let boq = new PreprBillOfQuantityCopyEntity();
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
        await getRepository(PreprBillOfQuantityCopyEntity).save(boq);
        boqs.push(boq);
      }
      rfs.boq = boqs;
    }

    if (data.levels) {
      let levels = [];
      for await (const lItem of data.levels) {
        let level = new PrePrLevelsCopyEntity();
        level.level = lItem.level;
        level.levelName = lItem.levelName;
        level.userRole = lItem.userRole;
        level.activeLevel = 0;
        level.departmentId = lItem.departmentId;
        level.departmentTypeForm = lItem.departmentTypeForm;
        level.userId = lItem.userId;
        await getRepository(PrePrLevelsCopyEntity).save(level);
        levels.push(level);
      }
      rfs.levels = levels;
    }

    const result = await this.save(rfs)
    // if (data.submitStatus == SubmitType.SUBMITED) {
    //   await getRepository(PreprNotificationsEntity)
    //     .createQueryBuilder()
    //     .update()
    //     .set({ status: SubmitType.PENDING, remark: "" })
    //     .where('"preprId" = :id and level = 1', { id: rfs.id })
    //     .execute();
    // }
    return await this.findOne({ preprId: data.id },
      { relations: ['recommandedSuppliers', 'supportingDocuments', 'teamMembers', 'boq','levels'] });


  }

  


  async deleteRFS(id: number) {
    let rfs = await this.delete({ id: id });
    return rfs;
  }

  async getPrePrDiff(preprId: number, createRFSDto: CreateRFSDto, getPurchaseOrg: GetFlatPurchaseOrgService, getCostCenter: GetFlatCostService, getCurrencyService: GetFlatCurrencyService, getWarrantyService: WarrantyService, getDepartmentService: GetDepartmentService) {
    let labelNames = {
      "purchasingOrg": "Purchasing Org",
      "purchasingOrgName": "Purchasing Org Name",
      "internalReferenceNumber": "Internal Refrence Number",
      "urgent_job": "Urgent Job",
      // "urgentJob_option": "Urgent Job Option",
      "justificationOfPurchase": "Justification Of Purchase",
      "expectedDeliveryLeadTime": "Expected Delivery Lead Time",
      "deliveryAddressType": "Delivery Address Type",
      "deliveryAddress": "Delivery Address",
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
      "title": "Title"
    }
    let rfsN: any = await this.findOne({ id: preprId },
      { relations: ['recommandedSuppliers', 'supportingDocuments', 'teamMembers', 'boq', 'notifications', 'levels'] });
    let updateString = "";
    let listofRelatedTable = ["supportingDocuments", "teamMembers", "levels", "boq", "recommandedSuppliers"]
    for (let i in rfsN) {
      // console.log(rfsN[i], "rfsn");
      // console.log(createRFSDto[i]);
      if (i != "id") {
        if (!(listofRelatedTable.includes(i))) {

          if (i == "expectedDeliveryLeadTime" && rfsN[i])
            rfsN[i] = rfsN[i].toISOString();
          if (rfsN[i] != createRFSDto[i] && (rfsN[i] != undefined || null) && (createRFSDto[i] != undefined||null) ) {
            if (i != "costCenter" && i != "warranty" && i != "currency" && i != "purchasingOrg" && i != "requestor_department" && i != "created_by" && i != "form_department" && i != "urgent_job" && i !="updated_by" )
              updateString += `Value of ${labelNames[i]} changed to ${createRFSDto[i]} $`
            if (i == "currency") {
              let currencyValue = await getCurrencyService.getFlatCurrenyNameById(createRFSDto[i])
              updateString += `Value of ${labelNames[i]} changed to ${currencyValue} $`
            }
            if (i == "warranty") {
              let warrantyValue = await getWarrantyService.getWarrantyNameById(createRFSDto[i])
              updateString += `Value of ${labelNames[i]} changed to ${warrantyValue} $`
            }
            if (i == "costCenter") {
              let costCenterValue = await getCostCenter.getFlatCostCenterNameById(createRFSDto[i])
              updateString += `Value of ${labelNames[i]} changed to ${costCenterValue} $`
            }
            if (i == "purchasingOrg") {
              let purchasingOrgValue = await getPurchaseOrg.getFlatPurchaseOrgNameById(createRFSDto[i])
              updateString += `Value of ${labelNames[i]} changed to ${purchasingOrgValue} $`
            }
            if (i == "form_department") {
              let formDepartmentValue = await getDepartmentService.getDepartmentNameById(createRFSDto[i])
              updateString += `Value of  Department changed to ${formDepartmentValue} $`
            }
            if (i == "urgent_job" && createRFSDto[i] == true) {

              updateString += `Value of Urgent Job  changed to true $`
              updateString += `Value of Urgent Job Option changed to ${createRFSDto["urgentJobOption"]} $`
            }

          }
        }

        else {
          if (i == listofRelatedTable[0]) {
            let firstIndex = 0, secondIndex = 0;
            while (firstIndex < rfsN[i].length && secondIndex < createRFSDto[i].length) {
              if (rfsN[i][firstIndex].fileOriginalName != createRFSDto[i][secondIndex].fileOriginalName) {
                updateString += `Value of Supporting Documents Changes ${firstIndex + 1} change to ${createRFSDto[i][secondIndex].fileOriginalName} $`
              }
              if (rfsN[i][firstIndex].availability !== createRFSDto[i][secondIndex].availability) {
                updateString += `Value of Supporting  Documents Changes ${firstIndex + 1} change to ${createRFSDto[i][secondIndex].availability}  $`
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
                updateString += `Value in Bill of Qunatity in row ${firstIndex + 1} of ItemName change to ${createRFSDto[i][secondIndex].itemName} $`
              }
              if (rfsN[i][firstIndex].itemDescription != createRFSDto[i][secondIndex].itemDescription) {
                updateString += `Value in Bill of Qunatity in row ${firstIndex + 1} Item Description change to ${createRFSDto[i][secondIndex].itemDescription} $`
              }
              if (rfsN[i][firstIndex].brand != createRFSDto[i][secondIndex].brand) {
                updateString += `Value in Bill of Qunatity in row ${firstIndex + 1} Brand change to ${createRFSDto[i][secondIndex].brand} $`
              }
              if (rfsN[i][firstIndex].model != createRFSDto[i][secondIndex].model) {
                updateString += `Value in Bill of Qunatity in row ${firstIndex + 1} Model change to ${createRFSDto[i][secondIndex].model} $`
              }
              if (rfsN[i][firstIndex].equivalentBrandAllowed != createRFSDto[i][secondIndex].equivalentBrandAllowed) {
                updateString += `Value in Bill of Qunatity in row ${firstIndex + 1} Equivalent Brand Allowed change to ${createRFSDto[i][secondIndex].equivalentBrandAllowed} $`
              }
              if (rfsN[i][firstIndex].costCenterId != createRFSDto[i][secondIndex].costCenterId) {
                updateString += `Value in Bill of Qunatity in row ${firstIndex + 1} Cost Center change to ${createRFSDto[i][secondIndex].costCenterId} $`
              }
              if (rfsN[i][firstIndex].wordOrderNo != createRFSDto[i][secondIndex].wordOrderNo) {
                updateString += `Value in Bill of Qunatity in row ${firstIndex + 1} Work Order No change to ${createRFSDto[i][secondIndex].wordOrderNo} $`
              }
              if (rfsN[i][firstIndex].internalOrderNoId != createRFSDto[i][secondIndex].internalOrderNoId) {
                updateString += `Value in Bill of Qunatity in row ${firstIndex + 1} Internal Order No change to ${createRFSDto[i][secondIndex].internalOrderNoId} $`
              }
              if (rfsN[i][firstIndex].partNumberId != createRFSDto[i][secondIndex].partNumberId) {
                updateString += `Value in Bill of Qunatity in row ${firstIndex + 1} Part Number change to ${createRFSDto[i][secondIndex].partNumberId} $`
              }
              if (rfsN[i][firstIndex].uomId != createRFSDto[i][secondIndex].uomId) {
                updateString += `Value in Bill of Qunatity in row${firstIndex + 1} UOM change to ${createRFSDto[i][secondIndex].uomId} $`
              }
              if (rfsN[i][firstIndex].quantity != createRFSDto[i][secondIndex].quantity) {
                updateString += `Value in Bill of Qunatity in row ${firstIndex + 1} Quantity change to ${createRFSDto[i][secondIndex].quantity} $`
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
            let firstIndex = 0, secondIndex = 0;
            while (firstIndex < rfsN[i].length && secondIndex < createRFSDto[i].length) {
              if (rfsN[i][firstIndex].userId != createRFSDto[i][secondIndex].userId) {
                updateString += `Value in Team Member at ${firstIndex + 1} index change to ${createRFSDto[i][secondIndex].userId} $`
              }
              if (rfsN[i][firstIndex].viewStatus != createRFSDto[i][secondIndex].viewStatus) {
                updateString += `Value in Bill of Qunatity at ${firstIndex + 1} index change to ${createRFSDto[i][secondIndex].viewStatus} $`
              }
              firstIndex++;
              secondIndex++;
            }
          }
          if (i == listofRelatedTable[2]) {
            let firstIndex = 0, secondIndex = 0;
            while (firstIndex < rfsN[i].length && secondIndex < createRFSDto[i].length) {
              if (rfsN[i][firstIndex].level != createRFSDto[i][secondIndex].level) {
                updateString += `Value of Level change to  ${createRFSDto[i][secondIndex].level} $`
              }
              if (rfsN[i][firstIndex].userRole != createRFSDto[i][secondIndex].userRole) {
                updateString += `Value of user role change to  ${createRFSDto[i][secondIndex].userRole} at Level ${createRFSDto[i][secondIndex].level} $`
              }
              firstIndex++;
              secondIndex++;
            }
          }
          if (i == listofRelatedTable[4]) {
            let firstIndex = 0, secondIndex = 0;
            while (firstIndex < rfsN[i].length && secondIndex < createRFSDto[i].length) {
              if (rfsN[i][firstIndex].supplierId != createRFSDto[i][secondIndex].supplierId) {

                updateString += `Value of Supplier change to  ${createRFSDto[i][secondIndex].supplierId} $`
              }
              if (rfsN[i][firstIndex].userRole != createRFSDto[i][secondIndex].userRole) {
                updateString += `Value of user role change to  ${createRFSDto[i][secondIndex].userRole} at Level ${createRFSDto[i][secondIndex].level} $`
              }
              firstIndex++;
              secondIndex++;
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