import Course from '../models/Course';
import connectDB from '../utils/mongodb';

export const saveCourse = async (courseData, userId) => {
  try {
    await connectDB();
    const course = new Course({
      ...courseData,
      createdBy: userId,
    });
    await course.save();
    return course;
  } catch (error) {
    console.error('Error saving course:', error);
    throw new Error('Failed to save course');
  }
};

export const getCourses = async () => {
  try {
    await connectDB();
    const courses = await Course.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Failed to fetch courses');
  }
};

export const getCourseById = async (courseId) => {
  try {
    await connectDB();
    const course = await Course.findById(courseId)
      .populate('createdBy', 'name email');
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw new Error('Failed to fetch course');
  }
};

export const updateCourse = async (courseId, updates) => {
  try {
    await connectDB();
    const course = await Course.findByIdAndUpdate(
      courseId,
      { ...updates, updatedAt: Date.now() },
      { new: true }
    );
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  } catch (error) {
    console.error('Error updating course:', error);
    throw new Error('Failed to update course');
  }
};

export const deleteCourse = async (courseId) => {
  try {
    await connectDB();
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw new Error('Failed to delete course');
  }
}; 