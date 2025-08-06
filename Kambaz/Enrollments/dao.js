import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllEnrollments() {
  return Database.enrollments;
}

export function findEnrollmentsForUser(userId) {
  return Database.enrollments.filter((enrollment) => enrollment.user === userId);
}

export function findEnrollmentsForCourse(courseId) {
  return Database.enrollments.filter((enrollment) => enrollment.course === courseId);
}

export function findEnrollmentById(enrollmentId) {
  return Database.enrollments.find((enrollment) => enrollment._id === enrollmentId);
}

export function findEnrollmentByUserAndCourse(userId, courseId) {
  return Database.enrollments.find((enrollment) => 
    enrollment.user === userId && enrollment.course === courseId
  );
}

export function enrollUserInCourse(userId, courseId) {
  const existingEnrollment = findEnrollmentByUserAndCourse(userId, courseId);
  if (existingEnrollment) {
    return existingEnrollment;
  }
  
  const newEnrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId
  };
  
  Database.enrollments.push(newEnrollment);
  return newEnrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
  const enrollment = findEnrollmentByUserAndCourse(userId, courseId);
  if (enrollment) {
    Database.enrollments = Database.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    return { success: true };
  }
  return { success: false, error: "Enrollment not found" };
}

export function deleteEnrollment(enrollmentId) {
  Database.enrollments = Database.enrollments.filter(
    (enrollment) => enrollment._id !== enrollmentId
  );
  return { success: true };
}
