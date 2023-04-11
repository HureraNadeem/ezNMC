const express = require("express");
const morgan = require("morgan");
const medicineRouter = require("./routes/medicinesRoutes");
const appointmentRouter = require("./routes/appointmentsRoute");
const appointmentsHistoryRouter = require("./routes/appointmentsHistoryRoute");
const doctorRouter = require("./routes/doctorsRoute");
const errorController = require("./controllers/errorController");
const authRouter = require("./routes/authRouters")
const orderRoutes = require("./routes/orderRoutes")
const studentRoute = require("./routes/studentRoute")
const doctorInfoRoutes = require("./routes/doctorInfoRoutes")
const emergencyAppointmentsRoutes = require("./routes/emergencyAppointmentsRoutes")
const cors = require('cors')

const app = express();

// Middlewares
app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use("/api/v1/medicines", medicineRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/appointments-history", appointmentsHistoryRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/students", studentRoute);
app.use("/api/v1/doctors-info", doctorInfoRoutes);
app.use("/api/v1/emergency-appointments", emergencyAppointmentsRoutes);


app.use(errorController)

module.exports = app;