import SignIn from "../Sign/SignIn";
import SignUp from "../Sign/SignUp";
import CompanySelect from "../Sign/CompanySelect";

const LandingForm = ({ formType }) => {
  let form = formType.toLowerCase() === "sign-in" ? <SignIn /> : <SignUp />;
  form =
    formType.toLowerCase() === "/select-company" ? <CompanySelect /> : form;

  return <>{form}</>;
};

export default LandingForm;
