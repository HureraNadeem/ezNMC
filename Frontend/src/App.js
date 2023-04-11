import React from "react";
import { UserContext } from "./hooks/UserContext";
import AppRoutes from "./AppRoutes";

function App() {
  const [user, setUser] = React.useState({});
  const [logged, setLogged] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [orderData, setOrderData] = React.useState([]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logged,
        setLogged,
        token,
        setToken,
        orderData,
        setOrderData,
      }}
    >
      <AppRoutes />
    </UserContext.Provider>
  );
}

export default App;
