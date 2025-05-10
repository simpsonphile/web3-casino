import styles from "./index.module.scss";
import { chipColorNominalsMap } from "@Common/constants";

const CasinoChip = ({ color, size }) => {
  const classNames = [
    styles.Chip,
    styles[`Chip${color}`],
    styles[`Chip${size}`],
  ].join(" ");

  const value = chipColorNominalsMap[`chip_${color}`];
  return <div className={classNames}>{value}</div>;
};

export default CasinoChip;
