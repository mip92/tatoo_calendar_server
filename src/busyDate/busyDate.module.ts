import {Module} from '@nestjs/common';
import { BusyDateService } from './busyDate.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {BusyDate} from "./busyDate.model";
import {BusyDateController} from "./busyDate.controller";
import {RolesModule} from "../roles/roles.module";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [BusyDateController],
  providers: [BusyDateService],
  imports:[
    SequelizeModule.forFeature([BusyDate]),
    UsersModule,
  ],
  exports:[
    BusyDateService
  ]
})
export class BusyDateModule {}
