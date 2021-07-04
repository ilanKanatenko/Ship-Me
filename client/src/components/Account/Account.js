import styled from "styled-components";
import img_avtr from "../../images/img_avtr.png";
// import { FaEllipsisH } from "react-icons/fa";
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
import axios from "axios";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import { SendRequest } from "../shared/SendRequest";

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

const LeftDiv = styled.div`
  float: left;
  width: 60%;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  margin-top: 20px;
`;

const RightDiv = styled.div`
  float: right;
  width: 40%;
  margin-top: 20px;
  margin-right: 20px;
  /* height: 100%; */
`;

const Table = styled.table`
  /* margin: 0; */
  /* table-layout: fixed; */
  width: 100%;
  text-align: left;

  /* float: right;
  width: 40%;
  margin-top: 20px; */
`;
const InnerTable = styled.table`
  text-align: left;
  width: 100%;
  /* float: right;
  width: 40%;
  margin-top: 20px; */
  border-collapse: collapse;
  border: 1px solid gray;
  height: 6vh;
  table-layout: fixed;
`;

const Td = styled.td`
  column-span: ${(props) => (props.colSpan ? props.colSpan : "unset")};
  text-align: ${(props) => (props.TextAlign ? props.TextAlign : "unset")};
  vertical-align: ${(props) =>
    props.verticalAlign ? props.verticalAlign : "inherit"};
`;

const VerticalLine = styled.div`
  border-left: 1px solid #dddddd;
  height: 50vh;
  position: absolute;
  left: 55%;
  top: 35%;
  /* margin-left: -3px; */
`;

const FaDots = styled(FaEllipsisH)`
  font-size: 1.6rem;

  position: relative;
  top: 1vh;
  :hover {
    cursor: pointer;
  }
  :active {
    /* box-shadow: 0 5px #666; */
    transform: translateY(4px);
  }
`;

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

const AvtrImg = styled.img`
  vertical-align: middle;
  width: 30px;
  position: relative;
  top: 1vh;
  left: 1vw;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Account = () => {
  const [showDropDown, setShowDropDown] = useState("");
  const [users, setUsers] = useState([{}]);
  useEffect(() => {
    async function getAllCompanies() {
      const response = await SendRequest(
        "http://localhost:4000/api/users",
        "get"
      );
      setUsers(Object.values(response.data));
    }
    getAllCompanies();
  }, []);

  const handleProfileClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target);
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
  console.log(users);

  async function handleDeleteUser(event) {
    event.stopPropagation();
    const id = event.target.getAttribute("value");
    const response = await SendRequest(
      `http://localhost:4000/api/user/${id}`,
      "delete"
    );

    setShowDropDown("");
  }

  return (
    <>
      <VerticalLine />
      <LeftDiv>
        <span>Users</span>
      </LeftDiv>
      <RightDiv>
        <Table>
          <tbody>
            <tr>
              <Td>
                <h1>Users</h1>
              </Td>
            </tr>
            <tr>
              <Td>
                <input defaultValue="search" />
              </Td>
              <Td>
                <NavLink to="/profile">
                  <InputSubmit type="button" color="white" value="Add User" />
                </NavLink>
              </Td>
            </tr>

            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <Td colSpan="2">
                    <InnerTable>
                      <tbody>
                        <tr>
                          <Td verticalAlign="baseline">
                            <AvtrImg src={img_avtr} alt="avatar "></AvtrImg>
                          </Td>
                          <Td verticalAlign="baseline">
                            <span>
                              {` ${user.firstName}
                              ${user.lastName}`}
                            </span>
                          </Td>
                          <Td verticalAlign="top" TextAlign="center">
                            <DropDownDiv>
                              <FaDots
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                }}
                                actionclick="true"
                                value={user._id}
                                onClick={(e) => handleProfileClick(e)}
                              ></FaDots>
                              <DropDownContent
                                value={user._id}
                                Display={showDropDown}
                              >
                                <DropDownLink to={`/profile/edit/${user._id}`}>
                                  Edit user
                                </DropDownLink>

                                <hr></hr>
                                <DropDownLink
                                  value={user._id}
                                  onClick={(e) => handleDeleteUser(e)}
                                  to={`#`}
                                >
                                  Delete
                                </DropDownLink>
                              </DropDownContent>
                            </DropDownDiv>
                          </Td>
                        </tr>
                        <tr>
                          <Td></Td>
                          <Td verticalAlign="baseline">
                            <span>{user.jobTitle}</span>
                          </Td>
                        </tr>
                      </tbody>
                    </InnerTable>
                  </Td>
                </tr>
              ))}
          </tbody>
        </Table>
      </RightDiv>
    </>
  );
};

export default Account;
