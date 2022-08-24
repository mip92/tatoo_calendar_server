import {ApiProperty} from "@nestjs/swagger";
import {Column, DataType} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {PeriodName} from "../busyDate.model";

export class CreateBusyDateDto{
    @ApiProperty({example:1, description:'id мастера'})
    readonly userId: number;

    @ApiProperty({type: Date, description: ' Дата сеанса'})
    @Column({type: DataType.DATE, unique: false, allowNull: true})
    readonly date: Date;

    @ApiProperty({enum: PeriodName, description: 'Первая или вторая половина дня'})
    @Column({type: DataTypes.ENUM(PeriodName.AM, PeriodName.PM), allowNull: false})
    readonly period: PeriodName;
}