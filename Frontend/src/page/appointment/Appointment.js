import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useContext } from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import styles from "./appointment.module.css";
import axios from "axios";
import { UserContext } from "../../hooks/UserContext";
import { Link, useNavigate } from "react-router-dom";

function Appointment() {
  const [data, setData] = React.useState([]);
  const [err, setErr] = React.useState(false);
  const navigate = useNavigate();
  const { token, setToken, setUser, setLogged, setOrderData } =
    useContext(UserContext);
  const [fetched, setFetched] = React.useState(false);
  // const [fetchedCount, setFetchedCount] = React.useState(0);

  const logout = () => {
    setToken("");
    setLogged(false);
    setUser({});
    setOrderData([]);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const markAsDone = React.useCallback((id) => {
    
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/appointments/mark-as-done/${id}`,
        { headers: { token: token } }
      )
      .then((res) => alert("Appointment has been marked done"))
      .catch((error) => {
        if (error.response.status === 401) {
          logout();
        } 
      });
    setFetched(false);
  });

  React.useEffect(() => {
    if (!fetched) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/appointments`, {
          headers: { token: token },
        })
        .then((res) => {
          setData(res.data.data);
        })

        .catch((error) => {
          setErr(true);
          if (error.response.status === 401) {
            logout();
          } 
        });
      setFetched(true);
    }
  }, [data, markAsDone]);

  return (
    <>
      <Header doctor={true} />
      <h1 className={styles.title}>Pending Appoinments</h1>
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
                  <span>Time: </span>
                  {item.timing}
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
                <div className={styles.btnContainer}>
                  <Button
                    variant="custom"
                    className={styles.button}
                    onClick={() => markAsDone(item._id)}
                  >
                    Mark as Done
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
      <Footer doctor={true} />
    </>
  );
}

export default Appointment;
