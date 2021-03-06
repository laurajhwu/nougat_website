import React from "react";
import Modal from "react-bootstrap/Modal";
import { stringDate, stringTime } from "../../../../../utils/dateTimeFormat";
import propTypes from "prop-types";

import {
  ModalContainer,
  DetailTitle,
  ModalBody,
  GeneralInfo,
  DetailInfo,
  Products,
  Product,
  ProductImage,
  ProductDetails,
  Total,
  ConfirmBtn,
} from "./styles";

function OrderDetails(props) {
  const { order, fixedData, show, handleClose } = props;
  const deliveryTime = order.order_info.delivery_time.toDate();
  return (
    <>
      <ModalContainer show={show} onHide={handleClose} keyboard={false}>
        <Modal.Header closeButton style={{ borderBottom: "none" }}>
          <DetailTitle>
            訂單：<span>{order.id}</span>
          </DetailTitle>
        </Modal.Header>
        <ModalBody>
          <GeneralInfo>
            <DetailInfo>
              <div>姓名：</div>
              <span>{order.personal_info.name}</span>
            </DetailInfo>
            <DetailInfo>
              <div>Line ID：</div>
              <span>{order.personal_info.line_id}</span>
            </DetailInfo>
            <DetailInfo>
              <div>運送方式：</div>
              <span>{fixedData.delivery[order.order_info.delivery]}</span>
            </DetailInfo>
            <DetailInfo>
              <div>面交地點：</div>
              <span>{order.order_info.delivery_address}</span>
            </DetailInfo>
            <DetailInfo>
              <div>面交時間：</div>
              <span>{`${stringDate(deliveryTime)} - ${stringTime(
                deliveryTime
              )}`}</span>
            </DetailInfo>
            <DetailInfo>
              <div>付款方式：</div>
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
              <Product key={product.id}>
                <ProductImage src={product.image} />
                <ProductDetails>
                  <div>{product.name}</div>
                  <div>${product.price} /斤</div>
                </ProductDetails>
                <ProductDetails>
                  <div>數量</div>
                  <div>
                    {product.qty}
                    {product.unit}
                  </div>
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
        <Modal.Footer style={{ borderTop: "none" }}>
          <ConfirmBtn variant="secondary" onClick={handleClose}>
            確認
          </ConfirmBtn>
        </Modal.Footer>
      </ModalContainer>
    </>
  );
}

OrderDetails.propTypes = {
  order: propTypes.object,
  fixedData: propTypes.object,
  show: propTypes.bool,
  handleClose: propTypes.func,
};

export default OrderDetails;
