import React, { useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import propTypes from "prop-types";
import Api from "../../../../../../utils/Api";
import TableCell from "../../TableCell";

export default function FormBase(props) {
  const {
    handleOnSubmit,
    changes,
    invalid,
    ingredient,
    buttonProps,
    buttonLabel,
    postEdit,
    validateChanges,
  } = props;

  const fixedCellProps = { changes: changes, item: ingredient };

  function submitEdit() {
    const valid = Object.values(invalid).every((input) => input === false);

    if (Object.keys(changes).length !== 0 && valid) {
      if (changes.name) {
        Api.checkSameIngredient(changes.name).then((isValid) => {
          if (isValid) {
            postEdit();
          } else {
            changes.name = "empty";
            validateChanges();
          }
        });
      } else {
        postEdit();
      }
    }
  }

  useEffect(() => {
    if (Object.keys(changes).length !== 0) {
      validateChanges();
    }
  }, [changes]);

  useEffect(() => {
    if (Object.keys(invalid).length !== 0) {
      submitEdit();
    }
  }, [invalid]);

  return (
    <Form onSubmit={handleOnSubmit}>
      <Modal.Body>
        <TableCell
          label="材料名稱"
          changeProp="name"
          isInvalid={invalid.name}
          invalidMsg="報錯：名稱已被使用過或未填"
          options={{ defaultValue: ingredient?.name }}
          {...fixedCellProps}
        />

        <Form.Row>
          <TableCell
            label="已使用"
            changeProp="used"
            isInvalid={invalid.used}
            invalidMsg="已使用量為必填數字"
            groupOptions={{ as: Col }}
            options={{ defaultValue: ingredient?.used }}
            {...fixedCellProps}
          />
          <TableCell
            label="剩餘庫存"
            changeProp="stock"
            isInvalid={invalid.stock}
            invalidMsg="庫存為必填數字"
            groupOptions={{ as: Col }}
            options={{ defaultValue: ingredient?.stock }}
            {...fixedCellProps}
          />
        </Form.Row>
        <TableCell
          label="食材備註"
          changeProp="notes"
          options={{
            as: "textarea",
            rows: 3,
            defaultValue: ingredient?.notes,
          }}
          {...fixedCellProps}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button {...buttonProps} type="submit">
          {buttonLabel}
        </Button>
      </Modal.Footer>
    </Form>
  );
}

FormBase.propTypes = {
  changes: propTypes.object.isRequired,
  handleOnSubmit: propTypes.func.isRequired,
  invalid: propTypes.object.isRequired,
  ingredient: propTypes.object,
  buttonProps: propTypes.object,
  buttonLabel: propTypes.string.isRequired,
  handleClose: propTypes.func.isRequired,
  postEdit: propTypes.func.isRequired,
  validateChanges: propTypes.func.isRequired,
};
