import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,           
    title: String,
    description: String,
    points: Number,
    availableDate: String,
    dueDate: String,
    module: { type: String, ref: "ModuleModel"}, 
  },
  { collection: "assignments" }
);

export default assignmentSchema;