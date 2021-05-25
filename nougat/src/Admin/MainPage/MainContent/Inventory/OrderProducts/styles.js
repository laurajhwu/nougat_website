import styled from "styled-components";
import { Jumbotron } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const Container = styled(Jumbotron)`
  margin: 10px 0;
  padding: 5px;
  width: 100%;
  height: 95%;
  min-width: 800px;
  /* overflow-y: scroll; */
  display: grid;
  grid-template-columns: repeat(1);
  grid-auto-rows: minmax(120px, 200px);
`;

export const DropArea = styled.section`
  /* outline: 1px solid black;  */
  display: grid;
  column-gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  padding: 5px 20px;
  min-width: 800px;
`;

export const Product = styled.div`
  max-height: 200px;
  height: 100%;
  margin: auto 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`;

export const Img = styled.img`
  max-width: 170px;
  width: 90%;
  height: 70%;
  margin: 0 auto;
`;

export const Name = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0 auto;
`;
