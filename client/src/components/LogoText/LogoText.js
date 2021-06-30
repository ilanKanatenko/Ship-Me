import styled from "styled-components";

const Img = styled.img`
  object-fit: fill;
  width: 40%;
`;
const H2 = styled.h2`
  margin: 0px;
`;

const LogoText = ({ src, text }) => {
  console.log(src);
  return (
    <>
      <Img src={src} alt="logo"></Img>

      {text && <H2>{text}</H2>}
    </>
  );
};

export default LogoText;
