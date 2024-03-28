import { Inject } from '@nestjs/common';
import * as mongoose from 'mongoose';

import * as Schemas from './scheme';
import {
  DATABASE_CONNECTION,
  generateDatabaseModelTokenProvider,
} from './database.di-tokens';

export const InjectDatabase = (modelName?: keyof typeof Schemas) => {
  if (!modelName) {
    return Inject(DATABASE_CONNECTION);
  }

  const modelToken = generateDatabaseModelTokenProvider(modelName);
  return Inject(modelToken);
};

export type InferInjectEntityDatabase<T> = T extends string
  ? T extends keyof typeof Schemas
    ? Schemas.InferMetadataOfSchema<(typeof Schemas)[T]>['Model']
    : never
  : typeof mongoose;

export type InferSchemaOfDatabaseModel<T extends keyof typeof Schemas> =
  Schemas.InferMetadataOfSchema<(typeof Schemas)[T]>;
