import styles from "./index.module.scss";

const Logo = ({ isAnimated }) => {
  const classes = [styles.Logo, isAnimated ? styles.LogoAnimated : ""];

  return <p className={classes.join(" ")}>DeCasino</p>;
};

export default Logo;
