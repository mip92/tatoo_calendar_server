import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {BusyDateService} from "./busyDate.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {BusyDate} from "./busyDate.model";
import {CreateBusyDateDto} from "./dto/create-busy-date.dto";
import {GetBusyDateDto} from "./dto/get-busy-date.dto";
import {Attributes, FindOptions} from "sequelize/types/model";

@ApiTags("Время")
@Controller('busyDate')
export class BusyDateController {
    constructor(private busyDateService: BusyDateService) {
    }

    /*
        @RoleDecorator('admin')
        @UseGuards(RoleGuard)*/
    @ApiOperation({summary: "Зарезервировать время"})
    @ApiResponse({status: 200, type: BusyDate})
    @Post()
    create(@Body() dto: CreateBusyDateDto) {
        return this.busyDateService.createBusyDate(dto)
    }

    @ApiOperation({summary: "Все занятое время"})
    @ApiResponse({status: 200, type: BusyDate})
    @Get()
    getAll(@Query() dto: GetBusyDateDto) {
        const {limit, offset, period, startDate, endDate, userId} = dto
        const options: FindOptions<Attributes<BusyDate>> = {
            limit,
            offset
        }
        options.where = {
            date: {
                $between: [startDate, endDate]
            },
            userId,
        }
        if (period) {
            options.where.period= period
        }
        return this.busyDateService.getAll(options)
    }

}
