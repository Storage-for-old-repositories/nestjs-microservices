import { SchemaDefinitionProperty } from 'mongoose';

export const EmailSchemaField: SchemaDefinitionProperty = {
  type: String,
  validate: {
    validator: function (value: string) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message: (props: { value: string }) =>
      `${props.value} is not a valid email`,
  },
  required: [true, 'Email field is required'],
};
