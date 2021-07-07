import styled from "styled-components";

const DivToast = styled.div`
  /* visibility: hidden; */
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: absolute;
  z-index: 1;
  left: 50%;
  font-size: 17px;
  position: absolute;
  bottom: 70px;
  left: 53%;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 2s;
`;

const Toast = (props) => {
  return (
    <>
      <DivToast show={props.show}>{props.text}</DivToast>
    </>
  );
};

export default Toast;
