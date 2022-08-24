import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty({example:"user", description:'Роль пользователя'})
    readonly value: string;
}