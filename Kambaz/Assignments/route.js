import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  const findAllAssignments = (req, res) => {
    const assignments = dao.findAllAssignments();
    res.json(assignments);
  };

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const findAssignmentById = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ error: "Assignment not found" });
    }
  };

  const createAssignment = (req, res) => {
    const assignment = req.body;
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
  };

  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const updatedAssignment = dao.updateAssignment(assignmentId, assignmentUpdates);
    if (updatedAssignment) {
      res.json(updatedAssignment);
    } else {
      res.status(404).json({ error: "Assignment not found" });
    }
  };

  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.json(status);
  };

  // API endpoints
  app.get("/api/assignments", findAllAssignments);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.post("/api/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
