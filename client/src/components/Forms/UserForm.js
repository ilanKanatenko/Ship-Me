import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import img_avtr from "../../images/img_avtr.png";
import { authActions } from "../../store/auth";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import { useRef } from "react";
import { SendRequest } from "../shared/SendRequest";
import Toast from "../shared/Toast";

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
  background-color: ${(props) => (props.BColor ? props.BColor : "#6f91a8")};
  padding: 0.35em 1.2em;
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
  margin-bottom: 10px;
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
  text-align: left;
  max-width: 60%;
  min-height: 80vh;
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
const SaveButton = styled(InputSubmit)`
  position: relative;
  left: 0%;
  width: 25%;
  max-width: 300px;
  margin-bottom: 50px;
`;

const H1 = styled.h1`
  white-space: nowrap;
`;

const WindowClose = styled(FaWindowClose)`
  font-size: 1.5rem;
  :hover {
    cursor: pointer;
  }
`;

const UserForm = () => {
  const [user, setUser] = useState(true);
  const ref = useRef({});
  const history = useHistory();
  ref.current = useSelector((state) => {
    if (history.location.pathname === "/profile/edit") {
      return state.auth.user;
    }
    return { name: "" };
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const [newUser, setNewUser] = useState(true);
  const [showToast, setShowToast] = useState(false);
  // let defValues = user;
  // if (newUser) {
  //   defValues = { };
  // }
  //{ defaultValues: defValues }

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function getCompanyById() {
      const response = await SendRequest(
        `http://localhost:4000/api/user/${id}`,
        "get"
      );
      setUser({ ...response.data });
      return response.data;
    }

    if (history.location.pathname === "/profile/edit") {
      setNewUser(false);
      setUser(ref.current);
      for (const [key, value] of Object.entries(ref.current)) {
        setValue(key, value);
      }
    } else if (history.location.pathname !== "/profile") {
      setNewUser(false);
      ref.current = getCompanyById();
    }
  }, [history, setValue, id]);

  // if (
  //   !(user && Object.keys(user).length === 0 && user.constructor === Object)
  // ) {
  //   //object isn't empty
  // }

  // upload to imgur currently the server not working
  // const handleImageUpload = (event) => {
  //   const formdata = new FormData();
  //   formdata.append("image", event.target.files[0]);
  //   fetch("https://api.imgur.com/3/image/", {
  //     method: "post",
  //     headers: {
  //       Authorization: "Client-ID 301aeeb1ac56fcf",
  //     },
  //     body: formdata,
  //   })
  //     .then((data) => data.json())
  // };

  const handlePreviousPage = () => {
    history.goBack();
  };

  const onSubmit = async (data) => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
    if (newUser) {
      if (data.password === data.confirmPassword) {
        const response = await SendRequest(
          "http://localhost:4000/api/new/user",
          "post",
          data
        );
      }
    } else {
      if (user.password === data.oldPassword) {
        data["password"] = data.newPassword;
        data["email"] = user.email;
        delete data.oldPassword;
        delete data.role;
        delete data.newPassword;
        delete data.confirmPassword;
        const response = await SendRequest(
          "http://localhost:4000/api/user",
          "put",
          {
            ...user,
            ...data,
          }
        );

        if (response.status === 200) {
          if (!id) {
            dispatch(authActions.updateUser({ ...user, ...data }));
          } else if (id === user._id) {
            dispatch(authActions.updateUser({ ...user, ...data }));
          }
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTable>
        <tbody>
          {/* <NameDiv> */}
          <tr>
            {newUser ? (
              <Td TextAlign="center">
                <H1 style={{ marginBottom: "0" }}>New User</H1>
              </Td>
            ) : (
              <Td TextAlign="center">
                <H1 style={{ marginBottom: "0" }}>Profile</H1>
              </Td>
            )}
            {newUser && (
              <Td colSpan="2" verticalAlign="bottom" TextAlign="end">
                <WindowClose onClick={(e) => handlePreviousPage()} />
              </Td>
            )}
          </tr>
          <tr>
            <Td verticalAlign="center" TextAlign="center">
              {" "}
              {/* <ImgDiv> */}
              <AvtrImg src={img_avtr} alt="avatar "></AvtrImg>
              {/* {src="https://i.imgur.com/VdjZNTp.jpg"} */}
              {/* <input
                type="file"
                onChange={(event) => handleImageUpload(event)}
              ></input> */}
              {/* </ImgDiv> */}
            </Td>
            <Td>
              {" "}
              {/* <ColDivL> */}
              <label htmlFor="firstName">First Name</label>
              <br></br>
              <InputField
                defaultValue={user["firstName"]}
                {...register("firstName", { required: true })}
              />{" "}
              {/* register an input */}
              <br />
              {errors["firstName"] && <PError>First Name is required.</PError>}
              {/* </ColDivL> */} {/* <ColDivR> */}
              <label htmlFor="lastName">Last Name</label>
              <InputField
                defaultValue={user["lastName"]}
                {...register("lastName", { required: true })}
              />
              {errors["lastName"] && <PError>Last Name is required.</PError>}
              {/* </ColDivR> */}
            </Td>
          </tr>
          {/* </NameDiv> */}
          <tr>
            {newUser ? (
              <Td colSpan="2">
                <label htmlFor="jobTitle">Job title(optional)</label>
                <InputField
                  defaultValue={user["jobTitle"]}
                  {...register("jobTitle")}
                />{" "}
                {/* register an input */}
              </Td>
            ) : (
              <Td colSpan="2">
                <label htmlFor="jobTitle">Job title</label>
                <InputField
                  defaultValue={user["jobTitle"]}
                  {...register("jobTitle", { required: true })}
                />{" "}
                {errors["jobTitle"] && (
                  <PError>Job Title address is required.</PError>
                )}
                {/* register an input */}
              </Td>
            )}
          </tr>
          {!newUser && (
            <tr>
              <Td colSpan="2">
                <hr></hr>
              </Td>
            </tr>
          )}

          <tr>
            {newUser ? (
              <Td colSpan="2">
                <label htmlFor="email">Email address</label>
                <InputField
                  defaultValue={user["email"]}
                  {...register("email", { required: true })}
                />{" "}
                {/* register an input */}
                {errors["email"] && <PError>Email address is required.</PError>}
              </Td>
            ) : (
              <Td colSpan="2">
                <label htmlFor="email">Primary email</label>
                <p>{user["email"]}</p>

                {/* <InputField
                  disabled
                  defaultValue={user["email"]}
                  {...register("email", { required: true })}
                />{" "}
                {errors["email"] && <PError>Email address is required.</PError>} */}
              </Td>
            )}
          </tr>
          {!newUser && (
            <tr>
              <Td colSpan="2">
                <label htmlFor="secondaryEmail">Secondary email</label>
                <InputField
                  defaultValue={user["secondaryEmail"]}
                  {...register("secondaryEmail", { required: true })}
                />{" "}
                {/* register an input */}
                {errors["secondaryEmail"] && (
                  <PError>Secondary email is required.</PError>
                )}
              </Td>
            </tr>
          )}

          <tr>
            {newUser ? (
              <Td colSpan="2">
                <label htmlFor="phone">Phone</label>
                <InputField
                  defaultValue={user["phone"]}
                  {...register("phone", { required: true })}
                />{" "}
                {/* register an input */}
                {errors["phone"] && <PError>Phone is required.</PError>}
              </Td>
            ) : (
              <Td colSpan="2">
                <label htmlFor="phone">Primary phone number</label>
                <InputField
                  defaultValue={user["phone"]}
                  {...register("phone", { required: true })}
                />{" "}
                {/* register an input */}
                {errors["phone"] && <PError>Primary phone is required.</PError>}
              </Td>
            )}
          </tr>
          {!newUser && (
            <tr>
              <Td colSpan="2">
                <label htmlFor="secondaryPhone">Secondary phone number</label>
                <InputField
                  defaultValue={user["secondaryPhone"]}
                  {...register("secondaryPhone", { required: true })}
                />{" "}
                {/* register an input */}
                {errors["secondaryPhone"] && (
                  <PError>Secondary phone is required.</PError>
                )}
              </Td>
            </tr>
          )}
          {!newUser && (
            <tr>
              <Td colSpan="2">
                {" "}
                <hr></hr>
              </Td>
            </tr>
          )}
          <tr>
            {newUser ? (
              <Td>
                <label htmlFor="role">User type</label>
                <InputField
                  defaultValue={user["role"]}
                  {...register("role", { required: true })}
                />{" "}
                {/* register an input */}
                {errors["role"] && <PError>User type is required.</PError>}
              </Td>
            ) : (
              <Td colSpan="2">
                <label htmlFor="oldPassword">Old password</label>
                <InputField
                  {...register("oldPassword", {
                    pattern:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/i,
                    required: true,
                  })}
                />
                {errors?.oldPassword?.type === "pattern" ? (
                  <PError>
                    Old password must contain one capital letter, one number and
                    one special sign (!@#$%^&*)
                  </PError>
                ) : (
                  errors["oldPassword"] && (
                    <PError>Old password is required.</PError>
                  )
                )}
              </Td>
            )}
          </tr>

          {newUser && (
            <tr>
              <Td>
                <label htmlFor="password">Password</label>
                <InputField
                  {...register("password", {
                    pattern:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/i,
                    required: true,
                  })}
                />
                {errors?.password?.type === "pattern" ? (
                  <PError>
                    Password must contain one capital letter, one number and one
                    special sign (!@#$%^&*)
                  </PError>
                ) : (
                  errors["Password"] && <PError>Password is required.</PError>
                )}
              </Td>
              <Td>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <InputField
                  {...register("confirmPassword", {
                    pattern:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/i,
                    required: true,
                  })}
                />
                {errors?.confirmPassword?.type === "pattern" ? (
                  <PError>
                    Confirm Password must contain one capital letter, one number
                    and one special sign (!@#$%^&*)
                  </PError>
                ) : (
                  errors["confirmPassword"] && (
                    <PError>Confirm Password is required.</PError>
                  )
                )}
              </Td>
            </tr>
          )}
          {!newUser && (
            <>
              <tr>
                <Td colSpan="2">
                  <label htmlFor="newPassword">New password</label>
                  <InputField
                    {...register("newPassword", {
                      pattern:
                        /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/i,
                      required: true,
                    })}
                  />
                  {errors?.newPassword?.type === "pattern" ? (
                    <PError>
                      New password must contain one capital letter, one number
                      and one special sign (!@#$%^&*)
                    </PError>
                  ) : (
                    errors["newPassword"] && (
                      <PError>New password is required.</PError>
                    )
                  )}
                </Td>
              </tr>
              <tr>
                <Td colSpan="2">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <InputField
                    {...register("confirmPassword", {
                      pattern:
                        /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/i,
                      required: true,
                    })}
                  />
                  {errors?.confirmPassword?.type === "pattern" ? (
                    <PError>
                      Confirm Password must contain one capital letter, one
                      number and one special sign (!@#$%^&*)
                    </PError>
                  ) : (
                    errors["confirmPassword"] && (
                      <PError>Confirm Password is required.</PError>
                    )
                  )}
                </Td>
              </tr>
            </>
          )}

          <tr>
            <Td colSpan="2">
              <hr></hr>
            </Td>
          </tr>
          {newUser && (
            <tr>
              <Td>
                <InputSubmit
                  Border
                  BColor="white"
                  type="button"
                  value="cancel"
                />
              </Td>
              <Td>
                <InputSubmit type="submit" value="create" />
              </Td>
            </tr>
          )}
        </tbody>
      </FormTable>
      {!newUser && <SaveButton type="submit" value="save" />}
      <Toast show={showToast} text="successfully finished" />
    </form>
  );
};

export default UserForm;
