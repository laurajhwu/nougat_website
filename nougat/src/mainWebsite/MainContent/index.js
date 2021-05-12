import React, { useEffect } from "react";
import styled from "styled-components";
import Products from "./products";

const Main = styled.main`
  max-width: 1160px;
  margin: 0 auto;
`;

function MainContent() {
  return (
    <Main>
      <Products />
    </Main>
  );
}

export default MainContent;
