import React, { useEffect } from "react";
import axios from 'axios';
import { useAlert } from 'react-alert'

export default function StatusOrderSelectcBox ({ orderId, currentValue, fetchOrders }) {
  const optionStatus = ['pending', 'sent', 'delivered']
  const alerts = useAlert()

  const handleChangeStatus = async (event) => {
    event.preventDefault();
    const value = event.target.value;
    try {
      await axios.patch(
        `/api/staff/orders/${orderId}/`,
        JSON.stringify({ status: value }),
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      fetchOrders()
    } catch (error) {
      console.log(error.response);
      alerts.show('You did not chance statu', {
        timeout: 0,
        type: 'error'
      })
    }
  };

  return (
    <div className='select-status'>
      <label htmlFor="status">Change Status</label>
      <select name="status" onChange={handleChangeStatus} value={currentValue}>
        {optionStatus.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
