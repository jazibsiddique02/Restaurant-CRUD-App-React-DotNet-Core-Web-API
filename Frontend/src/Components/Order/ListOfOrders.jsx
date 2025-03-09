import React, { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import Table from "../../Layout/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DeleteTwoTone } from "@mui/icons-material";

export default function ListOfOrders(props) {
  const { setOrderId, setOrderListVisibility } = props;
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.ORDER)
      .fetchAll()
      .then((res) => setOrderList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const showForUpdate = (id) => {
    setOrderId(id);
    setOrderListVisibility(false);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order No.</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Payed With</TableCell>
            <TableCell>Grand Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orderList.map((item) => (
            <TableRow
              key={item.orderMasterId}
              onClick={(e) => showForUpdate(item.orderMasterId)}
            >
              <TableCell>{item.orderNumber}</TableCell>
              <TableCell>{item.customer.customerName}</TableCell>
              <TableCell>{item.pMethod}</TableCell>
              <TableCell>{item.gTotal}</TableCell>
              <TableCell>
                <DeleteTwoTone color="secondary" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
