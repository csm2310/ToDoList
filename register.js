import React, { useState } from 'react';
import "./todoList.css"; 
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const navigate=useNavigate();

  const validateName = () => {
    if (name.length === 0) {
      setNameError("Name is required");
      return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
      setNameError("Write full name");
      return false;
    }
    setNameError(<FaCheckCircle style={{ color: "green" }} />);
    return true;
  };

  const validatePhone = () => {
    if (phone.length === 0) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (phone.length !== 10 || !/^[0-9]{10}$/.test(phone)) {
      setPhoneError("Phone number should be 10 digits");
      return false;
    }
    setPhoneError(<FaCheckCircle style={{ color: "green" }} />);
    return true;
  };

  const validateEmail = () => {
    if (email.length === 0) {
      setEmailError("Email is required");
      return false;
    }
    if (!/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/.test(email)) {
      setEmailError("Email is invalid");
      return false;
    }
    setEmailError(<FaCheckCircle style={{ color: "green" }} />);
    return true;
  };

  const validateForm = (e) => {
    e.preventDefault(); // Prevent default form submission
    setSubmitError(''); // Reset submit error

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();

    if (!isNameValid || !isPhoneValid || !isEmailValid) {
      setSubmitError("Please fix errors to submit");
      setTimeout(() => setSubmitError(''), 3000); // Clear error after 3 seconds
      return false;
    }

    navigate('/otp')
  };

  return (
    <div className="container">
      <div className="Todo-List">
        <h2 id="login">Register</h2>
        <form onSubmit={validateForm}>
          <div className="input-group" id="text">
            <input
              type="text"
              id="register-name"
              name="username"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateName}
              required
            />
             <span id="name-error" style={{ color: 'red' }}>
              {nameError || <FaTimesCircle style={{ color: 'red' }} />}
            </span>

          </div>
          <div className="input-group" id="text">
            <input
              type="text"
              id="register-no"
              name="phone-no"
              placeholder="Phone No"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={validatePhone}
              required
            />
            <span id="phone-error" style={{ color: 'red' }}>
              {phoneError || <FaTimesCircle style={{ color: 'red' }} />}
            </span>
          </div>
          <div className="input-group" id='text'>
            <input
              type="text"
              id="register-email"
              name="Email"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              required
            />
            <span id="email-error" style={{ color: 'red' }}>
              {emailError || <FaTimesCircle style={{ color: 'red' }} />}
            </span>
          </div>
          <div className="input-group">
            <button type="submit" id="login-button">Register</button>
            <span id="submit-error" style={{ color: 'red' }}>{submitError}</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
