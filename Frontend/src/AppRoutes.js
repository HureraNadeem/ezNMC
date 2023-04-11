import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./page/login/Login";
import SignUp from "./page/signup/SignUp";
import Meds from "./page/meds/Meds";
import MedDetail from "./page/medDetail/MedDetail";
import Doctor from "./page/doctor/Doctor";
import Cart from "./page/cart/Cart";
import Appointment from "./page/appointment/Appointment";
import History from "./page/history/History";
import DoctorProfile from "./page/doctorProfile/DoctorProfile";
import StudentProfile from "./page/studentProfile/StudentProfile";
import AppointmentForm from "./page/appointmentForm/AppointmentForm";
import Order from "./page/order/Order";
import Emergency from "./page/emergency/Emergency";
import { UserContext } from "./hooks/UserContext";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  const { logged, setLogged } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
      </Routes>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
      <Routes>
        <Route exact path="/meds" element={<Meds />} />
      </Routes>
      <Routes>
        <Route
          exact
          path="/meds/:id"
          element={
            <ProtectedRoute>
              <MedDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          exact
          path="/emergency"
          element={
            <ProtectedRoute>
              <Emergency />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          exact
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          exact
          path="/order"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route exact path="/doctor" element={<Doctor />} />
      </Routes>
      <Routes>
        <Route
          exact
          path="/doctor/:id"
          element={
            <ProtectedRoute>
              <AppointmentForm />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Routes>
        <Route
          exact
          path="/appointment"
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          exact
          path="/appointment/:id"
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          exact
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          exact
          path="/doctorProfile"
          element={
            <ProtectedRoute>
              <DoctorProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          exact
          path="/studentProfile"
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
