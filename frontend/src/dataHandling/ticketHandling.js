import axios from "axios";

const BASE_URL = "/api/tickets";

//get all tickets

async function getAllTickets() {
  const response = await axios.get(`${BASE_URL}/all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//get ticket by id

async function getTicketId(id) {
  const response = await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//create new ticket
function createTicket(title, status, priority, deadLine, description) {
  return axios
    .post(
      `${BASE_URL}`,
      {
        title: title,
        status: status,
        priority: priority,
        deadLine: deadLine,
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));
}

//update tickets
function updataTicket(id, ticket) {
  const response = axios.put(`${BASE_URL}/${id}`, ticket, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
}

//delete tickets
async function deleteTicket(id) {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//add member
function addMember(id, member) {
  const response = axios.put(`${BASE_URL}/${id}/addMember`, member, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//remove  member
async function removeMember(id, member) {
  const response = await axios.put(`${BASE_URL}/${id}/removeMember`, member, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

export {
  getAllTickets,
  getTicketId,
  createTicket,
  updataTicket,
  deleteTicket,
  addMember,
  removeMember,
};
