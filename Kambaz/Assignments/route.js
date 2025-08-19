import * as Dao from "./dao.js";

export default function AssignmentRoutes(app) {

  // fetch all assignments
  app.get("/api/assignments", async (req, res) => {
    const assignments = await Dao.findAllAssignments();
    res.json(assignments);
  });

  // fetch an assignment by id
  app.get("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const assignment = await Dao.findAssignmentById(aid);
    if (!assignment) return res.sendStatus(404);
    res.json(assignment);
  });

  // create an assignment
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const payload = { ...req.body, course: courseId };

    // simple validation
    if (!payload.title) {
      return res.status(400).json({ error: "Missing field: title" });
    }

    const created = await Dao.createAssignment(payload);
    res.status(201).json(created);
  });

  // update an assignment
  app.put("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const updates = req.body;
    const updated = await Dao.updateAssignment(aid, updates);
    if (!updated) return res.sendStatus(404);
    res.json(updated);
  });

  // delete an assignment
  app.delete("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const ok = await Dao.deleteAssignment(aid);
    if (!ok) return res.sendStatus(404);
    res.sendStatus(204);
  });
}