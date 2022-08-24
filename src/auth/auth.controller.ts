import {Body, Controller, Post, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user-dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateEmailDto} from "../users/dto/create-email-dto";
import {CreatePasswordDto} from "../users/dto/create-password-dto";
import {Request, Response} from "express";

@ApiTags("Регистрация и Авторизация")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 200, type: 'string'})
    @Post('registration')
    async registration(@Body() dto: CreateUserDto) {
        return await this.authService.registration(dto)
    }

    @ApiOperation({summary: "Валидация почты"})
    @ApiResponse({status: 200, type: 'string'})
    @Post('findEmail')
    findEmail(@Body() dto: CreateEmailDto) {
        return this.authService.findEmail(dto.email)
    }

    @ApiOperation({summary: "Валидация пароля"})
    @ApiResponse({status: 200, type: 'string'})
    @Post('isPasswordMatch')
    isPasswordMatch(@Body() dto: CreatePasswordDto) {
        return this.authService.isPasswordMatch(dto)
    }

    @ApiOperation({summary: "Авторизация пользователя"})
    @ApiResponse({status: 200, type: 'string'})
    @Post('login')
    async login(@Body() dto: CreateUserDto) {
        return await this.authService.login(dto)
    }
}
