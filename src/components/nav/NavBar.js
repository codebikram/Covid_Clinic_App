import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import logo from '../../images/logo.png';

const NavBar = (props) => {
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
    toast.success('User Logged out successfully', {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" height={30} width={35} /> {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {localStorage.getItem('role') === 'admin' && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/add-doctor' ? 'active' : ''
                  }`}
                  aria-current="page"
                  to="/add-doctor"
                >
                  Add Doctor
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/appointments' ? 'active' : ''
                }`}
                aria-current="page"
                to="/appointments"
              >
                Appointments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/treatments' ? 'active' : ''
                }`}
                aria-current="page"
                to="/treatments"
              >
                Treatments
              </Link>
            </li>
            {!localStorage.getItem('token') ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === '/login' ? 'active' : ''
                    }`}
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === '/register' ? 'active' : ''
                    }`}
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i
                      className="bi bi-person-circle"
                      style={{ fontSize: '20px' }}
                    ></i>
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i class="bi bi-person text-success"></i> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/edit-profile">
                        <i class="bi bi-pencil text-success"></i> Edit Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <span className="dropdown-item" onClick={handleLogOut}>
                        <i class="bi bi-box-arrow-right text-danger"></i> Logout
                      </span>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
