import { useState } from 'react';
import AppointmentContext from './AppointmentContext';
import axios from 'axios';

const AppointState = ({ children }) => {
  const host = 'http://localhost:5000';
  const [appoints, setAppoints] = useState([]);

  const bookAppointment = async (data) => {
    try {
      const res = await axios.post(`${host}/api/appointment/add`, data, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      console.log(res.data.data);
      return res.data.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const fetchAllAppoints = async () => {
    try {
      const res = await axios.get(`${host}/api/appointment/fetchAll`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      // console.log(res.data.data);
      setAppoints(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserAppoints = async () => {
    try {
      const res = await axios.get(`${host}/api/appointment/fetchAppoints`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      // console.log(res.data.data);
      setAppoints(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAppointment = async (id) => {
    try {
      const res = await axios.delete(
        `${host}/api/appointment/deleteAppoint/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        }
      );
      console.log(res.data.data);
      const newList = appoints.filter((appoint) => {
        return appoint._id !== id;
      });
      setAppoints(newList);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <AppointmentContext.Provider
      value={{
        appoints,
        bookAppointment,
        fetchAllAppoints,
        fetchUserAppoints,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
export default AppointState;
