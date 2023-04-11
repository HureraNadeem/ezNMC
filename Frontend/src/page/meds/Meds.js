import React from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import Card from "react-bootstrap/Card";
import styles from "./meds.module.css";
import panadol from "../../Assets/panadol.jpg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

function Meds() {
  const [data, setData] = React.useState([]);
  const [err, setErr] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/medicines`)
      .then((res) => setData(res.data.data))
      .catch((error) => {
        setErr(true);
      });
  }, []);

  return (
    <>
      <Header />
      <hr />
      <h1>Medicines</h1>
      <div className={styles.container}>
        {err ? (
          <div>No Item Found</div>
        ) : (
          data?.map((item, index) => (
            <Card className={styles.card} key={index}>
              <Card.Img
                variant="top"
                src={item.samplePicture}
                className={styles.img}
              />
              <Card.Body className={styles.top}>
                <Card.Title className={styles.title}>{item.name}</Card.Title>
                <Card.Text>
                  <span>Manufacturer:</span> {item.company}
                </Card.Text>
                <Card.Text>
                  <span>Dosage:</span> {item.doseEachMedicine}
                </Card.Text>
              </Card.Body>
              <Card.Body className={styles.bottom}>
                <Card.Text>Rs.{item.price}</Card.Text>
                <Link to={`/meds/${item._id}`}>
                  <Button className={styles.button} variant="custom">
                    View Details
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default Meds;
