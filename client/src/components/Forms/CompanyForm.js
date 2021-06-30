import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import img_avtr from "../../images/img_avtr.png";
import axios from "axios";
import { authActions } from "../../store/auth";
import { FaWindowClose } from "react-icons/fa";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const PError = styled.p`
  margin: 0px;
  margin-top: 10px;
  font-size: 1.1rem;
  color: red;
  white-space: nowrap;
`;

const InputSubmit = styled.input`
  display: inline-block;
  width: 103%;
  border-radius: 2em;
  height: 2.5rem;
  background-color: ${(props) => (props.BColor ? props.BColor : "#6f91a8")};
  padding: 0.35em 1.2em;
  /* border: 0.1em solid #ffffff; */
  border: ${(props) =>
    props.Border ? "1px solid black" : "0.1em solid #ffffff"};
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
  margin-bottom: 5vh;
  :hover {
    color: #000000;
    background-color: #92aac0;
  }
`;

const InputField = styled.input`
  /* align-items: center;
  justify-content: flex-start; */
  height: 2rem;
  width: 100%;
`;

const FormTable = styled.table`
  margin: auto;
  table-layout: fixed;
  text-align: left;
  min-height: 80vh;
  max-width: 40%;

  border-spacing: 10px;
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

const AvtrImg = styled.img`
  vertical-align: middle;
  width: 130px;
  height: 130px;
  border-radius: 50%;
`;

const Td = styled.td`
  column-span: ${(props) => (props.colSpan ? props.colSpan : "unset")};
  text-align: ${(props) => (props.TextAlign ? props.TextAlign : "unset")};
  vertical-align: ${(props) =>
    props.verticalAlign ? props.verticalAlign : "unset"};
`;
const WindowClose = styled(FaWindowClose)`
  font-size: 1.5rem;
  :hover {
    cursor: pointer;
  }
`;

const SaveButton = styled(InputSubmit)`
  position: relative;
  left: 0%;
  width: 25%;
  margin-bottom: 50px;
`;

const H1 = styled.h1`
  white-space: nowrap;
`;

const Label = styled.label`
  white-space: nowrap;
`;

const CompanyForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [companyData, setCompanyData] = useState(true);
  const ref = useRef({});
  ref.current = useSelector((state) => {
    if (history.location.pathname === "/company/edit") {
      return state.auth.company;
    }
    return { name: "" };
  });
  const { id } = useParams();

  const [newCompany, setNewCompany] = useState(true);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(history);

    async function getCompanyById() {
      const response = await axios.get(
        `http://localhost:4000/api/company/${id}`
      );
      setCompanyData({ ...response.data });
      console.log(response.data);
      return response.data;
    }

    if (history.location.pathname === "/company/edit") {
      setNewCompany(false);
      setCompanyData(ref.current);
      // console.log(Object.entries(ref.current));
      for (const [key, value] of Object.entries(ref.current)) {
        console.log(`${key}: ${value}`);
        setValue(key, value);
      }
    } else if (history.location.pathname !== "/company") {
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      setNewCompany(false);
      ref.current = getCompanyById();
    }
  }, [history, setValue, id]);
  // if (id) {
  //   companyData = ref.current;
  // }

  // if (history.location.pathname === "/company/edit") {
  //   setNewCompany(false);
  // }

  const onSubmit = async (data) => {
    console.log("ccccccccccc", data);
    // if (data["confirmPassword"] === data["password"]) {
    //   const response = await axios.put(
    //     "http://localhost:4000/api/company",
    //     data
    //   );
    // console.log(response);

    //## uncheck for data fetching
    if (newCompany) {
      // console.log("bbbbbbbbbbb", companyData, data);
      const response = await axios.post("http://localhost:4000/api/company", {
        ...data,
      });
    } else {
      const response = await axios.put("http://localhost:4000/api/company", {
        ...companyData,
        ...data,
      });
      if (response.status === 200) {
        if (!id) {
          dispatch(authActions.updateCompany({ ...companyData, ...data }));
        } else if (id === companyData._id) {
          dispatch(authActions.updateCompany({ ...companyData, ...data }));
        }
      }
    }

    // if (response.status === 200) {
    //   dispatch(authActions.update(response.data));
    //   // history.push("/");
    // } else {
    //   console.log("the passwords aren't equal");
    // }
  };

  // if (props.type === "exist") {
  //   companyData = {};
  // }
  // if (newCompany) {
  //   companyData = {};
  // }

  const handlePreviousPage = () => {
    history.goBack();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", companyData)}
      <FormTable>
        <tbody>
          {/* <NameDiv> */}
          <tr>
            <Td TextAlign="center">
              <H1 style={{ marginBottom: "0" }}>
                {" "}
                {newCompany ? "New Company" : "Company info"}
              </H1>
            </Td>
            {newCompany && (
              <Td verticalAlign="bottom" colSpan="2" TextAlign="end">
                <WindowClose onClick={(e) => handlePreviousPage()} />
              </Td>
            )}
          </tr>
          <tr>
            <Td TextAlign="center">
              {" "}
              {/* <ImgDiv> */}
              <AvtrImg src={img_avtr} alt="avatar "></AvtrImg>
              {/* </ImgDiv> */}
            </Td>
            <Td verticalAlign="top" colSpan="2">
              {" "}
              {/* <ColDivL> */}
              <Label htmlFor="name">Company name</Label>
              <br></br>
              <InputField
                defaultValue={companyData["name"]}
                {...register("name", { required: true })}
              />{" "}
              {/* register an input */}
              <br />
              {errors["name"] && <PError>Company name is required.</PError>}
              {/* </ColDivL> */} {/* <ColDivR> */}
              <Label htmlFor="address">Company Address</Label>
              <InputField
                defaultValue={companyData["address"]}
                {...register("address", { required: true })}
              />
              {errors["address"] && (
                <PError>Company Address is required.</PError>
              )}
              {/* </ColDivR> */}
            </Td>
          </tr>
          {/* </NameDiv> */}
          <tr>
            <Td>
              <Label htmlFor="city">City</Label>
              <InputField
                defaultValue={companyData["city"]}
                {...register("city", { required: true })}
              />{" "}
              {/* register an input */}
              {errors["city"] && <PError>City is required.</PError>}
            </Td>
            <Td>
              <Label htmlFor="state">State</Label>
              <InputField
                defaultValue={companyData["state"]}
                {...register("state", { required: true })}
              />{" "}
              {/* register an input */}
              {errors["state"] && <PError>State is required.</PError>}
            </Td>
            <Td>
              <Label htmlFor="zip">Zip code</Label>
              <InputField
                defaultValue={companyData["zip"]}
                {...register("zip", { required: true })}
              />{" "}
              {/* register an input */}
              {errors["zip"] && <PError>Zip code is required.</PError>}
            </Td>
          </tr>
          <tr>
            <Td colSpan="3">
              <Label htmlFor="phone">Company phone</Label>
              <InputField
                defaultValue={companyData["phone"]}
                {...register("phone", { required: true })}
              />{" "}
              {/* register an input */}
              {errors["phone"] && <PError>Company phone is required.</PError>}
            </Td>
          </tr>

          <tr>
            <Td colSpan="3">
              <Label htmlFor="email">Company email</Label>
              <InputField
                defaultValue={companyData["email"]}
                {...register("email", { required: true })}
              />{" "}
              {/* register an input */}
              {errors["email"] && <PError>Company email is required.</PError>}
            </Td>
          </tr>
          <tr>
            <Td colSpan="3">
              <Label htmlFor="website">Company website</Label>
              <InputField
                defaultValue={companyData["website"]}
                {...register("website", { required: true })}
              />{" "}
              {/* register an input */}
              {errors["website"] && (
                <PError>Company website is required.</PError>
              )}
            </Td>
          </tr>
          <tr>
            <Td colSpan="3">
              <Label htmlFor="primaryContactName">Primary contact name</Label>
              <InputField
                defaultValue={companyData["primaryContactName"]}
                {...register("primaryContactName", { required: true })}
              />{" "}
              {/* register an input */}
              <br />
              {errors["primaryContactName"] && (
                <PError>Primary contact name is required.</PError>
              )}
            </Td>
          </tr>
          <tr>
            <Td colSpan="3">
              <Label htmlFor="primaryContactPhone">Primary contact phone</Label>
              <InputField
                defaultValue={companyData["primaryContactPhone"]}
                {...register("primaryContactPhone", { required: true })}
              />{" "}
              {/* register an input */}
              <br />
              {errors["primaryContactPhone"] && (
                <PError>Primary contact phone is required.</PError>
              )}
            </Td>
          </tr>
          <tr>
            <Td colSpan="3">
              <Label htmlFor="primaryContactRole">
                Primary contact job title
              </Label>
              <InputField
                defaultValue={companyData["primaryContactRole"]}
                {...register("primaryContactRole", { required: true })}
              />
              {errors["primaryContactRole"] && (
                <PError>Primary contact job title is required.</PError>
              )}
            </Td>
          </tr>
          <tr>
            <Td colSpan="3">
              <hr></hr>
            </Td>
          </tr>

          {newCompany && (
            <tr>
              <Td>
                <InputSubmit
                  onClick={(e) => handlePreviousPage()}
                  type="button"
                  value="cancel"
                  BColor="white"
                  Border
                />
              </Td>
              <Td></Td>
              <Td>
                <InputSubmit type="submit" value="create" />
              </Td>
            </tr>
          )}
        </tbody>
      </FormTable>
      {!newCompany && <SaveButton type="submit" value="save" />}
    </form>
  );
};

export default CompanyForm;
