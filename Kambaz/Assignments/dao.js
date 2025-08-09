// import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// find all assignments
export function findAllAssignments() {
  return model.find();
}

// 在 assignments 这个集合里，找到所有 course 字段等于 courseId 的文档，并返回它们。
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

// export function findAssignmentById(assignmentId) {
//   return Database.assignments.find((assignment) => assignment._id === assignmentId);
// }

// export function findAssignmentsForCourse(courseId) {
//   return Database.assignments.filter((assignment) => assignment.course === courseId);
// }


// export function createAssignment(assignment) {
//   const newAssignment = { ...assignment, _id: uuidv4() };
//   Database.assignments = [...Database.assignments, newAssignment];
//   return newAssignment;
// }

// export function deleteAssignment(assignmentId) {
//   Database.assignments = Database.assignments.filter((assignment) => assignment._id !== assignmentId);
//   return { success: true };
// }


// export function updateAssignment(assignmentId, assignmentUpdates) {
//   const assignment = Database.assignments.find((assignment) => assignment._id === assignmentId);
//   if (assignment) {
//     Object.assign(assignment, assignmentUpdates);
//     return assignment;
//   }
//   return null;
// }