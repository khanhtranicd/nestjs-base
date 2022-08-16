import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { config } from './config';

const connectionConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  extra: config.CLOUD_SQL_INSTANT_NAME ? { socketPath: config.CLOUD_SQL_INSTANT_NAME } : null,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  subscribers: [],
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => connectionConfig,
    }),
  ],
})
export class DatabaseModule {}
