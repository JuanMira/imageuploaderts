import { Schema, model } from "mongoose";

export interface Image {
  _id?: Schema.Types.ObjectId;
  name: string;
  path: string;
  creationDate: Date;
}

const imageSchema = new Schema<Image>(
  {
    name: String,
    path: String,
    creationDate: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Image", imageSchema);
