import mongoose, { Schema } from "mongoose";

const PersonSchema = new Schema({
  name: { type: String, required: true }
});

export default mongoose.models.Person ||
  mongoose.model("Person", PersonSchema);
