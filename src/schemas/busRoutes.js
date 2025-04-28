import { Schema } from 'mongoose';

const busRouteSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  startingPoint: {
    type: String,
    required: true,
  },
  endingPoint: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
});
export default busRouteSchema;
