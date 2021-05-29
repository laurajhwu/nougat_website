import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stringDate, stringTime } from "../../../../utils/dateTimeFormat";
import { getOrderFixedData } from "../../../../redux/actions/fixedData";
import Status from "./Status";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useEventCallback,
} from "@material-ui/core";
import { Container, Title } from "./styles";

export default function OrdersSettings() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderFixedData());
  }, []);

  if (orders) {
    return (
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Title>名字</Title>
                </TableCell>
                <TableCell align="center">
                  <Title>訂單狀態</Title>
                </TableCell>
                <TableCell align="center">
                  <Title>面交時間</Title>
                </TableCell>
                <TableCell align="center">
                  <Title>面交地點</Title>
                </TableCell>
                <TableCell align="center">
                  <Title>訂單編號</Title>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell> */}
                  <TableCell align="center">
                    {order.personal_info.name}
                  </TableCell>
                  <TableCell align="center">
                    <Status order={order} />
                  </TableCell>
                  <TableCell align="center">
                    {`${stringDate(
                      order.order_info.delivery_time.toDate()
                    )} ${stringTime(order.order_info.delivery_time.toDate())}`}
                  </TableCell>
                  <TableCell align="center">
                    {order.order_info.delivery_address}
                  </TableCell>
                  <TableCell align="center">{order.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  } else {
    return "Loading...";
  }
}
