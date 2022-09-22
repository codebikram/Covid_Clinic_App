import { Routes, Route } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';
import NavBar from './components/nav/NavBar';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Profile from './components/account/Profile';
import EditProfile from './components/account/EditProfile';
import Footer from './components/footer/Footer';
import DoctorList from './components/doctors/DoctorList';
import ViewProfile from './components/doctors/ViewProfile';
import AddDoctor from './components/doctors/AddDoctor';
import AppointState from './context/appointments/AppointState';
import ViewAppoint from './components/appointment/ViewAppoint';
import Treatment from './components/treatments/Treatment';

function App() {
  return (
    <>
      <AppointState>
        <NavBar title="Covid Clinic" />
        <div className="container">
          <Routes>
            <Route path="/" element={<DoctorList />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/view-profile" element={<ViewProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/treatments" element={<Treatment />} />
            <Route path="/appointments" element={<ViewAppoint />} />
          </Routes>
          <ToastContainer transition={Flip} autoClose={1700} />
        </div>
        <Footer />
      </AppointState>
    </>
  );
}

export default App;
