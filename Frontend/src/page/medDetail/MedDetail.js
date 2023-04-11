import React from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import styles from "./medDetail.module.css";

import panadol from "../../Assets/panadol.jpg";
import Button from "react-bootstrap/Button";
import Store from "../../Assets/store_white.png";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";

import { useNavigate } from "react-router-dom";

function MedDetail() {
  const id = useParams()["id"];
  const navigate = useNavigate();

  const [data, setData] = React.useState({});
  const [err, setErr] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);
  const [disableButton, setDisableButton] = React.useState(true);
  const { orderData, setOrderData, token, setToken, setLogged, setUser } =
    useContext(UserContext);

  const logout = () => {
    setToken("");
    setLogged(false);
    setUser({});
    setOrderData([]);
  };

  React.useEffect(() => {
    quantity === 0 ? setDisableButton(true) : setDisableButton(false);
  }, [quantity, disableButton]);

  const [quantityToSendToContext, setQuantityToSendToContext] = React.useState(
    {}
  );

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/medicines/${id}`, {
        headers: { token: token },
      })
      .then((res) => {
        setQuantityToSendToContext(res.data.data["availableQuantity"]);

        const newArr = [...orderData];

        for (let i = 0; i < newArr.length; i++) {
          const element = newArr[i];
          if (element.itemId === id) {
            res.data.data["availableQuantity"] =
              parseInt(res.data.data?.availableQuantity) -
              parseInt(element.quantity);
            
            break;
          }
        }
        return setData(res.data.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logout();
        } else {
          setErr(true);
        }
      });
  }, [id]);

  const changeQuantity = (e) => {
    if (e.target.value > data.availableQuantity) {
      setQuantity(data.availableQuantity);
    } else {
      setQuantity(e.target.value);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const newArr = [...orderData];

    var found = false;
    for (let i = 0; i < newArr.length; i++) {
      const element = newArr[i];
      if (element.itemId === id) {

        if (parseInt(quantity) > data.availableQuantity) {
          if (
            window.confirm(
              `Only ${data.availableQuantity} items are available. Do you want to continue with this max we can provide?`
            )
          ) {
            element.quantity = data.availableQuantity;
          }
        } else {
          element.quantity = parseInt(element.quantity) + parseInt(quantity);
        }
        setOrderData(newArr);
        found = true;
        break;
      }
    }

    if (!found) {
      newArr?.push({
        itemId: id,
        quantity: parseInt(quantity),
        name: data.name,
        dosage: data.doseEachMedicine,
        price: data.price,
        quantity: parseInt(quantity),
        availableQuantity: parseInt(quantityToSendToContext),
      });
      setOrderData(newArr);
    }
    alert("Added to cart!");
    navigate("/meds", { replace: true });
  };

  console.log(orderData);

  return (
    <>
      <Header />
      {alert && (
        <Alert variant="secondary">This is a alert—check it out!</Alert>
      )}

      <div className={styles.container}>
        {err ? (
          <div>No Item Found</div>
        ) : (
          <>
            <div className={styles.img}>
              <img src={data.samplePicture} alt="panadol" />
            </div>
            <div className={styles.info}>
              <h1>{data.name}</h1>
              <h3>Rs.{data.price}</h3>
              <h5>
                <span>Dosage: </span>
                {data.doseEachMedicine}
              </h5>
              <h5>
                <span>Manufacturer: </span>
                {data.company}
              </h5>

              <p>{data.description}</p>
              <div className={styles.bottom}>
                <Form>
                  <Form.Group
                    className={styles.quantity}
                    controlId="formQuantity"
                  >
                    <h5>Quantity: </h5>
                    <Form.Control
                      id="quantity"
                      name="quantity"
                      type="number"
                      min={1}
                      max={data.availableQuantity}
                      value={quantity}
                      onChange={changeQuantity}
                      className={styles.input}
                    />
                  </Form.Group>
                </Form>
                <Link to={disableButton ? `` : "/meds"}>
                  <Button
                    variant="custom"
                    className={styles.button}
                    onClick={handleAddToCart}
                    disabled={disableButton}
                  >
                    Add to Cart
                    <img src={Store} alt="store icon" />
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MedDetail;
