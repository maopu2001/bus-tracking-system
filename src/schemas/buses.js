import { Schema } from 'mongoose';

const busSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    routeId: {
      type: Schema.Types.ObjectId,
      ref: 'BusRoute',
    },
  },
  { timestamps: true }
);

export default busSchema;
