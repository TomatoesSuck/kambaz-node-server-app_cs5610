import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,           
    title: String,
    description: String,
    points: Number,
    availableDate: String,
    dueDate: String,
    course: { type: String, ref: "CourseModel"},
  },
  { collection: "assignments" }
);

export default assignmentSchema;