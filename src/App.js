import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import ViewOrders from "../src/pages/ViewOrders"
import AddNewOrder from "./pages/AddNewOrder"
import OrderDetails from "./pages/OrderDetails"
function App() {
  return (
    <div className="App">
      <>
        <Switch>
          <Route path={"/viewOrders"} exact component={ViewOrders} />
          <Route path={"/addNewOrder"} exact component={AddNewOrder} />
          <Route
            path={"/orderDetails/:orderDetails"}
            exact
            component={OrderDetails}
          />
          <Route path={"*"} exact component={ViewOrders} />
          <Redirect path={"/"} />
        </Switch>
      </>
    </div>
  );
}

export default App;
