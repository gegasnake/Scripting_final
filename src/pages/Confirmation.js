import React from "react";
import { useParams } from "react-router-dom";

function Confirmation() {
  const { orderId } = useParams();
  return <h1>Order Confirmed: #{orderId}</h1>;
}

export default Confirmation;