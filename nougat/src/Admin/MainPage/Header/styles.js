import styled from "styled-components";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { Settings } from "@styled-icons/fluentui-system-filled";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  height: 100vh;
  width: 150px;
  background-color: lightgrey;
  position: fixed;
`;

export const Btn = styled(Button)`
  margin: 40px 0;
  border-radius: 5px;
  width: 100px;
`;

export const DropdownBtn = styled(DropdownButton)`
  margin: 40px 0;
  text-align: center;
`;

export const DropdownItem = styled(Dropdown.Item)`
  padding: 10px 20px;
`;

export const SettingIcon = styled(Settings)`
  width: 50px;
  &:hover {
    cursor: pointer;
  }
`;
