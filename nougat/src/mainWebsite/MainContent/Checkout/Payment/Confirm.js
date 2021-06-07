import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Api from "../../../../utils/Api";
import updateProductStock from "../../../../utils/updateProductStock";
import Loading from "../../../../Components/LoadingPage";
import { useConfirmCheckout } from "../../../../Hooks/useAlert";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Confirm() {
  const order = JSON.parse(window.localStorage.getItem("order"));
  const member = useSelector((state) => state.member);
  const allProducts = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(true);
  const confirmAlert = useConfirmCheckout(
    `您的訂單編號為：${useQuery().get("orderId")}`
  );

  useEffect(() => {
    if (allProducts.length !== 0 && member) {
      setIsLoading(false);
    }
  }, [allProducts, member]);

  useEffect(() => {
    if (!isLoading && order) {
      order.status = 1;
      order.order_info.delivery_time = new Date(order.order_info.delivery_time);
      order.timestamp = new Date(order.timestamp);
      Api.postCheckoutOrder(order, member, (order) =>
        updateProductStock(order, allProducts)
      ).then(() => confirmAlert());
    }

    if (!isLoading && !order) {
      confirmAlert();
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  } else {
    return <></>;
  }
}

export default Confirm;
