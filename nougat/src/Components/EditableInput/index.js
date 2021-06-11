import React, { useState, useEffect, useCallback, useRef } from "react";
import Input from "@material-ui/core/Input";

import {
  Container,
  Edit,
  Done,
  Text,
  Textarea,
  TextContainer,
  useStyles,
} from "./styles";

export default function EditableInput(props) {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(props.initValue);
  const [width, setWidth] = useState();
  const textRef = useCallback((node) => {
    if (node) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  function handleClick() {
    setIsEditing(!isEditing);
  }

  function handleChange(event) {
    setData(event.target.value.trim());
  }

  useEffect(() => {
    if (!isEditing && props.initValue !== data) {
      props.handleFinishEdit(data);
    }
  }, [isEditing]);

  return (
    <Container>
      {isEditing ? (
        <>
          {props.notes ? (
            <Textarea
              defaultValue={props.initValue}
              isEditing={isEditing}
              onChange={handleChange}
              rows="3"
            />
          ) : (
            <Input
              value={data}
              isEditing={isEditing}
              onChange={handleChange}
              className={classes.input}
              style={{
                width: width,
              }}
            />
          )}

          <Done onClick={handleClick} theme={props.doneIconStyle} />
        </>
      ) : (
        <TextContainer>
          <Text notes={props.notes} ref={textRef}>
            {props.initValue}
          </Text>
          <Edit onClick={handleClick} />
        </TextContainer>
      )}
    </Container>
  );
}
