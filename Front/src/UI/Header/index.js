import styles from "./index.module.scss";

const Header = ({ children }) => {
  return <div className={styles.Header}>{children}</div>;
};

export default Header;
