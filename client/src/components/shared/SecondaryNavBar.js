import { NavLink } from "react-router-dom";
import styled from "styled-components";
// import LineLogo from "../../images/line_logo.png";
// import LogoText from "../LogoText/LogoText";
// import { FaBell } from "react-icons/fa";
// import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";

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

const Ul = styled.div`
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 8px 3px 0px rgba(0, 0, 0, 0.2);
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  float: ${(props) => (props.float ? props.float : "left")};
  text-decoration: none;
  display: block;
  text-align: center;
  padding: 14px 16px;
  height: 50px;
  box-sizing: border-box;
  :hover {
    background-color: #596996;
  }
`;

//#596996
// const BrandDiv = styled.div`
//   border-right: 1px solid #bbb;
// `;

const MainNavBar = () => {
  // const handleProfileClick = (event) => {
  //   console.log(event.target);
  // };
  // const showNavBar = useSelector((state) => state.ui.showSecondaryNav);

  return (
    <>
      <div>
        <Ul>
          {/* <StyledNavLink exact to="/" activeStyle={{}}>
          <LogoText src={LineLogo} text="" />
        </StyledNavLink> */}
          <StyledNavLink
            exact
            activeStyle={{
              borderBottom: "3px solid #79a9d1",
            }}
            to="/profile/edit"
          >
            Profile
          </StyledNavLink>
          <StyledNavLink
            exact
            activeStyle={{
              borderBottom: "3px solid #79a9d1",
            }}
            to="/company/edit"
          >
            Company
          </StyledNavLink>
          <StyledNavLink
            exact
            activeStyle={{
              borderBottom: "3px solid #79a9d1",
            }}
            to="/account"
          >
            Account
          </StyledNavLink>
          <StyledNavLink
            exact
            activeStyle={{
              borderBottom: "3px solid #79a9d1",
            }}
            to="/companies"
          >
            Companies
          </StyledNavLink>
        </Ul>
      </div>
    </>
  );
};

export default MainNavBar;
