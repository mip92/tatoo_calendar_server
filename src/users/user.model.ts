import {BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {BusyDate} from "../busyDate/busyDate.model";

interface UserCreationAttrs{
    email: string,
    password:string,
    userAvatar: string,
    activationLink: string
}

@Table({tableName:"users"})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example:1, description:'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id: number;

    @ApiProperty({example:"user.mail.com", description:'Почтовый адрес пользователя'})
    @Column({type: DataType.STRING, unique:true, allowNull:false})
    email: string;

    @ApiProperty({example:"123456", description:'Пароль пользователя'})
    @Column({type: DataType.STRING, allowNull:false})
    password: string;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @BelongsTo(()=>Role)
    role:Role;

    @HasMany(()=>BusyDate)
    busyDate:BusyDate;
}