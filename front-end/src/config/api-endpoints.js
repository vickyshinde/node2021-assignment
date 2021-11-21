import axios from 'axios';

const studentsApi = 'http://localhost:5000/api/students';
const postApi = 'https://jsonplaceholder.typicode.com/posts';

export const getStudents = async (id) => {
  id = id || '';
  return await axios.get(`${studentsApi}/${id}`);
};

export const addUser = async (user) => {
  return await axios.post(studentsApi, user);
};

export const editUser = async (id, user) => {
  return await axios.put(`${studentsApi}/${id}`, user);
};

export const deleteStudent = async (id) => {
  return await axios.delete(`${studentsApi}/${id}`);
};

export const getPost = async () => {
  return await axios.get(postApi);
};
