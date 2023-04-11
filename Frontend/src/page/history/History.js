import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useContext } from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import styles from "./history.module.css";
import axios from "axios";
import { UserContext } from "../../hooks/UserContext";
import { Link } from "react-router-dom";
function History() {
  const [data, setData] = React.useState([]);
  const [err, setErr] = React.useState(false);

  const { token, setToken, setUser, setLogged, setOrderData } =
    useContext(UserContext);

  const logout = () => {
    setToken("");
    setLogged(false);
    setUser({});
    setOrderData([]);
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/appointments-history`, {
        headers: { token: token },
      })
      .then((res) => setData(res.data.data))
      .catch((error) => {
        if (error.response.status === 401) {
          logout();
        } else {
         
          setErr(true);
        }
      });
  }, []);


  return (
    <>
      <Header doctor={true} />

      <h1 className={styles.title}>Past Appoinments</h1>
      <div className={styles.container}>
        {err ? (
          <div>No Item Found</div>
        ) : (
          data?.map((item, index) => (
            <Card className={styles.card} key={index}>
              <Card.Header className={styles.appoint}>
                Appointment {index + 1}
              </Card.Header>
              <Card.Body>
                <Card.Title className={styles.heading}>
                  Appointment Details:
                </Card.Title>
                <Card.Text className={styles.text}>
                  <span>Time:</span> {item.timing}
                </Card.Text>
                <Card.Text>{item.description}</Card.Text>
                <Card.Title className={styles.heading}>
                  Patient Details:
                </Card.Title>
                <Card.Text className={styles.text}>
                  <span>Name:</span> {item.studentDetails.name}
                </Card.Text>
                <Card.Text className={styles.text}>
                  <span>CMS ID:</span> {item.studentDetails.CMS}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
      <Footer doctor={true} />
    </>
  );
}

export default History;
