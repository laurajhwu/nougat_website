import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import UseAnimations from "react-useanimations";
// import { ReactComponent as LocationIcon } from "../../../../animatedIcons/Explore/Explore.svg";
// import LocationIconFile from "../../../../animatedIcons/Explore/Explore.json";
import explore from "react-useanimations/lib/explore";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

const Location = styled(ListItem)`
  background-color: ${(props) =>
    props.selected ? "rgba(2,80,104,0.2)" : "transparent"} !important;
  &:hover {
    background-color: ${(props) =>
      props.selected
        ? "rgba(2,80,104,0.3)"
        : "rgba(241, 249, 246, 0.7)"} !important ;
  }
`;

const Address = styled.div`
  color: #025068;
  font-size: 16px;
`;

const LandMark = styled.div`
  color: #7e7f9a;
  font-size: 14px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "transparent",
    maxHeight: 350,
    height: "100%",
    overflowY: "auto",
    marginTop: 10,
  },
  avatar: {
    backgroundColor: " rgba(140,171,190,0.3)",
    "& path": { stroke: "#474973" },
  },
  listItem: {
    primary: {
      color: "#dbe6e6",
    },
  },
}));

function RenderLocations(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.locations.map((location) => {
        return (
          <UseAnimations
            animation={explore}
            size={26}
            onClick={() => {
              props.setSelectedLocation(location);
            }}
            render={(eventProps, animationProps) => (
              <Location
                className={classes.listItem}
                selected={
                  props.selectedLocation &&
                  location.place_id === props.selectedLocation.place_id
                }
                button
                {...eventProps}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <div {...animationProps} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Address>
                      {location.city + location.district + location.address}
                    </Address>
                  }
                  secondary={<LandMark>{location.description}</LandMark>}
                />
                <Divider variant="inset" component="li" />
              </Location>
            )}
          />
        );
      })}
    </List>
  );
}

export default RenderLocations;
