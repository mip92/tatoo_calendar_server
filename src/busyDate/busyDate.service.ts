import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {BusyDate} from "./busyDate.model";
import {CreateBusyDateDto} from "./dto/create-busy-date.dto";
import {InjectModel} from "@nestjs/sequelize";
import {RolesService} from "../roles/roles.service";
import {UsersService} from "../users/users.service";
import {Attributes, FindOptions} from "sequelize/types/model";


@Injectable()
export class BusyDateService {
    /*constructor(
        @Inject(forwardRef(() => BusyDate))
        private busyDateRepository: typeof BusyDate
    ) {}*/
    constructor(@InjectModel(BusyDate) private busyDateRepository: typeof BusyDate,
                private userService: UsersService) {
    }

    async createBusyDate(dto: CreateBusyDateDto) {
        const {userId, period, date } = dto
        const user = await this.userService.getUserById(userId)
        if (!user) throw new HttpException({
            message: ['Пользователя с таким id не существует'],
            statusCode: 401
        }, HttpStatus.BAD_REQUEST)
        if (!user.role.value || user.role.value == 'user') {
            throw new HttpException({
                message: ['Этого пользователя нельзя использовать как мастера'],
                statusCode: 401
            }, HttpStatus.BAD_REQUEST)
        }
        const busyDate = await this.getAll({
            where: {
                userId, date, period
            }
        })
        if (busyDate) {
            throw new HttpException({
                message: ['Этого мастер уже занят на эту дату в это время'],
                statusCode: 401
            }, HttpStatus.BAD_REQUEST)
        }
        return await this.busyDateRepository.create(dto)
    }

    async getAll(options: FindOptions<Attributes<BusyDate>>) {
        return await this.busyDateRepository.findOne(options)
    }

    /*
        async getRoleByValue(value: string) {
            const role = await this.roleRepository.findOne({where: {value}})
            if (!role) throw new HttpException({
                message: ['Такой роли не существует'],
                statusCode: 404
            }, HttpStatus.NOT_FOUND)
            return role
        }

        async getAllRoles() {
            const roles = await this.roleRepository.findAll()
            if (roles.length === 0) throw new HttpException({
                message: ['В базе данных нет ролей, создайте роль'],
                statusCode: 404
            }, HttpStatus.NOT_FOUND)
            return roles
        }*/
}
