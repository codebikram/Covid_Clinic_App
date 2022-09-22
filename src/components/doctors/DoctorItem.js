import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import DoctorContext from '../../context/doctors/DoctorContext';
import femaleDoctorImage from '../../images/female.jpg';
import maleDoctorImage from '../../images/male.jpg';
import './doctors.css';
import { confirmAlert } from 'react-confirm-alert';

const DoctorItem = ({ doctor, updateDoctor }) => {
  const context = useContext(DoctorContext);
  const { deleteDoctor, handleView } = context;
  const {
    gender,
    name,
    _id,
    availability,
    qualification,
    specialization,
    yoe,
    endTime,
    startTime,
  } = doctor;

  const handleDelete = async () => {
    confirmAlert({
      title: 'Confirm to delete details',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const res = await deleteDoctor(_id);
            if (res) {
              toast.success(`Doctor's details deleted successfully`, {
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
  const handleEdit = () => {
    // console.log('edit Clicked');
    updateDoctor(doctor);
  };

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="shadow-effect p-2 position-relative hover-effect">
        <img
          src={` ${
            gender?.toLowerCase() === 'male'
              ? maleDoctorImage
              : femaleDoctorImage
          }`}
          className="card-img-top"
          alt="Doctor"
          onClick={() => {
            handleView(doctor);
          }}
        />
        <p class="badge bg-danger position-absolute top-rigth">
          {availability}
        </p>
        <div className="card-body flex-dc">
          <h5 className="card-title text-success" style={{ fontWeight: '600' }}>
            Dr.{name}
          </h5>
          <p class="card-text">{specialization}</p>
          <p class="card-text">{qualification}</p>
          <p class="card-text">{yoe} years of exprience</p>
          <p class="card-text" style={{ fontSize: '18px' }}>
            {startTime} to {endTime}
          </p>
          <button
            className="view-btn mr-a"
            onClick={() => {
              handleView(doctor);
            }}
          >
            View Profile &rarr;
          </button>
          <hr />
          {localStorage.getItem('role') === 'admin' && (
            <div className="ml-a">
              <button className="btn btn-success mr" onClick={handleEdit}>
                <i class="bi bi-pencil"></i>
              </button>
              <button className="btn btn-danger " onClick={handleDelete}>
                <i class="bi bi-trash"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

//
//
export default DoctorItem;
