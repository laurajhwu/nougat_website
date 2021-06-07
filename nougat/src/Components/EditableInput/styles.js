import styled from "styled-components";
import { PencilAlt } from "@styled-icons/fa-solid";
import { CheckCircleFill } from "@styled-icons/bootstrap";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  input: {
    "&:before": {
      borderColor: "#99a4ad",
      borderBottom: `2px solid`,
    },
    "&:after": {
      borderColor: "#B2777C",
    },
    width: "180px",
    "padding-right": 25,
    position: "relative",
    marginRight: "5px;",
    fontSize: "18px",
  },
}));

export const Container = styled.div`
  display: flex;
  position: relative;
`;

export const Textarea = styled.textarea``;

export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 200px;
`;

export const Text = styled.div`
  white-space: pre-wrap;
  color: #37323e;
`;

export const Edit = styled(PencilAlt)`
  width: 18px;
  margin-left: 10px;
  color: #bba0b2;
  &:hover {
    cursor: pointer;
    color: #f45866;
  }
`;

export const Done = styled(CheckCircleFill)((props) => ({
  ...{
    width: "20px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  ...props.theme,
}));
