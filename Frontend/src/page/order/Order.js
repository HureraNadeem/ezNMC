import React from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import styles from "./order.module.css";
import vector from "../../Assets/login_vector.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";

function Order() {
  const navigate = useNavigate();

  const { token, orderData, setOrderData, setToken, setLogged, setUser } =
    useContext(UserContext);
  const [totalBill, setTotalBill] = React.useState(0);
  const [addressInputValue, setAddressInputValue] = React.useState("");
  const [disableButton, setDisableButton] = React.useState(true);

  const logout = () => {
    setToken("");
    setLogged(false);
    setUser({});
    setOrderData([]);
  };

  const handleAddress = (e) => {
    if (disableButton !== "") {
      setDisableButton(false);
    }
    if (disableButton === "") {
      setDisableButton(true);
    }
    setAddressInputValue(e.target.value);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/orders`,
        { deliveryAddress: addressInputValue, items: orderData },
        { headers: { token: token } }
      )
      .then((res) => {
        
        
        alert("Order has been placed!");
        navigate("/meds");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logout();
        } 
      });
  };

  React.useEffect(() => {
    let total = 0;

    for (let i = 0; i < orderData.length; i++) {
      const element = orderData[i];
      let temp = parseInt(element.price) * parseInt(element.quantity);
      total += temp;
    }

    setTotalBill(total);
  }, [orderData, setTotalBill]);

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.image}>
          <img src={vector} alt="med" />
        </div>
        <div className={styles.form}>
          <h2>Order Medicine</h2>
          <p>Provide details to order the medicine</p>
          <Form className={styles.formContainer}>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label className={styles.label}>Total Amount:</Form.Label>
              <Form.Control
                id="amount"
                name="amount"
                type="text"
                placeholder="Amount"
                className={styles.input}
                value={totalBill}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCMS">
              <Form.Label className={styles.label}>Address:</Form.Label>
              <Form.Control
                id="address"
                name="address"
                type="text"
                placeholder="Address"
                className={styles.input}
                required
                onChange={handleAddress}
                value={addressInputValue}
              />
            </Form.Group>

            <Button
              variant="custom"
              type="submit"
              className={styles.buttonSave}
              onClick={handlePlaceOrder}
              disabled={disableButton}
            >
              Place Order
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Order;
