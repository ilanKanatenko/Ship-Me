import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

const StyledInput = styled.input`
  padding-right: 49px;
  border-radius: 100px;
  /* height: 33px; */
`;
const SearchIcon = styled(FaSearch)`
  position: relative;
  right: 27px;
  top: 3px;
`;
const SearchInput = (props) => {
  return (
    <>
      <StyledInput
        className={props.className}
        onChange={(e) => props.onChange(e)}
        value={props.value}
        placeholder="search  "
      />
      <SearchIcon />
    </>
  );
};

export default SearchInput;
