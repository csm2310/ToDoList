import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/login"
import TodoList from "./components/todoList";
import Register from './components/register';
import OTP from './components/otp';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/todolist" element={<TodoList/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/otp" element={<OTP/>} />
      </Routes>
    </Router>
  );
}

export default App;
