import React, { useState } from "react";
import { useSelector, UseSelector } from "react-redux";
import ShowDetails from "./Details";

import {
  ProductsTable,
  Thead,
  Tbody,
  Tr,
  Th,
  DisableRemove,
  EnableRemove,
  Details,
  EditIcon,
  Add,
} from "./styles";

export default function Products() {
  const products = useSelector((state) => state.products);
  const orders = useSelector((state) => state.orders);
  const [deleteItems, setDeleteItems] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = (id) => setShowDetails(id);

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

  return (
    <ProductsTable striped bordered hover responsive>
      <Thead>
        <Tr>
          <Th>
            {deleteItems.length === 0 ? <DisableRemove /> : <EnableRemove />}
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
                  <input type="checkbox" />
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
                    show={showDetails === product.id}
                  />
                </td>
                <td>
                  <EditIcon />
                </td>
              </Tr>
            );
          })}
        <Tr>
          <td colSpan="8">
            <Add />
          </td>
        </Tr>
      </Tbody>
    </ProductsTable>
  );
}