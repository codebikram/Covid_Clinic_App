import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import AppointmentContext from '../../context/appointments/AppointmentContext';
import './appoint.css';

const ViewAppoint = () => {
  const appointment = useContext(AppointmentContext);
  const navigate = useNavigate();
  const { fetchAllAppoints, appoints, fetchUserAppoints, deleteAppointment } =
    appointment;

  useEffect(() => {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('role') === 'admin'
    ) {
      fetchAllAppoints();
    } else if (
      localStorage.getItem('token') &&
      localStorage.getItem('role') === 'patient'
    ) {
      fetchUserAppoints();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const handleCancel = (e) => {
    confirmAlert({
      title: 'Cancel your appointment',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            let id = e.target.value;
            const res = await deleteAppointment(id);
            if (res) {
              toast.success(`Your appointment canceled successfully`, {
                position: toast.POSITION.TOP_CENTER,
              });
            } else {
              toast.error('Some error occurred try again', {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
            return;
          },
        },
      ],
    });
  };
  return (
    <>
      {localStorage.getItem('role') === 'admin' ? (
        <h2 className="text-center text-success spacing mb-4">
          Patient's Appointment List
        </h2>
      ) : (
        <h2 className="text-center text-success spacing mb-4">
          Your Appointments
        </h2>
      )}

      {appoints.map((appoint) => {
        return (
          <div
            className="shadow-effect p-2 mb-3 hover-effect"
            key={appoint._id}
          >
            <div className="card-body flex-dc">
              <div className="row">
                <div className="col-lg-6">
                  <div className="card-group-item p-1">
                    <h5 className="card-title m-0 ">Doctor's Name:</h5>
                    <p className="card-text">Dr.{appoint.doctorName}</p>
                  </div>

                  <div className="card-group-item p-1">
                    <h5 className="card-title m-0 ">Date:</h5>
                    <p className="card-text">
                      <i class="bi bi-calendar-fill text-success"></i>{' '}
                      {appoint.date}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card-group-item p-1">
                    <h5 className="card-title m-0 ">Patient's Name:</h5>
                    <p className="card-text">{appoint.patientName}</p>
                  </div>
                  <div className="card-group-item p-1">
                    <h5 className="card-title m-0">Time: </h5>
                    <p className="card-text">
                      <i class="bi bi-clock-fill text-success"></i>{' '}
                      {appoint.time}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <button
                className="btn btn-danger ml-a"
                value={appoint._id}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ViewAppoint;
