import React from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import Card from "react-bootstrap/Card";
import styles from "./doctor.module.css";
import doctor from "../../Assets/doctor.png";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

function Doctor() {
  const [data, setData] = React.useState([]);
  const [err, setErr] = React.useState(false);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/doctors`)
      .then((res) => setData(res.data.data))
      .catch((error) => {
        setErr(true);
      });
  }, []);
  return (
    <>
      <Header />
      <hr />
      <h1>Doctors</h1>
      <div className={styles.container}>
        {err ? (
          <div>No Item Found</div>
        ) : (
          data?.map((item, index) => (
            <Card className={styles.card} key={index}>
              <Card.Body className={styles.top}>
                <div className={styles.profile}>
                  <div className={styles.img}>
                    <img variant="top" src={doctor} alt="doctor" />
                  </div>

                  <div className={styles.text}>
                    <Card.Title className={styles.title}>
                      Dr. {item.name}
                    </Card.Title>
                    <p>
                      {item.qualification} <br /> {item.fieldOfSpeciality}
                    </p>
                  </div>
                </div>
              </Card.Body>
              <div className={styles.bottom_container}>
                <div className={styles.bottom}>
                  <Card.Text>
                    <span>Doctor Timings:</span>
                    <br />
                    {item.timings.toString()}
                  </Card.Text>
                </div>
                <Link to={`/doctor/${item._id}`}>
                  <Button variant="custom" className={styles.button}>
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default Doctor;
