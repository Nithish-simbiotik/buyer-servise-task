import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from '../app.service';
import { PagingDto } from '../dto/paging.dto';
import { RFSService } from '../services/rfs/rfs.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  async getHello() {
    console.log("%%%%%%%%");
    
    return this.appService.getHello();
  }
}
