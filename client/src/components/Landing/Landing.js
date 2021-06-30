import styles from "./Landing.module.css";
import LandingForm from "../LandingForm/LandingForm";
import LogoText from "../LogoText/LogoText";
import logo from "../../images/logo.png";

const Landing = ({ formType }) => {
  return (
    <div className={styles.Container}>
      {formType === "/select-company" ? (
        <LogoText src={logo} text="Companies" />
      ) : (
        <LogoText src={logo} text={formType} />
      )}
      <LandingForm formType={formType} />
    </div>
  );
};

export default Landing;
