const assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};

const module = {
  id: "CS5610",
  name: "Web Development",
  description: "Full-stack web development using modern technologies including React, Node.js, and MongoDB",
  course: "Computer Science"
};
export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  app.get("/lab5/assignment", getAssignment);

  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  app.get("/lab5/assignment/title", getAssignmentTitle);

  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);

  const getModule = (req, res) => {
    res.json(module);
  };
  app.get("/lab5/module", getModule);

  const getModuleName = (req, res) => {
    res.json(module.name);
  };
  app.get("/lab5/module/name", getModuleName);

  const setModuleName = (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  };
  app.get("/lab5/module/name/:newName", setModuleName);

  const getModuleDescription = (req, res) => {
    res.json(module.description);
  };
  app.get("/lab5/module/description", getModuleDescription);

  const setModuleDescription = (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
  };
  app.get("/lab5/module/description/:newDescription", setModuleDescription);

  const getAssignmentScore = (req, res) => {
    res.json(assignment.score);
  };
  app.get("/lab5/assignment/score", getAssignmentScore);

  const setAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore);
    res.json(assignment);
  };
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore);

  const getAssignmentCompleted = (req, res) => {
    res.json(assignment.completed);
  };
  app.get("/lab5/assignment/completed", getAssignmentCompleted);

  const setAssignmentCompleted = (req, res) => {
    const { newCompleted } = req.params;
    assignment.completed = newCompleted === "true";
    res.json(assignment);
  };
  app.get("/lab5/assignment/completed/:newCompleted", setAssignmentCompleted);

  

  
};
