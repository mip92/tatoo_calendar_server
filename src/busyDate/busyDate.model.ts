import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {DataTypes} from "sequelize";

interface BusyDateCreationAttrs {
    date: Date,
    period: string,
}

export enum PeriodName {
    AM = 'AM',
    PM = 'PM'
}

@Table({tableName: "busyDate"})
export class BusyDate extends Model<BusyDate, BusyDateCreationAttrs> {
    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ApiProperty({type: Date, description: ' Дата сеанса'})
    @Column({type: DataType.DATE, unique: false, allowNull: true})
    date: Date;

    @ApiProperty({enum: PeriodName, description: 'Первая или вторая половина дня'})
    @Column({type: DataTypes.ENUM(PeriodName.AM, PeriodName.PM), allowNull: false})
    period: PeriodName;

}