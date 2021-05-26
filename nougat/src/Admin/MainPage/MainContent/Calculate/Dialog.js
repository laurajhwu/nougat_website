import React, { useState, useEffect, useRef } from "react";
import Api from "../../../../utils/Api";

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

let isLoading = false;

export default function UpdateStockDialog(props) {
  const initOptionsState = {
    ingredient: {
      decrease: false,
      increase: false,
      used: true,
      unchanged: false,
    },
    product: { increase: false, all: true },
  };
  const [selected, setSelected] = useState({});
  const [options, setOptions] = useState(initOptionsState);

  function handleClickOptions(category, option) {
    Object.keys(options[category]).forEach((key) => {
      options[category][key] = false;
    });
    options[category][option] = !options[category][option];
    setOptions({ ...options });
    selected[category] = option;
  }

  function handleClose() {
    setOptions(initOptionsState);
    setSelected({});
    props.handleClose();
  }

  function canDecreaseIngredientStock() {
    if (props.data) {
      return Object.entries(props.data).every(
        ([id, amount]) => props.ingredients[id].stock >= amount
      );
    }
  }

  function handleConfirmUpdate() {
    if (Object.keys(selected).length === 0) {
      Object.assign(selected, { ingredient: "used", product: "all" });
    }
    setSelected({ ...selected });
  }

  function update() {
    const newIngredientsData = {};
    const newProductsData = {};

    if (selected.ingredient === "decrease") {
      Object.entries(props.data).forEach(([id, amount]) => {
        Object.assign(newIngredientsData, {
          [id]: {
            stock: props.ingredients[id].stock - amount,
            used: props.ingredients[id].used + amount,
          },
        });
      });
    } else if (selected.ingredient === "increase") {
      Object.entries(props.data).forEach(([id, amount]) => {
        Object.assign(newIngredientsData, {
          [id]: {
            stock: props.ingredients[id].stock + amount,
          },
        });
      });
    } else if (selected.ingredient === "used") {
      Object.entries(props.data).forEach(([id, amount]) => {
        Object.assign(newIngredientsData, {
          [id]: {
            used: props.ingredients[id].used + amount,
          },
        });
      });
    }

    if (selected.product === "increase") {
      const id = props.productId;
      Object.assign(newProductsData, {
        [id]: {
          stock: props.productsObj[id].stock + props.productAmount,
        },
      });
    } else if (selected.product === "all") {
      Object.assign(newProductsData, {
        [props.productId]: {
          stock: props.productAmount,
        },
      });
    }

    Api.updateProduct("", "", newProductsData).then(() => {
      props.providerRef.current.enqueueSnackbar("更新產品庫存！", {
        variant: "success",
      });
      if (selected.ingredient !== "unchanged") {
        Api.updateIngredients("", "", newIngredientsData).then(() => {
          props.providerRef.current.enqueueSnackbar("更新食材庫存！", {
            variant: "success",
          });
          isLoading = false;
          props.reset();
          handleClose();
        });
      } else {
        isLoading = false;
        props.reset();
        handleClose();
      }
    });
  }

  useEffect(() => {
    if (Object.keys(selected).length !== 0 && !isLoading) {
      isLoading = true;
      update();
    }
  }, [selected]);

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
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
                disabled={!canDecreaseIngredientStock()}
              />
              <UpdateOption
                label="新增庫存"
                color={options.ingredient.increase ? "secondary" : ""}
                onClick={() => handleClickOptions("ingredient", "increase")}
              />
              <UpdateOption
                label="做為已使用"
                color={options.ingredient.used ? "secondary" : ""}
                onClick={() => handleClickOptions("ingredient", "used")}
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
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={handleConfirmUpdate} color="secondary" autoFocus>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
}
