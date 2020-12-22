import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function ViewOrders() {
  const [orderList, setOrderList] = useState([]);
  let history = useHistory();
  const fetchOrderList = async () => {
    try {
      const tempOrdList = await axios.get(`http://localhost:4000/orders`);
      setOrderList(tempOrdList.data.allOrders);
      console.log(tempOrdList);
      console.log(orderList);
    } catch (error) {
      console.log({ "fetch order list error": error.message });
    }
  };
  const toDetails = (e) => {
    console.log(e.currentTarget.id)
    history.push(`/orderDetails/${e.currentTarget.id}`);
  }
  const showOrderList = () => {
    if (orderList.length > 0) {
      return (
        <>
          <table id="emp" className="table table-bordered">
            <tr>
              <th>Order Id</th>
              <th>Service Number</th>
              <th>Segment Group</th>
              <th>Product Name</th>
              <th>Order Status</th>
              <th>State</th>
            </tr>
            {orderList.map((order) => {
              return (
                <>
                  <tr id={order._id} onClick={toDetails}>
                    <td>{order.orderId}</td>
                    <td>{order.serviceNo}</td>
                    <td>{order.segment}</td>
                    <td>{order.productName}</td>
                    <td>{order.status}</td>
                    <td>{order.state}</td>
                  </tr>
                </>
              );
            })}
          </table>
        </>
      );
    }
  };
  useEffect(() => {
    fetchOrderList();
  }, []);

  const handleRedirect = (e) => {
    e.preventDefault();
    history.push("/addNewOrder");
  };
  return (
    <div>
      <>
        <h1>ORDER MANAGEMENT SYSTEM</h1>
        <div>{showOrderList()}</div>
        <br />
        <div>
          <button onClick={handleRedirect}>Add New Order</button>
        </div>
      </>
    </div>
  );
}

export default ViewOrders;
