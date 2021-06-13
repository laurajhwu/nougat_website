import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderFixedData } from "../../../../redux/actions/fixedData";
import Status from "./Status";
import Time from "./Time";
import Location from "./Location";
import Details from "./Details";
import Filter from "./Filter";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";

import { Container, Title, DetailSection } from "./styles";

export default function OrdersSettings() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredOrders, setFilteredOrders] = useState();

  function splitOrders() {
    const ordersCopy = [...(filteredOrders || orders)];
    const totalPages = Math.ceil(orders.length / rowsPerPage);
    const splittedOrders = {};
    for (let i = 0; i < totalPages; i++) {
      splittedOrders[i] = ordersCopy.splice(0, rowsPerPage);
    }
    return splittedOrders;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleOpen(id) {
    setOpen(id);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getOrderFixedData());
  }, []);

  if (orders) {
    return (
      <Container>
        <Filter
          orders={orders}
          filteredOrders={filteredOrders}
          setFilteredOrders={setFilteredOrders}
        />
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
              {splitOrders()[page].map((order) => (
                <TableRow key={order.id}>
                  <TableCell align="center">
                    {order.personal_info.name}
                  </TableCell>
                  <TableCell align="center">
                    <Status order={order} />
                  </TableCell>
                  <TableCell align="center" style={{ width: "210px" }}>
                    <Time order={order} />
                  </TableCell>
                  <TableCell align="left">
                    {locations && locations.length !== 0 ? (
                      <Location order={order} locations={locations} />
                    ) : (
                      "Loading..."
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <DetailSection
                      basic
                      onClose={handleClose}
                      onOpen={() => handleOpen(order.id)}
                      open={open === order.id}
                      trigger={<Button color="primary">{order.id}</Button>}
                    >
                      <Details handleClose={handleClose} order={order} />
                    </DetailSection>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredOrders ? filteredOrders.length : orders.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Container>
    );
  } else {
    return "Loading...";
  }
}
