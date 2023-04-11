import React from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import styles from "./cart.module.css";
import Button from "react-bootstrap/Button";
import panadol from "../../Assets/panadol.jpg";
import trash from "../../Assets/trash.png";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";

function Cart() {
  const { orderData, setOrderData } = useContext(UserContext);
  const [totalBill, setTotalBill] = React.useState(0);

  const handleRemoveFromCart = (itemId) => {
    if (window.confirm("Item will be removed from the cart!")) {
      let remainArr = orderData.filter((item) => item.itemId !== itemId);
      setOrderData(remainArr);
    }
  };

  const handleQuantityChange = (item, e) => {
    if (e.target.value > item.availableQuantity) {
      if (
        window.confirm(
          `Only ${item.availableQuantity} items are available. Do you want to continue with this max we can provide?`
        )
      ) {
        e.target.value = item.availableQuantity;
      }
    }
    const val = e.target.value;
    let tempData = [...orderData];

    for (let i = 0; i < tempData.length; i++) {
      const element = tempData[i];
      if (element.itemId === item.itemId) {
        tempData[i]["quantity"] = val;
        setOrderData(tempData);
      }
    }
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

      <h1 className={styles.title}>Cart</h1>
      <div className={styles.container}>
        <div className={styles.cart}>
          <div className={styles.table}>
            <h4 className={styles.productTable}>Product</h4>
            <h4>Quantity</h4>
            <h4>Price</h4>
            <h4>Remove</h4>
          </div>
          <hr />

          {orderData.length > 0 ? (
            <>
              {orderData.map((item, index) => {
                return (
                  <>
                    <div className={styles.card}>
                      <div className={styles.product}>
                        <img src={panadol} alt="item" className={styles.img} />

                        <div className={styles.text}>
                          <h4>{item.name}</h4>
                          <h6>{item.dosage}</h6>
                        </div>
                      </div>

                      <Form.Group
                        controlId="formQuantity"
                        className={styles.quantity}
                      >
                        <p>Quantity:</p>
                        <Form.Control
                          id="quantity"
                          name="quantity"
                          type="number"
                          min="1"
                          max={item.availableQuantity}
                          value={item.quantity}
                          className={styles.input}
                          onChange={(e) => handleQuantityChange(item, e)}
                        />
                      </Form.Group>
                      <h5 className={styles.price}>
                        Rs. {`${item.quantity} x ${item.price}`}
                      </h5>

                      <Button
                        className={styles.button}
                        variant="custom"
                        onClick={() => handleRemoveFromCart(item.itemId)}
                      >
                        <img src={trash} alt="trash" className={styles.logo} />
                      </Button>
                    </div>
                    <hr />
                  </>
                );
              })}
            </>
          ) : (
            <h3>No item added in cart!</h3>
          )}

          <div className={styles.total}>
            <h2>
              <span>Total: </span>Rs. {totalBill}
            </h2>
            <Link to="/order">
              <Button className={styles.checkout} variant="custom">
                Proceed To Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
