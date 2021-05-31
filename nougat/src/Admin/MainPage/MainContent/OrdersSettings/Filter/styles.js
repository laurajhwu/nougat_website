import styled from "styled-components";
import { Filter } from "@styled-icons/bootstrap";
import { SortDown, SortUp } from "@styled-icons/boxicons-regular";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
`;

export const FilterIcon = styled(Filter)`
  width: 25px;
  position: absolute;
  z-index: -1;
  top: 2px;
`;

export const FilterArea = styled.div`
  width: 100px;
  position: relative;
  margin-left: 10px;
`;

export const FilterOptions = styled.select`
  border: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  width: 100px;
  height: 30px;
  padding-left: 26px;
  background-color: transparent;
  outline: none;
  &:hover {
    cursor: pointer;
  }
  color: ${(props) => (props.filter ? "black" : "white")};
`;

export const FilterOption = styled.option``;

export const InputArea = styled.div`
  position: absolute;
  top: -15px;
  left: 120px;
`;

export const SelectArea = styled.div`
  width: 100px;
  position: absolute;
  top: 0px;
  left: 120px;
`;

export const SortArea = styled.div`
  display: flex;
`;

export const SortOption = styled.div`
  margin-left: 10px;
`;

export const SortDesc = styled(SortDown)`
  width: 25px;
  margin-right: 5px;
  color: ${(props) => (props.selected ? "blue" : "black")};
  &:hover {
    cursor: pointer;
  }
`;

export const SortAsc = styled(SortUp)`
  width: 25px;
  color: ${(props) => (props.selected ? "blue" : "black")};
  &:hover {
    cursor: pointer;
  }
`;
