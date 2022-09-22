import React, { useContext, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppointmentContext from '../../context/appointments/AppointmentContext';
import DoctorContext from '../../context/doctors/DoctorContext';
import './doctors.css';
import View from './View';

const ViewProfile = () => {
  const userState = useSelector((state) => state.userState.userData);
  const context = useContext(DoctorContext);
  const { viewDoctor } = context;
  const appoinmentContext = useContext(AppointmentContext);
  const { bookAppointment } = appoinmentContext;
  const navigate = useNavigate();
  const open = useRef(null);
  const close = useRef(null);
  const [details, setDetails] = useState({
    patientId: '',
    doctorName: '',
    date: '',
    time: '',
    patientName: '',
  });
  useEffect(() => {
    setDetails({
      ...details,
      doctorName: viewDoctor.name,
      patientName: userState.name,
      patientId: userState._id,
    });
    // eslint-disable-next-line
  }, []);

  const onChangeText = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleLaunchModel = () => {
    if (localStorage.getItem('token')) {
      open.current.click();
    } else {
      toast.warning(`You need to login first`, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate('/login');
    }
  };

  const handleBook = async () => {
    close.current.click();
    const res = await bookAppointment(details);
    setDetails({
      ...details,
      date: '',
      time: '',
    });
    if (res) {
      toast.success(`Appointment booked successfully`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error('Some error occurred try again', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: 'none' }}
        ref={open}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-success spacing"
                id="exampleModalLabel"
              >
                Book an Appointment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={close}
              ></button>
            </div>
            <div className="modal-body">
              <form className="form-box">
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="doctorName"
                    value={details.doctorName}
                    required={true}
                    readOnly
                    onChange={onChangeText}
                  />
                  <label for="floatingInput">Doctor's Name</label>
                </div>
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="patientName"
                    value={details.patientName}
                    required={true}
                    onChange={onChangeText}
                  />
                  <label for="floatingInput">Patient's Name</label>
                </div>
                <div className="form-floating mb-2">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter date"
                    name="date"
                    value={details.date}
                    required={true}
                    onChange={onChangeText}
                  />
                  <label for="floatingInput">Appointment Date</label>
                </div>
                <div className="form-floating mb-2">
                  <input
                    type="time"
                    className="form-control"
                    placeholder="Enter Name"
                    name="time"
                    value={details.time}
                    required={true}
                    onChange={onChangeText}
                  />
                  <label for="floatingInput">Appointment Time</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleBook}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
      <View viewDoctor={viewDoctor} handleLaunchModel={handleLaunchModel} />;
    </>
  );
};

export default ViewProfile;
