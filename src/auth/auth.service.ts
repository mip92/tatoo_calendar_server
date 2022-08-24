import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user-dto";
import {UsersService} from "../users/users.service";
import * as bcrypt from "bcrypt"
import {User} from "../users/user.model";
import {CreatePasswordDto} from "../users/dto/create-password-dto";
import * as jwt from "jsonwebtoken"


@Injectable()
export class AuthService {
    constructor(private userService: UsersService,

    ) {
    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(dto.password, 5)
        const email = dto.email
        const user = await this.userService.createUser({email, password: hashPassword})
        const token = this.generateToken(user)
        return {
            token,
            userId: user.id,
            email: user.email,
        }
    }


    private generateToken(user: User) {
        const payload = {email: user.email, id: user.id, role: user.role.value}
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30s'},)
    }

    private validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    async login(dto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) throw new HttpException({
            message: ['Такого пользователя не существует'],
            statusCode: 400
        }, HttpStatus.BAD_REQUEST)
        const passwordEqual = await bcrypt.compare(dto.password, user.password)
        if (!passwordEqual) throw new HttpException({
            message: ['Пароль неверный'],
            statusCode: 401
        }, HttpStatus.UNAUTHORIZED)
        const token = this.generateToken(user)
        return {
            token,
            userId: user.id,
            email: user.email,
        }
    }

    async findEmail(email: string) {
        const user = await this.userService.getUserByEmail(email);
        if (user) throw new HttpException({
            message: ["Пользователь с таким email уже существует"],
            statusCode: 400
        }, HttpStatus.BAD_REQUEST)
        else return email
    }

    async isPasswordMatch(dto: CreatePasswordDto) {
        if (dto.password1 !== dto.password2) throw new HttpException({
            message: ["Пароли не совпадают"],
            statusCode: 400
        }, HttpStatus.BAD_REQUEST)
        else return dto.password1
    }
}
