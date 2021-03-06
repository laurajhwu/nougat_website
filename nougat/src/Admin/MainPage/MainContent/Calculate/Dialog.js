import React, { useState, useEffect } from "react";
import Api from "../../../../utils/Api";
import propTypes from "prop-types";

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
  const {
    handleClose,
    data,
    ingredients,
    productId,
    productsObj,
    productAmount,
    providerRef,
    reset,
    open,
  } = props;
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

  function handleCloseDialog() {
    setOptions(initOptionsState);
    setSelected({});
    handleClose();
  }

  function canDecreaseIngredientStock() {
    if (data) {
      return Object.entries(data).every(
        ([id, amount]) => ingredients[id].stock >= amount
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
      Object.entries(data).forEach(([id, amount]) => {
        Object.assign(newIngredientsData, {
          [id]: {
            stock: ingredients[id].stock - amount,
            used: ingredients[id].used + amount,
          },
        });
      });
    } else if (selected.ingredient === "increase") {
      Object.entries(data).forEach(([id, amount]) => {
        Object.assign(newIngredientsData, {
          [id]: {
            stock: ingredients[id].stock + amount,
          },
        });
      });
    } else if (selected.ingredient === "used") {
      Object.entries(data).forEach(([id, amount]) => {
        Object.assign(newIngredientsData, {
          [id]: {
            used: ingredients[id].used + amount,
          },
        });
      });
    }

    if (selected.product === "increase") {
      const id = productId;
      Object.assign(newProductsData, {
        [id]: {
          stock: productsObj[id].stock + productAmount,
        },
      });
    } else if (selected.product === "all") {
      Object.assign(newProductsData, {
        [productId]: {
          stock: productAmount,
        },
      });
    }

    Api.updateProduct("", "", newProductsData).then(() => {
      providerRef.current.enqueueSnackbar("?????????????????????", {
        variant: "success",
      });
      if (selected.ingredient !== "unchanged") {
        Api.updateIngredients("", "", newIngredientsData).then(() => {
          providerRef.current.enqueueSnackbar("?????????????????????", {
            variant: "success",
          });
          isLoading = false;
          reset();
          handleCloseDialog();
        });
      } else {
        isLoading = false;
        reset();
        handleCloseDialog();
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
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"??????????????????"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <UpdateSection>
            <UpdateContent>????????????</UpdateContent>
            <UpdateOptions>
              <UpdateOption
                label={
                  canDecreaseIngredientStock()
                    ? "?????????????????????"
                    : "?????????????????????????????????"
                }
                color={options.ingredient.decrease ? "secondary" : ""}
                onClick={() => handleClickOptions("ingredient", "decrease")}
                disabled={!canDecreaseIngredientStock()}
              />
              <UpdateOption
                label="???????????????"
                color={options.ingredient.increase ? "secondary" : ""}
                onClick={() => handleClickOptions("ingredient", "increase")}
              />
              <UpdateOption
                label="?????????"
                color={options.ingredient.used ? "secondary" : ""}
                onClick={() => handleClickOptions("ingredient", "used")}
              />
              <UpdateOption
                label="?????????"
                color={options.ingredient.unchanged ? "secondary" : ""}
                onClick={() => handleClickOptions("ingredient", "unchanged")}
              />
            </UpdateOptions>
          </UpdateSection>
          <UpdateSection>
            <UpdateContent>????????????</UpdateContent>
            <UpdateOptions>
              <UpdateOption
                label="????????????"
                color={options.product.increase ? "secondary" : ""}
                onClick={() => handleClickOptions("product", "increase")}
              />
              <UpdateOption
                label="??????????????????"
                color={options.product.all ? "secondary" : ""}
                onClick={() => handleClickOptions("product", "all")}
              />
            </UpdateOptions>
          </UpdateSection>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          ??????
        </Button>
        <Button onClick={handleConfirmUpdate} color="secondary" autoFocus>
          ??????
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UpdateStockDialog.propTypes = {
  handleClose: propTypes.func,
  data: propTypes.object,
  ingredients: propTypes.object,
  productId: propTypes.string,
  productsObj: propTypes.object,
  productAmount: propTypes.number,
  providerRef: propTypes.node,
  reset: propTypes.func,
  open: propTypes.bool,
};
