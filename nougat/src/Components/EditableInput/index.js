import React, { useState, useEffect } from "react";

import { Container, Input, Edit, Done, Text, Textarea } from "./styles";

export default function EditableInput(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(props.initValue);

  function handleClick() {
    setIsEditing(!isEditing);
  }

  function handleChange(event) {
    setData(event.target.value);
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
              defaultValue={props.initValue}
              isEditing={isEditing}
              onChange={handleChange}
            />
          )}

          <Done onClick={handleClick} />
        </>
      ) : (
        <>
          <Text>{props.initValue}</Text>
          <Edit onClick={handleClick} />
        </>
      )}
    </Container>
  );
}
