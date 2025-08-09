import * as Dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // 查所有
  const findAllAssignments = async (req, res) => {
    const assignments = await Dao.findAllAssignments();
    res.send(assignments);
  };
  app.get("/api/assignments", findAllAssignments);

  // 按课程查
  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await Dao.findAssignmentsForCourse(courseId);
    res.send(assignments);
  };
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);

  // 按 ID 查
  const findAssignmentById = async (req, res) => {
    const { aid } = req.params;
    const assignment = await Dao.findAssignmentById(aid);
    res.send(assignment);
  };
  app.get("/api/assignments/:aid", findAssignmentById);

  // 创建
  const createAssignment = async (req, res) => {
    const newAssignment = await Dao.createAssignment(req.body);
    res.send(newAssignment);
  };
  app.post("/api/assignments", createAssignment);

  // 更新
  const updateAssignment = async (req, res) => {
    const { aid } = req.params;
    const updates = req.body;
    const status = await Dao.updateAssignment(aid, updates);
    res.send(status);
  };
  app.put("/api/assignments/:aid", updateAssignment);

  // 删除
  const deleteAssignment = async (req, res) => {
    const { aid } = req.params;
    const status = await Dao.deleteAssignment(aid);
    res.send(status);
  };
  app.delete("/api/assignments/:aid", deleteAssignment);
}