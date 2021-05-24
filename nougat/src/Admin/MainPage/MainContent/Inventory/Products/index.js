import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Api from "../../../../../utils/Api";
import ShowDetails from "./Details";
import Update from "./Edit/UpdateProduct";
import AddNewProduct from "./Edit/AddProduct";
import Delete from "../DeleteIventory";

import {
  ProductsTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Details,
  UpdateIcon,
  Add,
} from "./styles";

export default function Products() {
  const products = useSelector((state) => state.products);
  const orders = useSelector((state) => state.orders);
  const [deleteItems, setDeleteItems] = useState([]);
  const [details, setDetails] = useState(false);
  const [update, setUpdate] = useState(false);
  const [add, setAdd] = useState(false);

  const handleCloseDetails = () => setDetails(false);
  const handleShowDetails = (id) => setDetails(id);
  const handleCloseEdit = () => setUpdate(false);
  const handleShowEdit = (id) => setUpdate(id);
  const handleCloseAdd = () => setAdd(false);
  const handleShowAdd = () => setAdd(true);

  function getSoldAmount(orders, productId) {
    const allOrderProducts = orders.map((order) => order.products);
    const combineSoldProducts = allOrderProducts.reduce(
      (all, order) => [...all, ...order],
      []
    );
    const totalSold = combineSoldProducts
      .filter((product) => product.id === productId)
      .reduce((total, product) => total + product.qty, 0);

    return totalSold;
  }

  function handleChecked(event, id) {
    console.log(
      "🚀 ~ file: index.js ~ line 55 ~ handleChecked ~ event.target.checked",
      event.target.checked
    );
    setDeleteItems(
      event.target.checked
        ? [...deleteItems, id]
        : deleteItems.filter((item) => item !== id)
    );
  }

  function handleDeleteProduct() {
    if (window.confirm("刪除後資料無法復原，確認刪除？")) {
      Api.removeMultipleProducts(deleteItems).then(() => {
        alert("刪除完畢");
        setDeleteItems([]);
      });
    }
  }

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.js ~ line 59 ~ handleChecked ~ deleteItems",
      deleteItems
    );
  }, [deleteItems]);

  if (orders && products.length !== 0) {
    return (
      <ProductsTable striped bordered hover responsive>
        <Thead>
          <Tr>
            <Th>
              <Delete
                deleteItems={deleteItems}
                handleDelete={handleDeleteProduct}
              />
            </Th>
            <Th>產品名</Th>
            <Th>售價</Th>
            <Th>總產量</Th>
            <Th>已售量</Th>
            <Th>剩餘庫存</Th>
            <Th>詳情</Th>
            <Th>編輯</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products
            .sort((old, recent) => old.created_time - recent.created_time)
            .map((product) => {
              const sold = getSoldAmount(orders, product.id);
              const stock = product.stock;
              return (
                <Tr key={product.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(event) => handleChecked(event, product.id)}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{`$${product.price} /${product.unit}`}</td>
                  <td>{`${sold + stock} ${product.unit}`}</td>
                  <td>{sold + ` ${product.unit}`}</td>
                  <td>{stock + ` ${product.unit}`}</td>
                  <td>
                    <Details onClick={() => handleShowDetails(product.id)} />
                    <ShowDetails
                      product={product}
                      handleClose={handleCloseDetails}
                      show={details === product.id}
                    />
                  </td>
                  <td>
                    <UpdateIcon onClick={() => handleShowEdit(product.id)} />
                    <Update
                      product={product}
                      handleClose={handleCloseEdit}
                      show={update === product.id}
                    />
                  </td>
                </Tr>
              );
            })}
          <Tr>
            <td colSpan="8">
              <Add onClick={handleShowAdd} />
              <AddNewProduct handleClose={handleCloseAdd} show={add} />
            </td>
          </Tr>
        </Tbody>
      </ProductsTable>
    );
  } else {
    return <>Loading...</>;
  }
}
