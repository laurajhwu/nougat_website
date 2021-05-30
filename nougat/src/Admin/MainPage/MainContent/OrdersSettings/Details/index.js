import React from "react";
import { useSelector } from "react-redux";
import { stringTime, stringDate } from "../../../../../utils/dateTimeFormat";

import { Button, Header, Modal, Icon } from "semantic-ui-react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import {
  Container,
  ModalContainer,
  Order,
  Info,
  Title,
  Content,
  Img,
  ProductInfo,
  ProductTitle,
  Product,
  Btn,
} from "./styles";

export default function Details(props) {
  const fixedData = useSelector((state) => state.fixedData);
  const { handleClose, order } = props;
  return (
    <Container>
      <ModalContainer>
        <Header icon>
          <Order>訂單：{order.id}</Order>
        </Header>
        <Modal.Content scrolling>
          <Info>
            <Title>名字</Title>
            <Content>{order.personal_info.name}</Content>
          </Info>
          <Info>
            <Title>Line ID</Title>
            <Content>{order.personal_info.line_id}</Content>
          </Info>
          <Info>
            <Title>運送方式</Title>
            <Content>{fixedData.delivery[order.order_info.delivery]}</Content>
          </Info>
          <Info>
            <Title>付款方式</Title>
            <Content>{fixedData.payment[order.order_info.payment]}</Content>
          </Info>
          <Info>
            <Title>訂單總計</Title>
            <Content>$ {order.total}</Content>
          </Info>
          <Info>
            <Title>下單時間</Title>
            <Content>{`${stringDate(order.timestamp.toDate())} - ${stringTime(
              order.timestamp.toDate()
            )}`}</Content>
          </Info>
          <Info>
            <Title>會員編號</Title>
            <Content>{order.member_id}</Content>
          </Info>
          <Info>
            <Title>備註</Title>
            <Content>{order.order_info.notes}</Content>
          </Info>
          <Info>
            <Title>購買產品</Title>
            <Content>
              <List>
                {order.products.map((product) => (
                  <ListItem key={product.id}>
                    <Img url={product.image}></Img>
                    <ListItemText
                      primary={
                        <Product>
                          <ProductTitle>{product.name}</ProductTitle>
                          <ProductInfo>
                            <div>小計：${product.total}</div>
                            <div>數量：{product.qty}</div>
                            <div>單價：${product.price}</div>
                          </ProductInfo>
                        </Product>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Content>
          </Info>
        </Modal.Content>
        <Modal.Actions>
          <Btn>
            <Button color="green" inverted onClick={handleClose}>
              關閉
            </Button>
          </Btn>
        </Modal.Actions>
      </ModalContainer>
    </Container>
  );
}
