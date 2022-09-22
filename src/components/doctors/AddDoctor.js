import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DoctorContext from '../../context/doctors/DoctorContext';
import './doctors.css';

const AddDoctor = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      toast.error('Not allowed', {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);
  const context = useContext(DoctorContext);
  const { addDoctor } = context;
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
  const [details, setDetails] = useState(initialState);
  const onchange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit');
    const res = await addDoctor(details);
    if (res) {
      toast.success(`Doctor's details added successfully`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error('Some error occurred try again', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setDetails(initialState);
  };
  return (
    <div className="container-box shadow-effect">
      <h2 className="heading-text text-success spacing">
        Add doctor's details
      </h2>
      <form
        className="form-box"
        onSubmit={handleSubmit}
        onReset={() => {
          setDetails(initialState);
        }}
      >
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
        <button type="submit" className="btn btn-success mr">
          Add
        </button>
        <button type="reset" className="btn btn-danger ">
          Reset
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
