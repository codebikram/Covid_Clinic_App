import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './auth.css';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    contactNo: '',
    location: '',
    password: '',
    cpassword: '',
  });
  const navigate = useNavigate();

  const onChangeText = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, cpassword, contactNo, location } =
        credentials;
      if (password !== cpassword) {
        toast.warning('Confirm your password correctly', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        const res = await axios.post(
          `http://localhost:5000/api/auth/createuser`,
          { name, email, contactNo, location, password }
        );
        if (res.data.success) {
          toast.success('User Registered successfully', {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate('/login');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Invaild details', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="signin-section shadow-effect">
      <h2 className="text-success spacing">Register</h2>
      <form className="input-section" onSubmit={handleSignUp}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={credentials.name}
            onChange={onChangeText}
            required={true}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={onChangeText}
            required={true}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Contact No"
            name="contactNo"
            value={credentials.contactNo}
            onChange={onChangeText}
            required={true}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Location"
            name="location"
            value={credentials.location}
            onChange={onChangeText}
            required={true}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onChangeText}
            required={true}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="cpassword"
            className="form-control"
            placeholder="Confirm Password"
            value={credentials.cpassword}
            onChange={onChangeText}
            required={true}
          />
        </div>
        <Link className="sign-link mb-3 align-right" to="/login">
          Already have Account
        </Link>
        <div className="btn-section">
          <button type="submit" className="btn btn-success btn-d">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
