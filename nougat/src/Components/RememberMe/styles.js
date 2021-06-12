import styled from "styled-components";

export const Container = styled.div((props) => ({
  ...{ display: "inline-block", "margin-left": "20px" },
  ...props.style,
}));

export const Label = styled.div`
  font-family: chalk;
  color: #ac7b7d;
  font-size: 16px;
`;
