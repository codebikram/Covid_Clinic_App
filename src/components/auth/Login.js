import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import './auth.css';
import { handleApi } from '../../reducers/reducers';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();
  const onChangeText = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(handleApi(credentials));
    if (res) {
      toast.success('Logged in successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate('/');
    } else {
      toast.error('Invalid credentials', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="signin-section shadow-effect">
      <h2 className="text-success spacing">Log in</h2>
      <form className="input-section" onSubmit={handleLogin}>
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
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onChangeText}
            required={true}
          />
        </div>
        <p className="align-right mb-1">Forget password?</p>
        <Link className="sign-link mb-3 align-right" to="/register">
          Create New Account
        </Link>
        <div className="btn-section">
          <button type="submit" className="btn btn-success btn-d">
            LOG IN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
