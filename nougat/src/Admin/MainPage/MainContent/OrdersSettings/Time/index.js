import React, { useState } from "react";
import { stringDate, stringTime } from "../../../../../utils/dateTimeFormat";
import Calendar from "../../../../../MainWebsite/MainContent/Checkout/Time/Calendar";
import Api from "../../../../../utils/Api";
import { DateTime, Change, Done, CancelIcon } from "./styles";
import propTypes from "prop-types";

export default function Time(props) {
  const { order } = props;
  const [edit, setEdit] = useState(false);
  const [dateTime, setDateTime] = useState(
    order.order_info.delivery_time.toDate()
  );
  const date = stringDate(order.order_info.delivery_time.toDate());
  const time = stringTime(order.order_info.delivery_time.toDate());

  function handleChangeTime() {
    setEdit(true);
  }

  function handleFinishChange() {
    Api.updateOrder(order.id, { "order_info.delivery_time": dateTime }).then(
      () => setEdit(false)
    );
  }

  function handleCancel() {
    setEdit(false);
  }

  return (
    <>
      {edit ? (
        <DateTime>
          <Calendar date={dateTime} setDate={setDateTime} />
          <Done onClick={handleFinishChange} />
          <CancelIcon onClick={handleCancel} />
        </DateTime>
      ) : (
        <DateTime>
          <div>{date}</div>
          <div>{time}</div>
          <Change onClick={handleChangeTime} />
        </DateTime>
      )}
    </>
  );
}

Time.propTypes = {
  order: propTypes.object,
};
