import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import EditOrderForm from "../components/editOrderForm";

function OrderDetails(props) {
  const id = props.match.params.orderDetails;
  console.log(id);
  const [orderDetails, setOrderDetails] = useState([]);
  let history = useHistory();
  const fetchOrderDetails = async () => {
    try {
      const tempOrdList = await axios.get(`http://localhost:4000/orders/${id}`);
      setOrderDetails(tempOrdList.data.oneOrder);
      console.log(tempOrdList);
      console.log(orderDetails);
    } catch (error) {
      console.log({ "fetch order details error": error.message });
    }
  };
  const showOrder = () => {
    if (orderDetails) {
      return (
        <>
          <div>
            <div>
              Order Id:
              {orderDetails.orderId}
            </div>

            <div>
              Service Number:
              {orderDetails.serviceNo}
            </div>
            <div>Segment Group: {orderDetails.segment}</div>

            <div>Product Name: {orderDetails.productName}</div>

            <div>Order Status: {orderDetails.status}</div>

            <div>State: {orderDetails.state}</div>

            <div>Remark: {orderDetails.remark}</div>
          </div>
        </>
      );
    }
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  // const handleRedirect = (e) => {
  //   e.preventDefault();
  //   history.push("/editOrder");
  // };
  const handleDelete = async (e) => {
    e.preventDefault();
    let answer = prompt(`Are you sure you want to delete this order? Y/N`)
    if (answer === 'y' || answer === 'Y') {

      await axios
        .delete(`http://localhost:4000/orders/${id}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } 
    ;
  };
  return (
    <div>
      <>
        <h1>ORDER MANAGEMENT SYSTEM</h1>
        <div>{showOrder()}</div>
        <br />
        <EditOrderForm id={id}/>
        
        <br />
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </>
    </div>
  );
}

export default OrderDetails;
