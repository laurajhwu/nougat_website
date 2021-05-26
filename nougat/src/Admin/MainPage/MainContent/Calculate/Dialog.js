import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

import {
  UpdateOptions,
  UpdateSection,
  UpdateOption,
  UpdateContent,
} from "./styles";

export default function UpdateStockDialog(props) {
  const [selected, setSelected] = useState({
    ingredient: "all",
    product: "all",
  });
  const [options, setOptions] = useState({
    ingredient: {
      decrease: false,
      increase: false,
      all: true,
      unchanged: false,
    },
    product: { increase: false, all: true },
  });

  function handleClickOptions(category, option) {
    Object.keys(options[category]).forEach((key) => {
      options[category][key] = false;
    });
    options[category][option] = !options[category][option];
    setOptions({ ...options });
    selected[category] = option;
  }

  return (
    <Dialog
      // props.open
      open={true}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"庫存更新選項"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <UpdateSection>
            <UpdateContent>食材庫存</UpdateContent>
            <UpdateOptions>
              <UpdateOption
                label="減少庫存"
                color={options.ingredient.decrease ? "secondary" : ""}
                onClick={() => handleClickOptions("ingredient", "decrease")}
              />
              <UpdateOption
                label="新增庫存"
                color={options.ingredient.increase ? "secondary" : ""}
                onClick={() => handleClickOptions("ingredient", "increase")}
              />
              <UpdateOption
                label="做為剩餘庫存"
                color={options.ingredient.all ? "secondary" : ""}
                onClick={() => handleClickOptions("ingredient", "all")}
              />
              <UpdateOption
                label="不變動"
                color={options.ingredient.unchanged ? "secondary" : ""}
                onClick={() => handleClickOptions("ingredient", "unchanged")}
              />
            </UpdateOptions>
          </UpdateSection>
          <UpdateSection>
            <UpdateContent>產品庫存</UpdateContent>
            <UpdateOptions>
              <UpdateOption
                label="新增庫存"
                color={options.product.increase ? "secondary" : ""}
                onClick={() => handleClickOptions("product", "increase")}
              />
              <UpdateOption
                label="做為剩餘庫存"
                color={options.product.all ? "secondary" : ""}
                onClick={() => handleClickOptions("product", "all")}
              />
            </UpdateOptions>
          </UpdateSection>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          取消
        </Button>
        <Button onClick={() => {}} color="secondary" autoFocus>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
}
