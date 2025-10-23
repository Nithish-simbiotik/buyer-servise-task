import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PreprNotificationService } from '../rfs/preprNotifitcation.service';
@Injectable()
export class SchedulerService {
    constructor(
        private preprSchedulerService: PreprNotificationService,

    ) { }

    //@Cron(CronExpression. EVERY_DAY_AT_MIDNIGHT)
    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        this.preprSchedulerService.getNotificationList();
    
    }
}
