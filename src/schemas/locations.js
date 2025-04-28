import { Schema } from 'mongoose';

const locationSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default locationSchema;
