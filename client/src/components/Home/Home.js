// import MainNavBar from "../shared/MainNavBar";
// import SecondaryNavBar from "../shared/SecondaryNavBar";
// import CompanyForm from "../Forms/CompanyForm";
// import Companies from "../Companies/Companies";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const LeftDiv = styled.div`
  float: left;
  width: 20%;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  margin-top: 20px;
`;

const RightDiv = styled.div`
  float: right;
  width: 70%;
  margin-top: 20px;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  /* height: 70vh; */
  /* height: 100%; */
`;

const VerticalLine = styled.div`
  border-left: 1px solid #dddddd;
  height: 100%;
  position: absolute;
  left: 25%;
  /* top: 35%; */
  /* margin-left: -3px; */
`;

const Home = () => {
  const history = useHistory();
  if (history.location.pathname !== "/shipments") {
    history.replace("/shipments");
  }
  //client id
  //301aeeb1ac56fcf
  //client secret
  //3792f503a5421830b9ec955b5899b243a751ceb9

  // let res = null;
  // const fetchImage = async () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Client-ID Ilan94");
  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };
  //   res = await fetch("https://api.imgur.com/3/image/VdjZNTp", requestOptions);
  //   return res;
  // };
  // res = fetchImage();
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <VerticalLine />
      <LeftDiv>{/* <span>Users</span> */}</LeftDiv>
      <RightDiv>
        {/* <img alt="user profile" src="https://i.imgur.com/VdjZNTp.jpg"></img> */}
        <h1>google maps will be here</h1>
      </RightDiv>
    </>
  );
};

export default Home;
