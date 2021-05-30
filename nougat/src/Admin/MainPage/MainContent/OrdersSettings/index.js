import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderFixedData } from "../../../../redux/actions/fixedData";
import Api from "../../../../utils/Api";
import Status from "./Status";
import Time from "./Time";
import Location from "./Location";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Container, Title } from "./styles";

export default function OrdersSettings() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations);

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
                  <TableCell align="center">
                    {order.personal_info.name}
                  </TableCell>
                  <TableCell align="center">
                    <Status order={order} />
                  </TableCell>
                  <TableCell align="center">
                    <Time order={order} />
                  </TableCell>
                  <TableCell align="left">
                    {locations && locations.length !== 0 ? (
                      <Location order={order} locations={locations} />
                    ) : (
                      "Loading..."
                    )}
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
