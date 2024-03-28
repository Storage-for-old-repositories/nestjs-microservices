import * as mongoose from 'mongoose';

export type ExportedSchema<
  I extends Record<string, any>,
  D extends mongoose.Document<any, any, any> = I &
    mongoose.Document<mongoose.ObjectId, any, I>,
> = {
  name: string;
  schema: mongoose.Schema<D>;
};

export type InferMetadataOfSchema<E> =
  E extends ExportedSchema<infer I, infer D>
    ? {
        Interface: I;
        Document: D;
        Model: mongoose.Model<D>;
      }
    : never;
