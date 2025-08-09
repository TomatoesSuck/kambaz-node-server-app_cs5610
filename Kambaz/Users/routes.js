import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  // find all users
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };
  app.get("/api/users", findAllUsers);

  // find user by id
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  app.get("/api/users/:userId", findUserById);

  // delete user
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  app.delete("/api/users/:userId", deleteUser);

  // create user
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);

  // update user
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
   if (currentUser && currentUser._id === userId) {
     req.session["currentUser"] = { ...currentUser, ...userUpdates };
   }
    res.json(currentUser);
  };
  app.put("/api/users/:userId", updateUser);

  // signup
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  app.post("/api/users/signup", signup);

  // signin
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  app.post("/api/users/signin", signin);

  // signout
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  app.post("/api/users/signout", signout);

  // profile
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  app.post("/api/users/profile", profile);

  // find courses for user
   const findCoursesForUser = async (req, res) => {
   const currentUser = req.session["currentUser"];
   if (!currentUser) {
     res.sendStatus(401);
     return;
   }
   if (currentUser.role === "ADMIN") {
     const courses = await courseDao.findAllCourses();
     res.json(courses);
     return;
   }
   let { uid } = req.params;
   if (uid === "current") {
     uid = currentUser._id;
   }
   const courses = await enrollmentsDao.findCoursesForUser(uid);
   res.json(courses);
 };
 app.get("/api/users/:uid/courses", findCoursesForUser);

const enrollUserInCourse = async (req, res) => {
  let { uid, cid } = req.params;
  if (uid === "current") {
    const currentUser = req.session["currentUser"];
    uid = currentUser._id;
  }
  const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
  res.send(status);
};
app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);


const unenrollUserFromCourse = async (req, res) => {
  let { uid, cid } = req.params;
  if (uid === "current") {
    const currentUser = req.session["currentUser"];
    uid = currentUser._id;
  }
  const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
  res.send(status);
};
app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
