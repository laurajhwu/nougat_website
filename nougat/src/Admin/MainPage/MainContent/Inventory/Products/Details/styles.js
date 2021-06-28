import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import { Camera } from "@styled-icons/boxicons-regular/";

export const Img = styled.img`
  width: 100%;
`;

export const List = styled(ListGroup)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  & div {
    text-align: center;
    width: 100px;
  }

  & > div {
    display: flex;
    flex-flow: column nowrap;
    width: 50px;
    justify-content: center;
    padding: 20px;
    font-weight: bold;
  }
`;

export const Item = styled(ListGroup.Item)`
  flex-basis: 50px;
  margin: 5px 0;
  & > div {
    max-width: 20px;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  margin: 0 auto 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid;
`;

export const Description = styled(ListGroup.Item)`
  width: 100% !important;
  white-space: pre-wrap;
  display: flex;
  line-height: 20px;
`;

export const CameraIcon = styled(Camera)`
  width: 30px;
  position: absolute;
  top: 20px;
  right: 30px;
  background-color: rgba(231, 218, 220, 0.5);
  border-radius: 50%;
  padding: 2px;
  &:hover {
    cursor: pointer;
    color: #820933;
  }
`;

export const FileInput = styled.input`
  display: none;
`;
