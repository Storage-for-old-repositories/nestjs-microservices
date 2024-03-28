import mongoose from 'mongoose';

import { creator } from './creator';

export const PostExportedSchema = creator<{
  userId: mongoose.ObjectId;
  title: string;
  description: string;
}>('Post', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
});
