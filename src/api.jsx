import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export const getCourses = () => axios.get(`${API_BASE_URL}/courses`);

export const createCourse = (name) => axios.post(`${API_BASE_URL}/courses`, { name });

export const getCourseSections = (courseId) => axios.get(`${API_BASE_URL}/courses/${courseId}`);

export const createSection = (name, courseId) => axios.post(`${API_BASE_URL}/sections`, { name, course_id: courseId });

export const getSectionFiles = (courseId, sectionId) => axios.get(`${API_BASE_URL}/courses/${courseId}/${sectionId}`);

export const uploadFile = (file, courseId, sectionId) => {
    const formData = new FormData();
    formData.append("file", file);
  
    return axios.post(
      `${API_BASE_URL}/upload/${courseId}/${sectionId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };