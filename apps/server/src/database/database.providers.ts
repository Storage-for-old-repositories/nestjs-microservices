import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as mongoose from 'mongoose';

import * as Schemas from './scheme';
import {
  DATABASE_CONNECTION,
  generateDatabaseModelTokenProvider,
} from './database.di-tokens';

/**
 * Данный механизм, должен позволить подключать модели в любую точку программы,
 * но намного проще, законнектить все модели в один сервис вместе с подключением,
 * а затем уже этот сервис глобально подсовывать в сервисы, такой вариант проще реализовать
 * и даёт он тоже самое что этот
 *
 * Проблема этого варианта в том, что нужно писать много общего кода типов, а у mongoose очень сложные анотации типов
 *
 * Вообщем этот вариант никаких премуществ не даёт, второй раз я бы так делать не стал
 */

const DatabaseProvider: Provider = {
  provide: DATABASE_CONNECTION,
  inject: [ConfigService],
  async useFactory(configService: ConfigService) {
    const mongoUrl = configService.getOrThrow<string>('MONGO_URL');
    const mongoConnected = await mongoose.connect(mongoUrl);
    return mongoConnected;
  },
};

const ModelsProviders = Object.entries(Schemas).map(([modelName, model]) => {
  const modelToken = generateDatabaseModelTokenProvider(modelName);

  const provider: Provider = {
    provide: modelToken,
    useFactory(mongoose: mongoose.Mongoose) {
      return mongoose.model(model.name, model.schema);
    },
    inject: [DATABASE_CONNECTION],
  };

  return provider;
});
const ModelsTokens = ModelsProviders.map((provider) => provider.provide);

export const databaseProviders = [DatabaseProvider, ...ModelsProviders];
export const databaseExports = [DATABASE_CONNECTION, ...ModelsTokens];
