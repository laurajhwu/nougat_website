import styled from "styled-components";
import {
  FormControl,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@material-ui/core";

export const Container = styled.div`
  margin: 0 50px;
  padding-top: 40px;
  height: 100vh;
  width: 100vw;
  max-width: 600px;
  display: flex;
  flex-flow: column nowrap;
`;

export const Form = styled(FormControl)`
  width: 250px;
`;

export const Title = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
  padding: 5px 16px;
  font-weight: 700;
  background-color: #d7cdcc;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  & > span {
    font-size: 13px;
    align-self: flex-end;
  }
`;

export const Ingredients = styled(List)`
  width: 500px;
  align-self: center;
`;

export const Ingredient = styled(ListItem)`
  /* outline: 1px solid black; */
  height: 60px;
`;

export const Text = styled(ListItemText)`
  & ${".MuiListItemText-primary"} {
    font-size: 16px;
  }
`;

export const ControlArea = styled.div`
  margin-top: 20px;
  padding: 0px 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Btn = styled(Button)`
  height: 40px;
`;

export const Result = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  justify-content: space-between;
`;

export const ProduceAmount = styled(TextField)`
  width: 100px;
  margin-left: 10px;
`;

export const Reset = styled(Btn)``;
