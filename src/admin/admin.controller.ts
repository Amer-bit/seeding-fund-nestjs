import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin-jwt.strategy';
import { AdminService } from './admin.service';
import { ChangeFundStatusDto } from './dto/change-fund-status.dto';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
    constructor(private adminService: AdminService){}

    @Get('/viewfundrequest')
    async viewFundRequest(){
        return this.adminService.viewFundRequest();
    }

    @Put('/changefundstatus')
    async changeFundStatus(@Body() changeFundStatusDto: ChangeFundStatusDto){
        return this.adminService.changeFundStatus(changeFundStatusDto);
    }
}
