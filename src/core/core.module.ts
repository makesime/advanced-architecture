import { Module } from '@nestjs/common';
import { ApplicationBootstrapOptionsInterface } from '../common/interfaces/application-bootstrap-options.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from './core.constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27018/vf-event-store', {
      connectionName: EVENT_STORE_CONNECTION,
      directConnection: true,
    }),
  ],
})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptionsInterface) {
    const imports =
      options.driver === 'orm'
        ? [
            // We are going to hardcode the connection options for simplicity
            // but you can use a configuration file or environment variables
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              password: 'pass123',
              username: 'postgres',
              autoLoadEntities: true,
              synchronize: true,
            }),
            MongooseModule.forRoot('mongodb://0.0.0.0:27017/vf-read-db'),
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
