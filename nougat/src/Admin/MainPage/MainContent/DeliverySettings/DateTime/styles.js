import styled from "styled-components";
import {
  RadioGroup,
  TextField,
  FormLabel,
  Input,
  Button,
} from "@material-ui/core";
import { Add } from "@styled-icons/fluentui-system-filled";
import { Delete } from "@styled-icons/feather/";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateSection = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Exclude = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  width: 300px;
  margin-top: 20px;
`;

export const Form = styled.form`
  margin-left: 40px;
  padding: 0 20px;
  display: flex;
  width: 450px;
  flex-flow: column wrap;
  position: relative;
`;

export const Range = styled.div`
  display: flex;
  padding-right: 100px;
  justify-content: space-between;
  margin-bottom: 20px;
  & > div {
    width: 100px;
  }
`;

export const IncludeLabel = styled(FormLabel)`
  margin-top: 20px;
`;

export const AddIcon = styled(Add)`
  width: 20px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const DeleteIcon = styled(Delete)`
  width: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export const InputField = styled(Input)`
  width: 110px;
  margin-right: 10px;
`;

export const Btn = styled.div`
  width: 100px;
  position: absolute;
  bottom: 0;
  right: 0;
  & * {
    font-size: 16px;
  }
`;
