import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import {
  DetailTitle,
  ModalBody,
  GeneralInfo,
  DetailInfo,
  Products,
  Product,
  ProductImage,
  ProductDetails,
  Total,
} from "./styles";

function OrderDetails(props) {
  const order = props.order;
  const fixedData = props.fixedData;
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <DetailTitle>
            訂單：<span>{order.id}</span>
          </DetailTitle>
        </Modal.Header>
        <ModalBody>
          <GeneralInfo>
            <DetailInfo>
              姓名：<span>{order.personal_info.name}</span>
            </DetailInfo>
            <DetailInfo>
              Line：<span>{order.personal_info.line_id}</span>
            </DetailInfo>
            <DetailInfo>
              運送方式：
              <span>{fixedData.delivery[order.order_info.delivery]}</span>
            </DetailInfo>
            <DetailInfo>
              面交地點：
              <span>{order.order_info.delivery_address}</span>
            </DetailInfo>
            <DetailInfo>
              付款方式：
              <span>{fixedData.payment[order.order_info.payment]}</span>
            </DetailInfo>
            {order.order_info.notes === "N/A" ? (
              ""
            ) : (
              <DetailInfo>
                備註：
                <span>{order.order_info.notes}</span>
              </DetailInfo>
            )}
          </GeneralInfo>
          <Products>
            {order.products.map((product) => (
              <Product>
                <ProductImage src={product.image} />
                <ProductDetails>
                  <div>{product.name}</div>
                  <div>${product.price} /斤</div>
                </ProductDetails>
                <ProductDetails>
                  <div>數量</div>
                  <div>{product.qty}</div>
                </ProductDetails>
                <ProductDetails>
                  <div>小計</div>
                  <div>${product.total}</div>
                </ProductDetails>
              </Product>
            ))}
          </Products>
          <Total>總額：${order.total}</Total>
        </ModalBody>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderDetails;
