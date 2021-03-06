import { Schema, model, ObjectId } from "mongoose";

export interface Image {
  _id?: Schema.Types.ObjectId;
  name: string;
  path: string;
  creationDate: Date;
  userId: string;
}

const imageSchema = new Schema<Image>(
  {
    name: String,
    path: String,
    creationDate: Date,
    userId: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Image", imageSchema);
