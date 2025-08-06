import PathParameters from "./PathParameters.js";

// Import todos array from WorkingWithArrays
let todos = [
  { id: 1, title: "Task 1", description: "Complete the first task", completed: false },
  { id: 2, title: "Task 2", description: "Finish the second assignment", completed: true },
  { id: 3, title: "Task 3", description: "Work on project milestone", completed: false },
  { id: 4, title: "Task 4", description: "Review and submit work", completed: true },
];

export default function Lab5(app) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });
  
  // Route to update todo completed status by ID
  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === "true";
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  };
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);

  // Route to update todo description by ID
  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  };
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);

  // Route to get all todos
  const getAllTodos = (req, res) => {
    res.json(todos);
  };
  app.get("/lab5/todos", getAllTodos);

  // Route to create a new todo
  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      description: "New task description",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };
  app.get("/lab5/todos/create", createNewTodo);

  // Route to delete a todo by ID
  const removeTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      res.json(todos);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  };
  app.get("/lab5/todos/:id/delete", removeTodo);

  // Route to get a specific todo by ID
  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  };
  app.get("/lab5/todos/:id", getTodoById);

  PathParameters(app);
};
