import styled from "styled-components";
import Form from "react-bootstrap/Form";

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

// const Select = styled(FormControl)``;
const Select = styled.select``;
const Option = styled.option``;
// const Button = styled.button`
//   border: none;
//   background-color: transparent;
//   font-size: 20px;
//   font-weight: 700;
//   padding: 1px 6px;
//   outline: none;
//   &:hover {
//     cursor: pointer;
//   }
// `;

// const QuantityNum = styled.span`
//   color: #8b572a;
// `;

function QuantityBtn(props) {
  function options() {
    let options = [];
    for (let i = 0.5; i <= props.stock; i += 0.5) {
      options = [...options, i.toFixed(1)];
    }
    return options;
  }

  function handleChange(event) {
    props.setQty(Number(event.target.value));
  }

  return (
    <QuantityBar>
      <Select onChange={handleChange}>
        {options().map((option) =>
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
