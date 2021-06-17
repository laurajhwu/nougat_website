import React from "react";
import styled from "styled-components";
import UseAnimations from "react-useanimations";
import explore from "react-useanimations/lib/explore";
import propTypes from "prop-types";

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
    maxWidth: 460,
    minWidth: 340,
    backgroundColor: "transparent",
    maxHeight: 350,
    height: "100%",
    overflowY: "auto",
    marginTop: 10,
    [theme.breakpoints.down("md")]: {
      maxWidth: 360,
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: 400,
    },
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
  const { locations, setSelectedLocation, selectedLocation } = props;

  return (
    <List className={classes.root}>
      {locations.map((location, index) => {
        return (
          <UseAnimations
            animation={explore}
            size={26}
            key={index}
            onClick={() => {
              setSelectedLocation(location);
            }}
            render={(eventProps, animationProps) => (
              <Location
                className={classes.listItem}
                selected={
                  selectedLocation &&
                  location.place_id === selectedLocation.place_id
                }
                button
                {...eventProps}
                key={location.place_id}
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

RenderLocations.propTypes = {
  locations: propTypes.array,
  setSelectedLocation: propTypes.func,
  selectedLocation: propTypes.object,
};

export default RenderLocations;
