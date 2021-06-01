import React from "react";
import Header from "./Header";
import MainContent from "./MainContent";

import { Container } from "./styles";

export default function MainWebsite() {
  return (
    <Container>
      <Header />
      <MainContent />
    </Container>
  );
}
