export { InjectDatabase } from './database.decorator';
export { DatabaseModule } from './database.module';

/**
 * Оказывается есть модуль, который решает эту проблему лучше чем то, что я написал
 * -> @nestjs/mongoose
 */

export type {
  InferInjectEntityDatabase,
  InferSchemaOfDatabaseModel,
} from './database.decorator';
