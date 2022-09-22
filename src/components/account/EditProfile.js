import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUser } from '../../reducers/reducers';
import './profile.css';

const EditProfile = () => {
  const userState = useSelector((state) => state.userState.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setvalues] = useState({
    id: '',
    name: '',
    email: '',
    contactNo: '',
    location: '',
  });

  useEffect(() => {
    dispatch(getUser());
    setvalues({
      id: userState?._id,
      name: userState?.name,
      email: userState?.email,
      contactNo: userState?.contactNo,
      location: userState?.location,
    });
    // eslint-disable-next-line
  }, []);

  const onChangeText = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/updateuser/${values.id}`,
        values,
        {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        }
      );
      if (res.data.success) {
        toast.success('User details updated successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Some error occurred', {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error);
      dispatch({ type: 'UPDATE_USER_FAIL' });
    }
  };
  return (
    <div className="card shadow-effect">
      <h2 className="heading-text text-success spacing">Edit Profile</h2>
      <form className="input-section" onSubmit={handleUpdate}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={values.name}
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
            value={values.email}
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
            value={values.contactNo}
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
            value={values.location}
            onChange={onChangeText}
            required={true}
          />
        </div>
        <div className="btn-section">
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
