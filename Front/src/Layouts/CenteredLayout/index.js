import Logo from "../../UI/Logo";
import styles from "./index.module.scss";

const CenteredLayout = ({ children }) => {
  return (
    <div className={styles.CenteredLayout}>
      <Logo />
      {children}
    </div>
  );
};

export default CenteredLayout;
