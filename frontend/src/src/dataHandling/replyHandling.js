import axios from "axios";
const BASE_URL = "/api/replies";

//create Reply
async function createReply(reply) {
  const response = await axios.post(`${BASE_URL}`, reply, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//update
async function updateReply(id, reply) {
  const response = await axios.put(`${BASE_URL}/${id}`, reply, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//delete
async function deleteReply(id) {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

export { createReply, updateReply, deleteReply };
