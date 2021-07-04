import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { sendReq } from "../shared/SendRequest";

const PError = styled.p`
  margin: 0px;
  margin-top: 10px;
  font-size: 1.1rem;
  color: red;
`;

const InputSubmit = styled.input`
  display: inline-block;
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
  }
`;

const InputField = styled.input`
  align-items: center;
  justify-content: flex-start;
  height: 2rem;
  width: 100%;
`;

const FormDiv = styled.div`
  margin: auto;
  text-align: left;
  max-width: 80%;
`;

const NameDiv = styled.div`
  display: table;
  width: 100%;
`;

const ColDivL = styled.div`
  display: table-cell;
  width: 40%;
  float: left;
`;

const ColDivR = styled.div`
  display: table-cell;
  width: 40%;
  float: right;
`;

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    if (data["confirmPassword"] === data["password"]) {
      const response = await sendReq(
        "http://localhost:4000/api/user",
        "post",
        data
      );
      console.log("whats the response aaaaaa", response);
      if (response.status === 200) {
        dispatch(authActions.login(response.data));
        history.push("/");
      }
    } else {
      console.log("the passwords aren't equal");
    }
  };

  return (
    <FormDiv>
      <form onSubmit={handleSubmit(onSubmit)}>
        <NameDiv>
          <ColDivL>
            <label htmlFor="firstName">First Name</label>
            <br></br>
            <InputField {...register("firstName", { required: true })} />{" "}
            {/* register an input */}
            <br />
            {errors["firstName"] && <PError>firstName is required.</PError>}
            <br></br>
          </ColDivL>
          <ColDivR>
            <label htmlFor="lastName">Last Name</label>
            <br></br>
            <InputField {...register("lastName", { required: true })} />
            <br />
            {errors["lastName"] && <PError>lastName is required.</PError>}
            <br></br>
          </ColDivR>
        </NameDiv>
        <label htmlFor="email">Email address</label>
        <br></br>
        <InputField {...register("email", { required: true })} />{" "}
        {/* register an input */}
        <br />
        {errors["email"] && <PError>email address is required.</PError>}
        <br></br>
        <label htmlFor="password">password</label>
        <br></br>
        <InputField
          {...register("password", {
            pattern:
              /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/i,
            required: true,
          })}
        />
        <br />
        {errors?.password?.type === "pattern" ? (
          <PError>
            Password must contain one capital letter, one number and one special
            sign (!@#$%^&*)
          </PError>
        ) : (
          errors["password"] && <PError>Password is required.</PError>
        )}
        {/* {errors["password"] && <PError>password is required.</PError>} */}
        {/* {errors?.password?.type === "pattern" && (
          <PError>
            password must contain one capital letter, one number and one special
            sign (!@#$%^&*)
          </PError>
        )} */}
        {/* {errors.password && <PError>password is required.</PError>} */}
        <br></br>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <br></br>
        <InputField
          {...register("confirmPassword", {
            pattern:
              /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/i,
            required: true,
          })}
        />
        <br />
        {errors?.confirmPassword?.type === "pattern" ? (
          <PError>
            Confirm Password must contain one capital letter, one number and one
            special sign (!@#$%^&*)
          </PError>
        ) : (
          errors["confirmPassword"] && (
            <PError>Confirm Password is required.</PError>
          )
        )}
        <br></br>
        <InputSubmit type="submit" value="Log In" />
      </form>
    </FormDiv>
  );
};

export default SignUp;
