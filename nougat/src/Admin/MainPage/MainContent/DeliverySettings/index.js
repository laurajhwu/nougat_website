import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import TabPanel from "./TabPanel";
import Locations from "./Locations";
import DateTime from "./DateTime";

import { Container, Label } from "./styles";

export default function DeliverySettings() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Container>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab
            label={<Label>地點設定</Label>}
            id="action-tab-0"
            aria-controls="action-tabpanel-0"
          />
          <Tab
            label={<Label>時間設定</Label>}
            id="action-tab-1"
            aria-controls="action-tabpanel-2"
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Locations
            transitionDuration={transitionDuration}
            isIn={value === 0}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <DateTime />
        </TabPanel>
      </SwipeableViews>
    </Container>
  );
}
