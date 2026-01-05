import mongoose, { Connection } from "mongoose";

declare global {
  var mongoose: {
    // in ts ,we use : colons
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}
export {};
