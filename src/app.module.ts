import {Module} from '@nestjs/common';

import {ConfigModule} from "@nestjs/config";

import {User} from "./users/user.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./roles/roles.model";
import {AuthModule} from "./auth/auth.module";
import {RolesModule} from "./roles/roles.module";
import {BusyDate} from "./busyDate/busyDate.model";
import {BusyDateModule} from "./busyDate/busyDate.module";

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: '.env',
    }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, BusyDate],
            autoLoadModels: true,
        }),
        RolesModule,
        AuthModule,
        BusyDateModule
    ],
})
export class AppModule {
}
