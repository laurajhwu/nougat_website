import styled from "styled-components";

export const Container = styled.div((props) => ({
  ...{ display: "inline-block", "margin-left": "20px" },
  ...props.style,
}));
