import React from "react";
import Api from "../../utils/Api";
import propTypes from "prop-types";

import { DeleteIcon } from "./styles";

export default function Delete(props) {
  const { member, isClickedRef, productId, setIsClicked, styles } = props;
  function deleteOnClick() {
    const cartItems = member.cart_items.filter((item) => item.id !== productId);

    if (isClickedRef) {
      isClickedRef.current = false;
    }

    Api.updateMember(member.id, "cart_items", cartItems).then(() => {
      setIsClicked && setIsClicked(false);
    });
  }

  return <DeleteIcon onClick={deleteOnClick} styles={styles}></DeleteIcon>;
}

Delete.propTypes = {
  member: propTypes.object,
  isClickedRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.bool }),
  ]),
  productId: propTypes.string,
  setIsClicked: propTypes.func,
  styles: propTypes.object,
};
