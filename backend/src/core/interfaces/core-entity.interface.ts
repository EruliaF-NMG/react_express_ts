import mongoose from "mongoose";

export interface ICoreEntity {
  _id: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  created_by: mongoose.Schema.Types.ObjectId;
  updated_by: mongoose.Schema.Types.ObjectId;
  updated_at: Date;
}