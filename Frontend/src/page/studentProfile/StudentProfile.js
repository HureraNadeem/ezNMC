import React, { useContext } from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import styles from "./studentProfile.module.css";
import vector from "../../Assets/login_vector.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { UserContext } from "../../hooks/UserContext";

function StudentProfile() {
  const [edit, SetEdit] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const { user, setUser, token, setLogged, setToken, setOrderData } =
    useContext(UserContext);

  const [student, setStudent] = React.useState({});

  const logout = () => {
    setToken("");
    setLogged(false);
    setUser({});
    setOrderData([]);
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/students`, {
        headers: { token: token },
      })
      .then((res) => setStudent(res.data.data))
      .catch((error) => {
        if (error.response.status === 401) {
          logout();
        } 
      });
  }, []);

  function inputChanged(e) {
    const value = e.target.value;
    setStudent({ ...student, [e.target.name]: value });
  }

  function editProfile(e) {
    e.preventDefault();
    SetEdit(true);
  }

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .patch(`${process.env.REACT_APP_API_BASE_URL}/students`, student, {
        headers: { token: token },
      })
      .then((res) => {
        setUser({ name: student?.name });
        alert("Student profile updated!");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErr(true);
          setMessage(error.response.data.message);
        } else if (error.response.status === 401) {
          logout();
        } else {
          setErr(true);
          setMessage("Cannot connect to server");
        }
      });
  };

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.image}>
          <img src={vector} alt="med" />
        </div>
        <div className={styles.form}>
          <h2>Student Profile</h2>
          <p>Click on Edit button to enable editing</p>
          <Form className={styles.formContainer}>
            <Form.Group className="mb-3" controlId="formCMS">
              <Form.Label className={styles.label}>CMS ID:</Form.Label>
              <Form.Control
                id="cms"
                name="cms"
                type="text"
                placeholder="CMS ID"
                className={styles.input}
                value={student.CMS}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCNIC">
              <Form.Label className={styles.label}>CNIC Number:</Form.Label>
              <Form.Control
                id="cnic"
                name="cnic"
                type="text"
                placeholder="CNIC"
                className={styles.input}
                value={student.cnic}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className={styles.label}>Name:</Form.Label>
              <Form.Control
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                className={styles.input}
                onChange={inputChanged}
                value={student.name}
                disabled={!edit}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label className={styles.label}>Phone Number:</Form.Label>
              <Form.Control
                id="phone"
                name="phone"
                type="text"
                placeholder="Phone number"
                className={styles.input}
                onChange={inputChanged}
                value={student.phone}
                disabled={!edit}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className={styles.label}>Email:</Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className={styles.input}
                onChange={inputChanged}
                value={student.email}
                disabled={!edit}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className={styles.label}>Password:</Form.Label>
              <Form.Control
                id="password"
                name="password"
                type="text"
                placeholder="Password"
                className={styles.input}
                onChange={inputChanged}
                value={student.password}
                disabled={!edit}
              />
            </Form.Group>

            {err && (
              <Form.Text id="passwordHelpBlock" className={styles.error}>
                {message}
              </Form.Text>
            )}
            <div className={styles.btnGroup}>
              <Button
                variant="custom"
                type="submit"
                className={styles.buttonEdit}
                onClick={editProfile}
              >
                Edit
              </Button>
              <Button
                variant="custom"
                type="submit"
                className={styles.buttonSave}
                onClick={submitForm}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StudentProfile;
