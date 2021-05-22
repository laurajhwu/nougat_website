import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Products from "./Products";
import Ingredients from "./Ingredients";

export default function ControlledTabs() {
  const [key, setKey] = useState("products");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="products" title="產品">
        <Products />
      </Tab>
      <Tab eventKey="ingredients" title="食材">
        <Ingredients />
      </Tab>
    </Tabs>
  );
}
