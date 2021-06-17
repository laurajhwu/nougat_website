import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Api from "../../../../../utils/Api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Fade from "@material-ui/core/Fade";

import {
  Container,
  DropArea,
  Product,
  Img,
  Name,
  Success,
  Message,
} from "./styles";

export default function OrderProduct() {
  const products = useSelector((state) => state.products).sort(
    (first, last) => first.display_order - last.display_order
  );
  const [orderedProducts, setOrderedProducts] = useState();
  const [isUpdate, setIsUpdate] = useState(false);

  function splitProducts(products) {
    const productsClone = [...products];
    const display = [];

    while (productsClone.length > 0) {
      display.push(productsClone.splice(0, 4));
    }

    return display;
  }

  function combineProducts(products) {
    let combined = [];
    products.forEach((group) => {
      combined = [...combined, ...group];
    });
    return combined;
  }

  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function move(source, destination, droppableSource, droppableDestination) {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  }

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sourceIndex = +source.droppableId;
    const destinationIndex = +destination.droppableId;

    const newState = [...orderedProducts];

    if (sourceIndex === destinationIndex) {
      if (source.index !== destination.index) {
        const products = reorder(
          orderedProducts[sourceIndex],
          source.index,
          destination.index
        );

        newState[sourceIndex] = products;
        setOrderedProducts(newState);
        updateProductOrder(newState);
      }
    } else {
      const result = move(
        orderedProducts[sourceIndex],
        orderedProducts[destinationIndex],
        source,
        destination
      );

      newState[sourceIndex] = result[sourceIndex];
      newState[destinationIndex] = result[destinationIndex];
      setOrderedProducts(splitProducts(combineProducts(newState)));
      updateProductOrder(newState);
    }
  }

  function updateProductOrder(newState) {
    const products = combineProducts(newState);
    products.forEach((product, index) => {
      product.display_order = index + 1;
    });
    Api.updateProductOrder(products).then(() => {
      console.info("已更新產品頁！");
      setIsUpdate(true);
    });
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    color: isDragging ? "grey" : "black",
    ...draggableStyle,
  });

  useEffect(() => {
    setOrderedProducts(splitProducts(products));
  }, [products]);

  if (orderedProducts) {
    return (
      <Container>
        <Message
          open={isUpdate}
          autoHideDuration={2000}
          onClose={() => setIsUpdate(false)}
          TransitionComponent={Fade}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Success severity="success" color="success">
            產品頁更新成功
          </Success>
        </Message>

        <DragDropContext onDragEnd={onDragEnd}>
          {orderedProducts.map((productGroup, index) => (
            <Droppable
              key={index}
              droppableId={`${index}`}
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <DropArea ref={provided.innerRef} {...provided.droppableProps}>
                  {productGroup.map((product, index) => (
                    <Draggable
                      key={product.id}
                      draggableId={product.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Product
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <Img src={product.image} />
                          <Name>{product.name}</Name>
                        </Product>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </DropArea>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </Container>
    );
  } else {
    return "";
  }
}
