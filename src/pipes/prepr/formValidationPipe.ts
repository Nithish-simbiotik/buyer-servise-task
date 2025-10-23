import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { onErrorResumeNext } from 'rxjs';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { SubmitType } from 'src/enum/rfs/submitType.enum';

@Injectable()
export class FormValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value);
    //console.log(object)
    if(!object.isDraftAS && object.submitStatus!=SubmitType.CANCELLED)
    {
      const errors = await this.validateCheck(object);
      if(errors.length>0)
      throw new BadRequestException(errors);
    }
    return value;
  }

  private async validateCheck(object: CreateRFSDto) 
  {
    let errors= [];
    if(object.urgent_job && !object.urgentJobOption)
      errors.push("Urgent Job Option Missing")
      if(!object.title)
      errors.push("Title Option Missing")
      if(!object.internalReferenceNumber)
      errors.push("Internal Refrence NUmber Option Missing")
      if(!object.justificationOfPurchase)
      errors.push("Justification of Purchase Option Missing")
      if(object.deliveryAddressType=="Manual"&& !object.deliveryAddress)
      errors.push("Delivery Address Option Missing")
      if(object.deliveryAddressType=="List" && !object.deliveryAddressId)
      errors.push("Delivery Address2 Option Missing")
      if(!object.expectedDeliveryLeadTime)
      errors.push("Expected Delivery Date Option Missing")
      if(!object.warranty)
      errors.push("Warranty Option Missing")
      if(!object.currency)
      errors.push("Currency Option Missing")
      if(object.boq.length>0)
      {
        for(let i=0;i<object.boq.length;i++){
          if(!object.boq[i].itemName || !object.boq[i].quantity || !object.boq[i].uomId || !object.boq[i].equivalentBrandAllowed){
            errors.push("Mandatory values in BQ option Missing")
          }
        }
      }

    return errors;
  }
}