import styles from "./index.module.scss";
import { chakra } from "@chakra-ui/react";

const Logo = ({ isAnimated, className, ...props }) => {
  const classes = [
    styles.Logo,
    isAnimated ? styles.LogoAnimated : "",
    className,
  ];

  return (
    <p {...props} className={classes.join(" ")}>
      DeCasino
    </p>
  );
};

export default chakra(Logo);
