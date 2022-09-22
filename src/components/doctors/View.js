import React from 'react';
import femaleDoctorImage from '../../images/female.jpg';
import maleDoctorImage from '../../images/male.jpg';
const View = ({ viewDoctor, handleLaunchModel }) => {
  const {
    gender,
    name,
    contactNo,
    email,
    availability,
    qualification,
    specialization,
    yoe,
    location,
    startTime,
    endTime,
    address,
  } = viewDoctor;
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5 col-md-6 mb-4">
          <div className="shadow-effect p-2">
            <img
              src={` ${
                gender?.toLowerCase() === 'male'
                  ? maleDoctorImage
                  : femaleDoctorImage
              }`}
              className="card-img-top"
              alt="Doctor"
            />
            <div className="card-body">
              <h5 className="card-title">Dr.{name}</h5>
              <p className="card-text">
                <i class="bi bi-telephone-fill text-success"></i> {contactNo}
              </p>
              <p className="card-text">
                <i class="bi bi-envelope-fill text-danger"></i> {email}
              </p>
              <p class="badge bg-danger mt-3" style={{ fontSize: '16px' }}>
                {availability}
              </p>
              <hr />
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-md-6 mb-4">
          <div className="shadow-effect p-2">
            <div className="card-body flex-dc ">
              <p className="card-text" style={{ fontWeight: '600' }}>
                Specialization
              </p>
              <p className="card-text">{specialization} </p>
              <hr />
              <p className="card-text" style={{ fontWeight: '600' }}>
                Qualification
              </p>
              <p className="card-text">{qualification} </p>
              <hr />
              <p className="card-text" style={{ fontWeight: '600' }}>
                Exprience
              </p>
              <p className="card-text">{yoe} years</p>
              <hr />
              <p className="card-text" style={{ fontWeight: '600' }}>
                Address
              </p>
              <p className="card-text">{address}</p>
              <hr />
              <p className="card-text" style={{ fontWeight: '600' }}>
                Location
              </p>
              <p className="card-text">{location}</p>
              <hr />
              <p className="card-text" style={{ fontWeight: '600' }}>
                Time
              </p>
              <p className="card-text">
                {startTime} to {endTime}
              </p>
              <hr />
              <button
                type="button"
                className="btn btn-danger ml-a"
                onClick={handleLaunchModel}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
