import styled from "styled-components";
import { Filter } from "@styled-icons/bootstrap";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
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
`;

export const FilterOption = styled.option``;

export const InputArea = styled.div`
  position: absolute;
  top: -15px;
  left: 120px;
`;

export const SelectArea = styled.div`
  margin-left: 20px;
  width: 100px;
`;
