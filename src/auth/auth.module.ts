import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {SequelizeModule} from "@nestjs/sequelize";


@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        SequelizeModule.forFeature([]),
        forwardRef(() => UsersModule),
        forwardRef(() => AuthModule),
    ],
    exports:
        [
            AuthService,
        ]
})

export class AuthModule {
}
