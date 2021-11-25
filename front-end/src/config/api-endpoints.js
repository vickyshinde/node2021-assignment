import axios from 'axios';

const studentsApi = '/api/students';
const loginApi = '/api/students/login';
const departmentApi = '/api/department';

// Get All Student Listing
export const getStudents = async (id) => {
  id = id || '';
  return await axios.get(`${studentsApi}/${id}`);
};

//Add Student
export const addStudent = async (student) => {
  return await axios.post(studentsApi, student);
};

// Update Student
export const updateStudent = async (id, student) => {
  return await axios.put(`${studentsApi}/${id}`, student);
};

// delete Student
export const deleteStudent = async (id) => {
  return await axios.delete(`${studentsApi}/${id}`);
};

// Get Check Login
export const loginStudent = async (student) => {
  return await axios.post(loginApi, student);
};

// Get All Department Listing
export const getDepartment = async (id) => {
  id = id || '';
  return await axios.get(`${departmentApi}/${id}`);
};
