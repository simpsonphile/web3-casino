import Button from "../Button";
import { getReadableKey } from "../../utils/keyboard";

const KeyChangeButton = ({ children, isActive, onClick }) => {
  return (
    <Button
      variant={isActive ? "outline" : "subtle"}
      colorPalette={isActive ? "red" : "green"}
      isKeyConfig
      isActive={isActive}
      onClick={onClick}
    >
      {isActive ? "press any key" : getReadableKey(children)}
    </Button>
  );
};

export default KeyChangeButton;
