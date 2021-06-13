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
    "& > .MuiInputBase-input": {
      width: 0,
      flexGrow: 1,
      overflow: "visible",
    },
    // display: "flex",
    flexGrow: 1,
    width: "100%",
    // "padding-right": 25,
    position: "relative",
    // marginRight: "5px;",
    overflow: "visible",
    fontSize: window.innerWidth <= 560 ? "20px" : "24px",
    fontFamily: "chalk",
    lineHeight: window.innerWidth <= 560 ? "25px" : "30px",
  },
}));

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  justify-content: space-between;
`;

export const Textarea = styled.textarea``;

export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Text = styled.div`
  white-space: pre-wrap;
  color: #37323e;
  padding: 6px 0 7px;
  border-bottom: 2px solid transparent;
  line-height: 30px;
  width: calc(100% + 7px);
  font-family: ${(props) => (props.notes ? "" : "chalk")};
`;

export const Edit = styled(PencilAlt)`
  width: 18px;
  font-size: 18px;
  margin: 0 0 0 10px;
  color: #bba0b2;
  &:hover {
    cursor: pointer;
    color: #f45866;
  }
`;

export const Done = styled(CheckCircleFill)((props) => ({
  ...{
    width: "18px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  ...props.theme,
}));
