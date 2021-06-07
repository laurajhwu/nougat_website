import styled from "styled-components";
import { EyeSlash, EyeFill } from "@styled-icons/bootstrap";

export const Container = styled.div((props) => ({
  ...{ display: "flex", "flex-direction": "row", position: "relative" },
  ...props.theme,
}));

export const Input = styled.input((props) => ({
  ...{
    outline: "none",
  },
  ...props.theme,
}));

export const NoShow = styled(EyeSlash)((props) => ({
  ...{
    color: "#d7cdcc",
    width: "20px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  ...props.theme,
}));

export const Show = styled(EyeFill)((props) => ({
  ...{
    color: "#d7cdcc",
    width: "20px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  ...props.theme,
}));
