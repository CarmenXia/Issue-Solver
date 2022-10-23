import axios from "axios";
const BASE_URL = "/api/issues";

//get all
async function getAllIssues() {
  const response = await axios.get(`${BASE_URL}/all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//get issues by id
async function getIssueById(id) {
  const response = await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//create new
async function createIssue(issue) {
  const response = await axios.post(`${BASE_URL}`, issue, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//update
async function updateIssue(id, issue) {
  const response = await axios.put(`${BASE_URL}/${id}`, issue, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//delete
async function deleteIssue(id) {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

export { getAllIssues, getIssueById, createIssue, updateIssue, deleteIssue };
