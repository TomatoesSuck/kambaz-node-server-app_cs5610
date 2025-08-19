import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// find all assignments
export function findAllAssignments() {
  return model.find();
}

export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });
}

export function findAssignmentById(assignmentId) {
  return model.findById(assignmentId);
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  return model.create(newAssignment);
}

export const deleteAssignment = (assignmentId) =>
  model.deleteOne({ _id: assignmentId });

export const updateAssignment = (assignmentId, updates) =>
  model.updateOne({ _id: assignmentId }, { $set: updates });
