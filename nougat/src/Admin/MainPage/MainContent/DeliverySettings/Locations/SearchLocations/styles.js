import styled from "styled-components";
import { GlobeSearch } from "@styled-icons/fluentui-system-regular";
import { TextField } from "@material-ui/core";

export const Search = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`;

export const SearchIcon = styled(GlobeSearch)`
  width: 25px;
`;

export const SearchInput = styled(TextField)`
  width: 400px;
  & ${".MuiOutlinedInput-root.Mui-focused fieldset"} {
    border-color: #420039;
  }
  & ${"label.Mui-focused"} {
    color: #420039;
  }
`;

export const SearchLabel = styled.label`
  font-size: 20px;
  &:focus * {
    color: #420039;
  }
`;

export const Suggestions = styled.div`
  width: 400px;
  margin-top: 15px;
`;

export const Suggestion = styled.div`
  width: 100%;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;
