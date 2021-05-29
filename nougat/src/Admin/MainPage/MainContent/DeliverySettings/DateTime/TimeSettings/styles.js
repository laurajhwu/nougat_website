import styled from "styled-components";
import {
  InputLabel,
  Input,
  InputAdornment,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 100%;
  /* height: 100vh; */
`;

export const Title = styled.div`
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
`;

export const UnavailableTimes = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BasicSettings = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputArea = styled.div`
  margin-right: 20px;
  width: 100px;
  &:first-child {
    margin-right: 100px;
  }
`;

export const Line = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

export const SelectedDate = styled.div`
  font-size: 20px;
  margin-top: 20px;
`;

export const Times = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  outline: 1px solid black;
  padding: 10px 10px;
`;

export const Time = styled.div`
  margin-right: 5px;
  height: 40px;
  display: flex;
  align-items: center;
`;

export const TimeLabel = styled.label``;

export const Save = styled(Button)`
  height: 60%;
  align-self: center;
`;
