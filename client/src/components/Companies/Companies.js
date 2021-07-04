import styled from "styled-components";
import img_avtr from "../../images/img_avtr.png";
import { FaEllipsisH } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCallback, Fragment } from "react";
import { useEffect } from "react";
import axios from "axios";
import { SendRequest } from "../shared/SendRequest";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

// const PError = styled.p`
//   margin: 0px;
//   margin-top: 10px;
//   font-size: 1.1rem;
//   color: red;
// `;

const InputSubmit = styled.input`
  display: inline-block;
  color: ${(props) => (props ? props.color : "unset")};
  width: 103%;
  border-radius: 2em;
  height: 2.5rem;
  background-color: #6f91a8;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
  transition: all 0.2s;
  margin-bottom: 10px;
  :hover {
    color: #000000;
    background-color: #92aac0;
    cursor: pointer;
  }
`;

const FormTable = styled.table`
  margin: auto;
  table-layout: auto;
  text-align: left;
  min-height: 30vh;
  width: 95%;
  /* max-width: 40%; */

  border-spacing: 15px;
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* flex: 1; */

  /* table-layout: fixed; */
  /* 
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd; */
`;

const Td = styled.td`
  column-span: ${(props) => (props.colSpan ? props.colSpan : "unset")};
  text-align: ${(props) => (props.TextAlign ? props.TextAlign : "unset")};
`;

const Hr = styled.hr`
  margin: 0;
`;

const AvtrImg = styled.img`
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const FaDots = styled(FaEllipsisH)`
  font-size: 1.6rem;
  :hover {
    cursor: pointer;
  }
  :active {
    /* box-shadow: 0 5px #666; */
    transform: translateY(4px);
  }
`;

const DivTable = styled.div`
  overflow-x: auto;
`;

// const GlobalStyle = createGlobalStyle`
//   @media(min-width: 768px)   {
//       table, tbody, th , td ,te{}
//     background: mediumseagreen;
//     color: papayawhip;
//   }
// `;

const DropDownDiv = styled.div`
  /* font-size: 17px;
  color: white; */
  float: right;
  overflow: hidden;
`;

const DropDownContent = styled.div`
  display: ${(props) => (props.Display === props.value ? "block" : "none")};
  position: absolute;
  background-color: #f1f1f1;
  min-width: 200px;
  box-shadow: 0px 8px 16px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 20px;
  /* top: 60px;
  right: 5px; */
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

const Companies = () => {
  const [showDropDown, setShowDropDown] = useState("");
  const [companies, setCompanies] = useState([{}]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getAllCompanies() {
      const response = await SendRequest(
        "http://localhost:4000/api/companies",
        "get",
        dispatch(authActions.logout())
      );

      console.log("Companies response", response);
      // if (response.status === 401) {
      //   dispatch(authActions.logout());
      // }
      setCompanies(Object.values(response.data));
    }
    getAllCompanies();
  }, []);

  const handleProfileClick = (event) => {
    event.preventDefault();
    if (event.target.getAttribute("value") === showDropDown) {
      setShowDropDown((prevValues) => {
        return event.target.getAttribute("");
      });
      console.log("1");
      document.removeEventListener("click", memorizeClosing);
    } else {
      setShowDropDown((prevValues) => {
        return event.target.getAttribute("value");
      });
      console.log("2");
      document.addEventListener("click", memorizeClosing);
    }
  };
  const memorizeClosing = useCallback((event) => {
    handleClosingProfile(event);
  }, []);

  const handleClosingProfile = (event) => {
    // if (
    //   event.target.attributes.value &&
    //   event.target.attributes.value.value === "image"
    // ) {
    //   return;
    // }
    // console.log(showDropDown);
    // setShowDropDown(event.target.getAttribute("value"));
    // setShowDropDown("");
    console.log("3");

    if (event.target.getAttribute("actionclick")) {
      return;
    }
    // if (event.target.getAttribute("value") === showDropDown) {
    //   console.log("bbbbb");
    //   return;
    // }
    console.log("4");
    setShowDropDown(event.target.getAttribute("value"));
    document.removeEventListener("click", memorizeClosing);
  };
  console.log(companies);

  async function handleDeleteCompany(event) {
    event.stopPropagation();
    const id = event.target.getAttribute("value");
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    const response = await SendRequest(
      `http://localhost:4000/api/company/${id}`,
      "delete"
    );

    setShowDropDown("");
  }

  return (
    <DivTable>
      <FormTable>
        <tbody>
          {/* <NameDiv> */}
          <tr>
            <Td colSpan="2" TextAlign="center">
              <h1 style={{ marginBottom: "0" }}>New Company</h1>
            </Td>
            <td colSpan="5"></td>

            <Td colSpan="2">
              <NavLink to="/company">
                <InputSubmit
                  type="button"
                  color="white"
                  value="Add new company"
                />
              </NavLink>
            </Td>
          </tr>

          <tr>
            <th>
              <span>ID</span>
            </th>
            <th>
              <span>Company name</span>
            </th>
            <th>
              <span>Phone</span>
            </th>
            <th>
              <span>Website</span>
            </th>
            <th>
              <span>Address</span>
            </th>
            <th>
              <span>Number of devices</span>
            </th>
            <th>
              <span>Primary contact</span>
            </th>
            <th>
              <span>Contact Phone</span>
            </th>
            <th>
              <span>Actions</span>
            </th>
          </tr>
          {companies &&
            companies.map((company) => (
              <Fragment key={company._id}>
                <tr key={company._id}>
                  <Td colSpan="9">
                    <Hr></Hr>
                  </Td>
                </tr>
                <tr>
                  <Td>
                    <span>{company._id} </span>
                  </Td>
                  <Td>
                    <AvtrImg src={img_avtr} alt="avatar "></AvtrImg>
                    <span>{company.name}</span>
                  </Td>
                  <Td>
                    <span>{company.phone}</span>
                  </Td>
                  <Td>
                    <span>{company.website}</span>
                  </Td>
                  <Td>
                    <span>{company.address}</span>
                  </Td>
                  <Td>
                    <span>3</span>
                  </Td>
                  <Td>
                    <span>{company.primaryContactName}</span>
                  </Td>
                  <Td>
                    <span>{company.primaryContactPhone} </span>
                  </Td>
                  <Td TextAlign="center">
                    <DropDownDiv>
                      <FaDots
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        actionclick="true"
                        value={company._id}
                        onClick={(e) => handleProfileClick(e)}
                      ></FaDots>
                      <DropDownContent
                        value={company._id}
                        Display={showDropDown}
                      >
                        <DropDownLink to={`/company/edit/${company._id}`}>
                          Edit company
                        </DropDownLink>
                        <hr></hr>
                        <DropDownLink to={`/account/${company._id}`}>
                          Edit account
                        </DropDownLink>
                        <hr></hr>
                        <DropDownLink
                          value={company._id}
                          onClick={(e) => handleDeleteCompany(e)}
                          to={`#`}
                        >
                          Delete
                        </DropDownLink>
                      </DropDownContent>
                    </DropDownDiv>
                  </Td>

                  {/* <Td TextAlign="center">
            {" "}
            <AvtrImg src={img_avtr} alt="avatar "></AvtrImg>
          </Td>
          <Td colSpan="2"></Td> */}
                </tr>
              </Fragment>
            ))}

          {/* </NameDiv> */}
        </tbody>
      </FormTable>
    </DivTable>
  );
};

export default Companies;
