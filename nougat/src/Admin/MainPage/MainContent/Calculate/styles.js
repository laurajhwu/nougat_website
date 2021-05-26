import styled from "styled-components";
import {
  FormControl,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

export const Container = styled.div`
  padding: 40px 50px;
  height: 100vh;
  width: 100vw;
  max-width: 960px;
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
  padding-top: 100px;
  width: 400px;
  padding-top: 40px;
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
`;
