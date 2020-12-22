import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AddNewOrderForm from "../components/addNewOrderform"

function AddNewOrder() {
    return (
        <div>
            <>
            <h1>Add New Order</h1>
            <div>
                <AddNewOrderForm />
            </div>
            </>
        </div>
    )
}

export default AddNewOrder
