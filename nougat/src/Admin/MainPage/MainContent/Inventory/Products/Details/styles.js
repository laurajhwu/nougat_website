import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import { Camera } from "@styled-icons/boxicons-regular/";

export const Img = styled.img`
  width: 100%;
`;

export const List = styled(ListGroup)`
  width: 100%;
  & div {
    text-align: center;
    width: 100px;
  }
`;

export const Item = styled(ListGroup.Item)`
  width: 100px;
`;

export const Description = styled(ListGroup.Item)`
  width: 100% !important;
`;

export const CameraIcon = styled(Camera)`
  width: 30px;
  &:hover {
    cursor: pointer;
  }
`;

export const FileInput = styled.input`
  display: none;
`;
