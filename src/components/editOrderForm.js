import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ErrorHandler } from "universal-react-logger";

function EditOrderForm(props) {
  const id = props.id
//   console.log(id)
  let history = useHistory();
  const [orderId, setOrderId] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [segmentGroup, setSegmentGroup] = useState("");
  const [productName, setProductName] = useState("");
  const [remark, setRemark] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [state, setState] = useState("");
  const select = ["Single", "Multiple", "ComboBox"];
  const Add = select.map((Add) => Add);
  const handleStateChange = (e) => {
    console.log(e.target.value);
    setState(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:4000/orders/${id}`, {
        orderId: orderId,
        serviceNo: serviceNumber,
        segment: segmentGroup,
        productName: productName,
        remark: remark,
        status: orderStatus,
        state: state,
      })
      .then((response) => {
        console.log(response.data);
        if ((response.data.message = "success")) {
          alert("You have successfully update an order");
          history.push(`/viewOrders`);
        }
      })
      .catch((error) => {
        console.log({ "error": error.response.data.msg });
        alert(`Error: ${error.response.data.msg}`);
      });
  };
  return (
    <div>
      <>
        <form onSubmit={handleFormSubmit}>
          <div>Order Id</div>
          <input
            onChange={(e) => {
              setOrderId(e.target.value);
            }}
          />
          <div>Service Number</div>
          <input
            onChange={(e) => {
              setServiceNumber(e.target.value);
            }}
          />
          <div>Segment Group</div>
          <input
            onChange={(e) => {
              setSegmentGroup(e.target.value);
            }}
          />
          <div>Product Name</div>
          <input
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <div>Remark</div>
          <input
            onChange={(e) => {
              setRemark(e.target.value);
            }}
          />
          <div>
            <div>Order Status</div>
            <input
              type="radio"
              id="stat1"
              name="Processing"
              value="Processing"
              onClick={() => setOrderStatus("Processing")}
            />
            <label for="stat2">Processing</label>{" "}
            <input
              type="radio"
              id="stat2"
              name="completed"
              value="Completed"
              onClick={() => setOrderStatus("Completed")}
            />
            <label for="stat2">Completed</label>
            <div>
              <div>State</div>
              <select
                onChange={(e) => handleStateChange(e)}
                className="browser-default custom-select"
              >
                {Add.map((address, key) => (
                  <option key={key} value={address}>
                    {address}
                  </option>
                ))}
              </select>
            </div>
            <br></br>
            <button type="submit">Edit and Save</button>
          </div>
        </form>
      </>
    </div>
  );
}

export default EditOrderForm;
