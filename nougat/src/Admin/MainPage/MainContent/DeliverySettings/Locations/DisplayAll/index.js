import React from "react";
import { useSelector } from "react-redux";
import Api from "../../../../../../utils/Api";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Switch,
  IconButton,
} from "@material-ui/core";

import { Container, MarkerIcon, DeleteIcon, Address, Action } from "./styles";

export default function DisplayAll() {
  const locations = useSelector((state) => state.locations);

  function handleToggle(id, active) {
    Api.updateLocation(id, { active: !active });
  }

  function removeLocation(id, address) {
    if (window.confirm(`確定刪除地點'${address}'?`)) {
      Api.removeLocation(id);
    }
  }

  return (
    <Container>
      <List>
        {locations.map((location) => {
          const { address, active, city, description, district, id } = location;
          const fullAddress = city + district + address;

          return (
            <>
              <ListItem button key={id}>
                <ListItemAvatar>
                  <Avatar>
                    <MarkerIcon />
                  </Avatar>
                </ListItemAvatar>
                <Address
                  primary={fullAddress}
                  secondary={description}
                  active={active}
                />
                <Action>
                  <Switch
                    onChange={() => handleToggle(id, active)}
                    checked={active}
                  />
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon
                      onClick={() => removeLocation(id, fullAddress)}
                    />
                  </IconButton>
                </Action>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
    </Container>
  );
}
