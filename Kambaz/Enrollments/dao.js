import model from "./model.js";

// find courses for user
export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}

// find users for course
export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}

// enroll user in course
export function enrollUserInCourse(user, course) {
    return model.create({ user, course, _id: `${user}-${course}` });
}

// unenroll user from course
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}

   


