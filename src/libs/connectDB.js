import { initializeSchemas } from '@/schemas';
import mongoose from 'mongoose';

global.mongoose = {
  conn: null,
  promise: null,
};

export async function connectDB() {
  try {
    initializeSchemas();
    if (global.mongoose && global.mongoose.conn) {
      return global.mongoose.conn;
    } else {
      const conString = process.env.MONGODB_URI;

      const promise = mongoose.connect(conString, {
        autoIndex: true,
      });

      global.mongoose = {
        conn: await promise,
        promise,
      };
      return await promise;
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Database connection failed');
  }
}

export const disconnect = () => {
  if (!global.mongoose.conn) {
    return;
  }
  global.mongoose.conn = null;
  mongoose.disconnect();
};
