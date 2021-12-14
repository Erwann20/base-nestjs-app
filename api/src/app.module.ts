import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
       isGlobal: true,
    }),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DB_HOST,
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_MDP,
        synchronize: true,
        logging: true,
        entities: ["dist/**/*.entity{.ts,.js}"],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
