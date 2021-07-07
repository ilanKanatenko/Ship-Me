import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LineLogo from "../../images/line_logo.png";
import LogoText from "../LogoText/LogoText";
import { FaBell } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import { authActions } from "../../store/auth";

// const LiLeft = styled.li`
//   float: left;
//   display: block;
//   color: white;
//   text-align: center;
//   padding: 14px 16px;
//   text-decoration: none;
//   height: 50px;
//   box-sizing: border-box;
//   :hover {
//     background-color: #6b8499;
//   }
// `;

const LiRight = styled.div`
  float: right;
  box-sizing: border-box;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  height: 50px;

  :hover {
    cursor: pointer;
    background-color: #596996;
  }
`;
//#6b8499

const Ul = styled.div`
  overflow: hidden;
  background-color: #222e50;
`;
//#476a81
const StyledNavLink = styled(NavLink)`
  color: ${(props) => (props.color ? props.color : "white")};
  float: ${(props) => (props.float ? props.float : "left")};
  text-decoration: none;
  display: block;
  text-align: center;
  padding: 14px 16px;
  height: 50px;
  box-sizing: border-box;
  :hover {
    background-color: #6b8499;
  }
`;

const DropDownDiv = styled.div`
  /* font-size: 17px;
  color: white; */
  float: right;
  overflow: hidden;
`;

const DropDownContent = styled.div`
  display: ${(props) => (props.Display ? "block" : "none")};
  position: absolute;
  background-color: #f1f1f1;
  min-width: 200px;
  box-shadow: 0px 8px 16px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 60px;
  right: 5px;
`;

const DropDownLink = styled(NavLink)`
  color: black;
  float: ${(props) => (props.float ? props.float : "left")};
  text-decoration: none;
  text-align: left;
  float: none;
  display: block;
  padding: 14px 16px;
  height: 50px;
  box-sizing: border-box;
  :hover {
    background-color: #6b8499;
  }
`;

const StickyDiv = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%; */
`;

// const BrandDiv = styled.div`
//   border-right: 1px solid #bbb;
// `;

const MainNavBar = () => {
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const handleProfileClick = (event) => {
    event.stopPropagation();
    setShowDropDown(!showDropDown);
    document.addEventListener("click", handleClosingProfile);
  };

  const handleClosingProfile = (event) => {
    if (
      event.target.attributes.value &&
      event.target.attributes.value.value === "image"
    ) {
      return;
    }
    setShowDropDown(false);
    document.removeEventListener("click", handleClosingProfile);
  };

  return (
    <StickyDiv>
      <Ul>
        {/* <BrandDiv> */}
        <StyledNavLink exact to="/">
          <LogoText src={LineLogo} text="" />
        </StyledNavLink>
        {/* </BrandDiv> */}
        <StyledNavLink
          exact
          onClick={() => {
            dispatch(uiActions.secondaryNavBarOff());
          }}
          activeStyle={{
            borderBottom: "3px solid #79a9d1",
          }}
          to="/shipments"
        >
          Shipments
        </StyledNavLink>
        <StyledNavLink
          exact
          onClick={() => {
            dispatch(uiActions.secondaryNavBarOff());
          }}
          activeStyle={{
            borderBottom: "3px solid #79a9d1",
          }}
          to="/order"
        >
          Orders
        </StyledNavLink>
        <DropDownDiv>
          <LiRight value="image" onClick={(e) => handleProfileClick(e)}>
            <FaChevronDown />
            img
          </LiRight>
          <DropDownContent Display={showDropDown}>
            <DropDownLink
              onClick={() => {
                dispatch(uiActions.secondaryNavBarOn());
              }}
              to="/profile/edit"
            >
              Profile
            </DropDownLink>
            <DropDownLink
              onClick={() => {
                dispatch(uiActions.secondaryNavBarOn());
              }}
              to="/company/edit"
            >
              Company
            </DropDownLink>
            <DropDownLink
              onClick={() => {
                dispatch(uiActions.secondaryNavBarOn());
              }}
              to="/account"
            >
              Account
            </DropDownLink>
            <hr></hr>
            <DropDownLink
              onClick={() => {
                dispatch(uiActions.secondaryNavBarOn());
              }}
              to="/companies"
            >
              Companies
            </DropDownLink>
            <hr></hr>
            {/* #TODO logout page clear state and redirect to home page */}
            <DropDownLink
              onClick={() => {
                dispatch(authActions.logout());
              }}
              to="#"
            >
              Logout
            </DropDownLink>
          </DropDownContent>
        </DropDownDiv>
        <StyledNavLink float="right" color="black" exact to="/aaaa">
          <FaBell />
        </StyledNavLink>
      </Ul>
    </StickyDiv>
  );
};

export default MainNavBar;
