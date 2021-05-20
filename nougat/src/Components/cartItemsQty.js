import styled from "styled-components";
import Api from "../utils/Api";
import qtyOptions from "../utils/qtyOptions";
import { useSelector, useDispatch } from "react-redux";
import { updateMember } from "../redux/actions/member";

const QuantityBar = styled.div`
  margin: 0;
  padding: 0 10px;
  width: auto;
  flex-grow: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  border: 1px solid #979797;
  font-size: 20px;
`;

const Select = styled.select``;
const Option = styled.option``;

function QuantityBtn(props) {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);

  function handleChange(event) {
    const cartItems = member.cart_items;
    const product = cartItems.find(
      (cartItem) => cartItem.id === props.productId
    );
    product.qty = Number(event.target.value);
    product.total = product.qty * product.price;
    Api.updateMember(member.id, "cart_items", cartItems);
    dispatch(updateMember("cart_items", cartItems));
  }

  return (
    <QuantityBar>
      <Select onChange={handleChange}>
        {qtyOptions(props.stock).map((option) =>
          option === props.qty.toFixed(1) ? (
            <Option value={option} selected>
              {option}
            </Option>
          ) : (
            <Option value={option}>{option}</Option>
          )
        )}
      </Select>
      斤
    </QuantityBar>
  );
}

export default QuantityBtn;
