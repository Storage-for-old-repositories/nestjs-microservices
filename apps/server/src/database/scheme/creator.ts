import * as mongoose from 'mongoose';

import { ExportedSchema } from './exporter';

/**
 * Этот механизм всё таки выводит не совсем правильные типы,
 * в данном случаи стоило заменить mongoose на typegoose, так как
 * у него API вывода типов более правильный
 *
 * У mongoose очень сложные анотации типов и их разбор займёт слишком много времени
 */

type InterfaceWithId<
  I extends Record<string, any>,
  WithId = true,
> = WithId extends true
  ? {
      id: mongoose.ObjectId;
      interface: I & { _id: mongoose.ObjectId };
      document: I & mongoose.Document<mongoose.ObjectId, any, I>;
    }
  : {
      id: void;
      interface: I;
      document: I & mongoose.Document<void, any, I>;
    };

export function creator<I extends Record<string, any>, WithId = true>(
  name: string,
  schemaDefinition: mongoose.SchemaDefinition<
    InterfaceWithId<I, WithId>['interface']
  >,
) {
  const schema = new mongoose.Schema(schemaDefinition);

  const exportedSchema: ExportedSchema<
    InterfaceWithId<I, WithId>['interface'],
    InterfaceWithId<I, WithId>['document']
  > = {
    name,
    schema,
  };

  return exportedSchema;
}
