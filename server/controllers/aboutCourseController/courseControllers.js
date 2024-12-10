import asyncHandler from "express-async-handler";
import InstituteAuth from "../../models/instituteAuthModel.js";
import CourseInfo from "../../models/courseModel.js";

//add courses into institute
const addCourses = asyncHandler(async (req, res) => {
  const { courseName, instituteId } = req.body;
  //Delete institute if needed
  const institute = await InstituteAuth.findById(instituteId);
  if (!institute) {
    res.status(404);
    throw new Error("Institute not found");
  }
  // Check for duplicate course name within the same institute
  const existingCourse = await CourseInfo.findOne({
    courseName: { $regex: new RegExp(`^${courseName}$`, "i") },
    institute: instituteId,
  });

  if (existingCourse) {
    res.status(400);
    throw new Error("A course with this name already exists in the institute");
  }
  const newCourse = new CourseInfo({
    courseName,
    institute: instituteId,
  });
  const savedCourse = await newCourse.save();
  res.status(201).json({
    message: "Course added Successfully",
    courseName: savedCourse,
  });
});

const getCourses = asyncHandler(async (req, res) => {
  const { instituteId } = req.params;

  // Verify institute exists (optional)
  const institute = await InstituteAuth.findById(instituteId);
  if (!institute) {
    res.status(404);
    throw new Error("Institute not found");
  }
  // Find all courses associated with this institute
  const courses = await CourseInfo.find({ institute: instituteId });

  // If no courses are found, return an appropriate response
  if (courses.length === 0) {
    return res.status(404).json({
      message: "No courses found for this institute",
    });
  }

  // Return the found courses
  res.status(200).json({
    message: "Courses retrieved successfully",
    count: courses.length,
    courses: courses,
  });
});

const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { courseName, additionalDetails } = req.body;

  // Find the course
  const course = await CourseInfo.findById(courseId);

  // Check if course exists
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Check for duplicate course name if name is being changed
  if (courseName && courseName !== course.courseName) {
    const existingCourse = await CourseInfo.findOne({
      courseName: { $regex: new RegExp(`^${courseName}$`, "i") },
      institute: course.institute,
    });

    if (existingCourse) {
      res.status(400);
      throw new Error(
        "A course with this name already exists in the institute"
      );
    }
  }

  // Update course fields
  if (courseName) course.courseName = courseName;
  if (timePeriods) course.timePeriods = timePeriods;

  // Optional: Add more fields to update
  if (additionalDetails) {
    course.additionalDetails = {
      ...course.additionalDetails,
      ...additionalDetails,
    };
  }

  // Save updated course
  const updatedCourse = await course.save();

  res.status(200).json({
    message: "Course updated successfully",
    course: updatedCourse,
  });
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  // Find the course
  const course = await CourseInfo.findById(courseId);

  // Check if course exists
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Add a security code to add the course + ui

  // Delete the course
  await CourseInfo.findByIdAndDelete(courseId);

  res.status(200).json({
    message: "Course deleted successfully",
    courseId: courseId,
  });
});

export { addCourses, getCourses, updateCourse, deleteCourse };
