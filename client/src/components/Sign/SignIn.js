import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { authActions } from "../../store/auth";

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

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const response = await axios.get("http://localhost:4000/api/user", {
      params: { ...data },
    });
    const { company } = response.data;

    if (response.status === 200) {
      if (company.length > 1) {
        history.push({
          pathname: "/select-company",
          userData: { ...response.data },
        });
        return;
      } else {
        dispatch(authActions.login(response.data));
        history.push("/");
      }
    } else {
      console.log("email or password are incorrect ");
    }
  };

  return (
    <FormDiv>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email address</label>
        <br></br>
        <InputField {...register("email", { required: true })} />{" "}
        {/* register an input */}
        <br />
        {errors["email"] && <PError>Email address is required.</PError>}
        <br></br>
        <label htmlFor="password">Password</label>
        <br></br>
        <InputField {...register("password", { required: true })} />
        <br />
        {errors.password && <PError>Password is required.</PError>}
        <br></br>
        <InputSubmit type="submit" value="Log In" />
      </form>
    </FormDiv>
  );
};

export default SignIn;
