import asyncHandler from "express-async-handler";
import InstituteAuth from "../../models/auth/instituteAuthModel.js";
import CourseInfo from "../../models/transaction/courseModel.js";

//add courses into institute
const addCourses = asyncHandler(async (req, res) => {
  const { courseName } = req.body;

  const id = req.institute?.id;
  const institute = await InstituteAuth.findById(id);
  if (!institute) {
    res.status(404);
    throw new Error("Institute not found");
  }

  const existingCourse = await CourseInfo.findOne({
    courseName: { $regex: new RegExp(`^${courseName}$`, "i") },
    institute: id,
  });

  if (existingCourse) {
    res.status(400);
    throw new Error("A course with this name already exists in the institute");
  }
  const newCourse = new CourseInfo({
    courseName,
    institute: id,
  });
  const savedCourse = await newCourse.save();
  res.status(201).json({
    message: "Course added Successfully",
    courseName: savedCourse,
  });
  if (!savedCourse) {
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Check the backend error",
    });
  }
});

const getCourses = asyncHandler(async (req, res) => {
  const instituteId = req.institute._id;

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
      count: 0,
      courses: [],
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

  // Get the authenticated institute's ID from the token
  const authenticatedInstituteId = req.institute._id;

  // Find the course
  const course = await CourseInfo.findById(courseId).populate("institute");

  // Check if course exists
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }
  // Verify that the authenticated institute owns the course
  if (course.institute._id.toString() !== authenticatedInstituteId.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this course");
  }

  // Check for duplicate course name if name is being changed
  if (
    courseName &&
    courseName.toLowerCase() !== course.courseName.toLowerCase()
  ) {
    const existingCourse = await CourseInfo.findOne({
      courseName: { $regex: new RegExp(`^${courseName}$`, "i") },
      institute: course.institute._id,
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

  // Get the authenticated institute's ID from the token
  const authenticatedInstituteId = req.institute._id;

  // Find the course
  const course = await CourseInfo.findById(courseId).populate("institute");

  // Check if course exists
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Add a security code to add the course + ui

  // Verify that the authenticated institute owns the course
  if (course.institute._id.toString() !== authenticatedInstituteId.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this course");
  }

  // Delete the course
  await CourseInfo.findByIdAndDelete(courseId);

  res.status(200).json({
    message: "Course deleted successfully",
    courseId: courseId,
  });
});

export { addCourses, getCourses, updateCourse, deleteCourse };
