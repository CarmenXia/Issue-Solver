import "./App.css";
import React from "react";
import Home from "./pages/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Issues from "./pages/Issues/Issues";
import Issue from "./pages/Issues/Issue";
import NewIssue from "./pages/NewIssue/NewIssue";
import MyPage from "./pages/MyPage/MyPage";
import AllTickets from "./pages/Tickets/AllTickets";
import NewTicket from "./pages/NewTicket/NewTicket";
import Ticket from "./pages/Tickets/Tikcket";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className='App'>
      <Navbar />
      <Routes className='main'>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='mypage' element={<MyPage />} />
        <Route path='tickets' element={<AllTickets />} />
        <Route path='/newTicket' element={<NewTicket />} />
        <Route path='/ticket/:ticketId' element={<Ticket />} />
        <Route path='/issue/:issueId' element={<Issue />} />
        <Route path='/issues' element={<Issues />} />
        <Route path='/newIssue' element={<NewIssue />} />
      </Routes>
    </main>
  );
}

export default App;
