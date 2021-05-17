import styled from "styled-components";

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
  function options() {
    let options = [];
    for (let i = 0.5; i <= props.stock; i += 0.5) {
      options = [...options, i.toFixed(1)];
    }
    return options;
  }

  return (
    <QuantityBar>
      <Select onChange={props.handleChange} name={props.name}>
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
