import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AlumniRegister from './components/Loginpages/AlumniRegister';
import Register from './components/Loginpages/Register';
import StudentRegister from './components/Loginpages/StudentRegister';
import AdminLogin from './components/Loginpages/AdminLogin';
import AlumniLogin from './components/Loginpages/AlumniLogin';
import InstituiteRegister from './components/Loginpages/InstituiteRegister';
import StudentLogin from './components/Loginpages/StudentLogin';
import AdminDashboard from './pages/AdminPages/AdminDashboard';
import AlumniDashboard from './pages/AlumniPages/AlumniDashboard';
import CreatePost from './components/AlumniDashboard/CreatePost';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/alumni-register' element={<AlumniRegister/>} />
        <Route path='/alumni-login' element={<AlumniLogin/>} />
        <Route path='/student-register' element={<StudentRegister/>} />
        <Route path='/student-login' element={<StudentLogin/>} />
        <Route path='/admin-register' element={<InstituiteRegister/>} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin/:adminId' element={<AdminDashboard/>} />
        <Route path='/alumni/:alumniId' element={<AlumniDashboard/>} />
        <Route path='/alumni/post/:author' element={<CreatePost/>} />
      </Routes>
    </div>
  )
}

export default App;