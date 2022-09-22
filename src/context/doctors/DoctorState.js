import { useState } from 'react';
import DoctorContext from './DoctorContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorState = (props) => {
  const navigate = useNavigate();
  const host = 'http://localhost:5000';
  const intialState = [];
  const [doctors, setDoctors] = useState(intialState);
  const [viewDoctor, setViewDoctor] = useState({});
  // get all note function
  const getDoctorsList = async () => {
    try {
      const res = await axios.get(`${host}/api/doctor/fetchdoctors`);
      setDoctors(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Add doctor function
  const addDoctor = async (data) => {
    try {
      const res = await axios.post(`${host}/api/doctor/add`, data, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      console.log(res.data.data);
      // setDoctors([...doctors, res.data.data]);
      return res.data.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // //edit note function
  const updateDoctorDetails = async (details) => {
    try {
      const res = await axios.put(
        `${host}/api/doctor/update/${details._id}`,
        details,
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        }
      );
      let updateData = doctors.map((d) => {
        if (d._id === details._id) {
          d.name = details.name;
          d.email = details.email;
          d.gender = details.gender;
          d.location = details.location;
          d.availability = details.availability;
          d.contactNo = details.contactNo;
          d.yoe = details.yoe;
          d.address = details.address;
          d.specialization = details.specialization;
          d.qualification = details.qualification;
          d.startTime = details.startTime;
          d.endTime = details.endTime;
        }
        return d;
      });
      setDoctors(updateData);
      return res.data.success;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  //delete note function
  const deleteDoctor = async (id) => {
    try {
      const res = await axios.delete(`${host}/api/doctor/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      console.log(res.data.data);
      const newList = doctors.filter((doctor) => {
        return doctor._id !== id;
      });
      setDoctors(newList);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleView = (currentDoctor) => {
    setViewDoctor(currentDoctor);
    navigate('/view-profile');
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        addDoctor,
        getDoctorsList,
        deleteDoctor,
        updateDoctorDetails,
        handleView,
        viewDoctor,
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorState;
