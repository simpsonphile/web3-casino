import { useState } from "react";
import styles from "./Menu.module.scss";
import Button from "../Button";
import KeyConfigMenu from "./KeyConfigMenu";
import { useUserContext } from "../../context/UserContext";
import { Heading } from "@chakra-ui/react";

const Menu = ({ onResumeClick, isGameInit, keyConfig, onKeyConfigUpdate }) => {
  const [currentMenu, setCurrentMenu] = useState("main");

  switch (currentMenu) {
    case "keyConfig": {
      return (
        <Menu.KeyConfigMenu
          setCurrentMenu={setCurrentMenu}
          keyConfig={keyConfig}
          onKeyConfigUpdate={onKeyConfigUpdate}
        />
      );
    }
    default:
    case "main": {
      return (
        <Menu.MainMenu
          onResumeClick={onResumeClick}
          isGameInit={isGameInit}
          setCurrentMenu={setCurrentMenu}
        />
      );
    }
  }
};

Menu.MainMenu = ({ onResumeClick, isGameInit, setCurrentMenu }) => {
  const { nickname } = useUserContext();

  return (
    <div className={styles.Menu}>
      <Heading>Hi, {nickname}!</Heading>

      <Button onClick={onResumeClick}>{isGameInit ? "Resume" : "Play"}</Button>
      <Button onClick={() => setCurrentMenu("keyConfig")}>Key Config</Button>
    </div>
  );
};

Menu.KeyConfigMenu = KeyConfigMenu;

export default Menu;
