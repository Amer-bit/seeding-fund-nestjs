import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { AuthService } from './auth.service';
import { ProjectOwner, projectOwnerSchema } from './schema/project-owner.schema';
import { Admin, adminSchema } from './schema/admin.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: ProjectOwner.name, schema: projectOwnerSchema },
      { name: Admin.name, schema: adminSchema },
    ]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get("JWT_EXPIRES_IN")
        }
        
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [
    JwtModule,
    PassportModule,
  ]
})
export class AuthModule {}
