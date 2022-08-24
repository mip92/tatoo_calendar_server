import {ApiProperty} from "@nestjs/swagger";
import {Column, DataType} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {PeriodName} from "../busyDate.model";

export class GetBusyDateDto {
    @ApiProperty({example: 1, description: 'id мастера'})
    readonly userId: number;

    @ApiProperty({type: Date, description: 'Начало временного промежутка по которому делать выборку'})
    readonly startDate: Date;

    @ApiProperty({type: Date, description: 'Конец временного промежутка по которому делать выборку'})
    readonly endDate: Date;

    @ApiProperty({enum: PeriodName, required:false, nullable: true, description: 'Первая или вторая половина дня'})
    readonly period?: PeriodName;

    @ApiProperty({example: 10, description: 'Лимит для пагинации'})
    readonly limit: number

    @ApiProperty({example: 0, description: 'Пропуск для пагинации'})
    readonly offset: number
}