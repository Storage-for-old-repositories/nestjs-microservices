import { Global, Module } from '@nestjs/common';

import { databaseExports, databaseProviders } from './database.providers';

@Global()
@Module({
  providers: databaseProviders,
  exports: databaseExports,
})
export class DatabaseModule {}
