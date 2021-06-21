import React, { useState, useEffect, useCallback } from "react";
import Input from "@material-ui/core/Input";
import propTypes from "prop-types";

import {
  Container,
  Edit,
  Done,
  Text,
  TextContainer,
  useStyles,
} from "./styles";

export default function EditableInput(props) {
  const { initValue, handleFinishEdit, doneIconStyle, trimOnBlur } = props;
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initValue);
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
    trimOnBlur
      ? setData(event.target.value)
      : setData(event.target.value.trim());
  }

  function handleBlur() {
    if (trimOnBlur) {
      setData(data.trim());
    }
  }

  useEffect(() => {
    if (!isEditing && initValue !== data) {
      handleFinishEdit(data);
    }
  }, [isEditing]);

  return (
    <Container>
      {isEditing ? (
        <>
          <Input
            value={data}
            isEditing={isEditing}
            onChange={handleChange}
            className={classes.input}
            style={{
              width: width,
            }}
            onBlur={handleBlur}
          />
          <Done onClick={handleClick} theme={doneIconStyle} />
        </>
      ) : (
        <TextContainer>
          <Text ref={textRef}>{initValue}</Text>
          <Edit onClick={handleClick} />
        </TextContainer>
      )}
    </Container>
  );
}

EditableInput.propTypes = {
  initValue: propTypes.node,
  handleFinishEdit: propTypes.func,
  doneIconStyle: propTypes.func,
  trimOnBlur: propTypes.bool,
};
