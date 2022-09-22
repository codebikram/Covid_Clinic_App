import React, { useContext, useEffect, useRef, useState } from 'react';
import DoctorContext from '../../context/doctors/DoctorContext';
import DoctorItem from './DoctorItem';
import { toast } from 'react-toastify';
import './doctors.css';

const DoctorList = () => {
  let initialState = {
    name: '',
    email: '',
    gender: '',
    location: '',
    contactNo: '',
    availability: '',
    yoe: '',
    address: '',
    specialization: '',
    qualification: '',
    startTime: '',
    endTime: '',
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  const context = useContext(DoctorContext);
  const { doctors, getDoctorsList, updateDoctorDetails } = context;
  const [details, setDetails] = useState(initialState);
  useEffect(() => {
    getDoctorsList();

    // eslint-disable-next-line
  }, []);

  const handleUpdate = async () => {
    refClose.current.click();
    const res = await updateDoctorDetails(details);
    if (res) {
      toast.success(`Doctor's details updated successfully`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error('Some error occurred try again', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const onchange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const updateDoctor = (currentDoctor) => {
    ref.current.click();
    setDetails(currentDoctor);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: 'none' }}
        ref={ref}
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
                Update Doctor's Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body">
              <form className="form-box">
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="name"
                    value={details.name}
                    onChange={onchange}
                    required={true}
                  />
                  <label for="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-2">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    value={details.email}
                    onChange={onchange}
                    required={true}
                  />
                  <label for="floatingInput">Email</label>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-floating mb-2">
                      <select
                        className="form-select"
                        name="gender"
                        onChange={onchange}
                        required={true}
                        value={details.gender}
                      >
                        <option selected>Select Here</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                      <label for="floatingInput">Gender</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-floating mb-2">
                      <select
                        className="form-select"
                        name="location"
                        onChange={onchange}
                        required={true}
                        value={details.location}
                      >
                        <option selected>Select Here</option>
                        <option>Mumbai</option>
                        <option>Kolkata</option>
                        <option>Chennai</option>
                        <option>Bangaloar</option>
                        <option>Delhi</option>
                      </select>
                      <label for="floatingInput">Location</label>
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Qualification"
                    name="qualification"
                    value={details.qualification}
                    onChange={onchange}
                    required={true}
                  />
                  <label for="floatingInput">Qualification</label>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-floating mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Specialization"
                        name="specialization"
                        onChange={onchange}
                        required={true}
                        value={details.specialization}
                      />
                      <label for="floatingInput">Specialization</label>
                    </div>

                    <div className="form-floating mb-2">
                      <select
                        className="form-select"
                        name="availability"
                        onChange={onchange}
                        required={true}
                        value={details.availability}
                      >
                        <option selected>Select Here</option>
                        <option>Available</option>
                        <option>Not Available</option>
                      </select>
                      <label for="floatingInput">Availability</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-floating mb-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Contact No"
                        name="contactNo"
                        onChange={onchange}
                        value={details.contactNo}
                        required={true}
                      />
                      <label for="floatingInput">Contact No</label>
                    </div>
                    <div className="form-floating mb-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter yoe"
                        name="yoe"
                        value={details.yoe}
                        onChange={onchange}
                        required={true}
                      />
                      <label for="floatingInput">Years of exprience</label>
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Address"
                    name="address"
                    onChange={onchange}
                    required={true}
                    value={details.address}
                  />
                  <label for="floatingInput">Address</label>
                </div>
                <label for="floatingInput" className="mb-1">
                  Timing
                </label>
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-floating mb-2">
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Start Time"
                        name="startTime"
                        onChange={onchange}
                        required={true}
                        value={details.startTime}
                      />
                      <label for="floatingInput">Start</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-floating mb-2">
                      <input
                        type="time"
                        className="form-control"
                        placeholder="End Time"
                        name="endTime"
                        onChange={onchange}
                        required={true}
                        value={details.endTime}
                      />
                      <label for="floatingInput">End</label>
                    </div>
                  </div>
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
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {doctors.map((doctor) => {
            return (
              <DoctorItem
                doctor={doctor}
                key={doctor._id}
                updateDoctor={updateDoctor}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DoctorList;
