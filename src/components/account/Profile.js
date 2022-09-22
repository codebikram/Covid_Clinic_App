import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './profile.css';
import { getUser } from '../../reducers/reducers';

const Profile = () => {
  const userState = useSelector((state) => state.userState.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card shadow-effect">
      <img
        src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
        className="profile-img"
        alt="Profile"
        width="120"
        height="120"
      />
      <div className="card-body">
        <div className="card-group">
          <h5 className="card-title">Name: </h5>
          <p className="card-text">{userState?.name}</p>
        </div>
        <div className="card-group">
          <h5 className="card-title">Email: </h5>
          <p className="card-text">{userState?.email}</p>
        </div>
        <div className="card-group">
          <h5 className="card-title">Contact No:</h5>
          <p className="card-text">{userState?.contactNo}</p>
        </div>
        <div className="card-group">
          <h5 className="card-title">Location: </h5>
          <p className="card-text">{userState?.location}</p>
        </div>
        <div className="card-group">
          <h5 className="card-title">DOR: </h5>
          <p className="card-text">
            {!userState.date ? '' : userState.date.slice(0, 10)}
          </p>
        </div>
        <hr />

        <Link className="btn btn-success" to="/edit-profile">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Profile;
