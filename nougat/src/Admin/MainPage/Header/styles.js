import styled from "styled-components";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { Settings } from "@styled-icons/fluentui-system-filled";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
`;

export const Btn = styled(Button)`
  margin: 40px 0;
  border-radius: 5px;
  width: 100px;
`;

export const DropdownBtn = styled(DropdownButton)`
  margin: 40px 0;
  border-radius: 10px;
`;

export const DropdownItem = styled(Dropdown.Item)``;

export const SettingIcon = styled(Settings)`
  width: 50px;
`;
