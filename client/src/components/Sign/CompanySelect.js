import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { authActions } from "../../store/auth";
import React, { useState } from "react";

const PError = styled.p`
  margin: 0px;
  margin-top: 10px;
  font-size: 1.1rem;
  color: red;
`;

const InputSubmit = styled.input`
  display: inline-block;
  width: 101%;
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

const Select = styled.select`
  align-items: center;
  justify-content: flex-start;
  height: 2rem;
  width: 100%;
`;
const Option = styled.option``;

const CompanySelect = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let companies;
  let user;
  if (history.location.userData) {
    companies = history.location.userData.company;
    user = history.location.userData.user;
  }
  const [selectedValue, setSelectedValue] = useState(companies[0]._id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    const result = companies.find((obj) => {
      return obj._id === selectedValue;
    });

    dispatch(authActions.login({ user: user, company: result }));
    history.push("/");

    // const response = await axios.get("http://localhost:4000/api/user", {
    //   params: { ...data },
    // });
    // console.log("aaaaaaaaaaaaaaaaa");
    // console.log(response.status);
    // if (response.status === 200) {
    //   if (response.data.companies.length > 0) {
    //     history.push({
    //       pathname: "/select-company",
    //       user: { ...response.data },
    //     });
    //     return;
    //   } else {
    //     dispatch(authActions.login(response.data));
    //     history.push("/");
    //   }
    // } else {
    //   console.log("email or password are incorrect ");
    // }
  };

  return (
    <FormDiv>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          value={selectedValue}
          onInput={(e) => {
            // console.log(e.target.value);
            setSelectedValue(e.target.value);
          }}
          {...register("company", { required: true })}
          name="companies"
        >
          {companies.map((company) => (
            <Option key={company._id} value={company._id}>
              {company.name}
            </Option>
          ))}

          <Option value="com1">com1</Option>
          <Option value="com3">com3</Option>
        </Select>

        {/* <label htmlFor="email">Email address</label>
        <br></br>
        <InputField {...register("email", { required: true })} />{" "}
        <br />
        {errors["email"] && <PError>Email address is required.</PError>}
        <br></br>
        <label htmlFor="password">Password</label>
        <br></br>
        <InputField {...register("password", { required: true })} />
        <br />
        {errors.password && <PError>Password is required.</PError>} */}
        <br></br>
        <InputSubmit type="submit" value="Enter" />
      </form>
    </FormDiv>
  );
};
export default CompanySelect;
