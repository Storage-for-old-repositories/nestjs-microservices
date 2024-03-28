export const DATABASE_CONNECTION = Symbol('DATABASE_CONNECTION');

export function generateDatabaseModelTokenProvider(modelName: string) {
  if (!modelName.endsWith('ExportedSchema')) {
    throw new Error();
  }

  return `DATABASE_CONNECTION_${modelName}`;
}
