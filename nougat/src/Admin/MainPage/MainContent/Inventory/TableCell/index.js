import React from "react";
import Form from "react-bootstrap/Form";
import propTypes from "prop-types";

export default function TableCell(props) {
  const {
    changes,
    isInvalid,
    invalidMsg,
    label,
    changeProp,
    options,
    groupOptions,
    item,
  } = props;

  function getEditData(event, prop) {
    if (item) {
      const rawValue = event.target.value.trim();
      const value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue);

      if (item[prop] !== value) {
        if (value || value === 0) {
          changes[prop] = value;
        } else {
          changes[prop] = "empty";
        }
      } else {
        delete changes[prop];
      }
    } else {
      const rawValue = event.target.value.trim();
      const value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue);

      changes[prop] = value;
    }
  }

  return (
    <Form.Group {...(groupOptions || {})}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onChange={(event) => getEditData(event, changeProp)}
        isInvalid={isInvalid}
        {...(options || {})}
      />
      {isInvalid !== undefined ? (
        <Form.Control.Feedback type="invalid">
          {invalidMsg}
        </Form.Control.Feedback>
      ) : (
        ""
      )}
    </Form.Group>
  );
}

TableCell.propTypes = {
  changes: propTypes.object.isRequired,
  options: propTypes.object,
  isInvalid: propTypes.bool,
  invalidMsg: propTypes.string,
  label: propTypes.string.isRequired,
  changeProp: propTypes.string.isRequired,
  groupOptions: propTypes.object,
  item: propTypes.object,
};
