import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProjectOwnerModule } from './project-owner/project-owner.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env-prodiction'],
      isGlobal: true,
    }),
    AuthModule,
    ProjectOwnerModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
