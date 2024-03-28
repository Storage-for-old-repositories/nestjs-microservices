import { creator } from './creator';

import { EmailSchemaField } from '../schema-fields/email.schema-field';

export const UserExportedSchema = creator<{
  name: string;
  email: string;
  age: number;
}>('User', {
  email: EmailSchemaField,

  // TODO: endure to schema-field
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  // TODO: endure to schema-field
  age: {
    type: Number,
    required: [true, 'Age field is required'],
    min: [0, 'Age must be greater than 0'],
    max: [150, 'Age must be less than 150'],
  },
});
