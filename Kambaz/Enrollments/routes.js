import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  const findAllEnrollments = (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  };

  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const findEnrollmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };

  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.body;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.body;
    const result = dao.unenrollUserFromCourse(userId, courseId);
    res.json(result);
  };

  const deleteEnrollment = (req, res) => {
    const { enrollmentId } = req.params;
    const result = dao.deleteEnrollment(enrollmentId);
    res.json(result);
  };

  // API endpoints
  app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/enrollments/user/:userId", findEnrollmentsForUser);
  app.get("/api/enrollments/course/:courseId", findEnrollmentsForCourse);
  app.post("/api/enrollments", enrollUserInCourse);
  app.delete("/api/enrollments", unenrollUserFromCourse);
  app.delete("/api/enrollments/:enrollmentId", deleteEnrollment);
} 