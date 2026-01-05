const mongodbUrl = process.env.MONGODB_URL;
if (!mongodbUrl) {
  throw new Error("db error");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    // if there is neither promise nor a connection, then we make a connection
    cached.promise = mongoose
      .connect(mongodbUrl)
      .then((conn) => conn.connection);
  }
  try {
    const conn = await cached.promise;
    return conn;
  } catch (err) {
    console.log(err);
  }
};
export default connectDB;
