import { useState } from "react";
import styles from "./Menu.module.scss";
import Button from "../Button";
import KeyConfigMenu from "./KeyConfigMenu";
import { useUserContext } from "../../context/UserContext";
import { Heading, VStack } from "@chakra-ui/react";
import { useKeyConfigStore } from "../../stores/keyConfigStore";
import Logo from "../Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Header from "../Header";
import SoundSettings from "./SoundSettingsMenu";

const Menu = ({ onResumeClick, isGameInit, onKeyConfigUpdate }) => {
  const { keyConfig } = useKeyConfigStore();
  const [currentMenu, setCurrentMenu] = useState("main");
  const { isConnected } = useAccount();

  const content = () => {
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
      case "soundSettings": {
        return <Menu.SoundMenu setCurrentMenu={setCurrentMenu} />;
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

  return (
    <div className={styles.Menu}>
      <Header>{isConnected && <ConnectButton />}</Header>
      <Logo />
      {content()}
    </div>
  );
};

Menu.SoundMenu = SoundSettings;

Menu.MainMenu = ({ onResumeClick, isGameInit, setCurrentMenu }) => {
  const { nickname } = useUserContext();

  return (
    <>
      <Heading>Hi, {nickname}!</Heading>

      <VStack alignItems="stretch">
        <Button onClick={onResumeClick}>
          {isGameInit ? t("menu.resume") : t("menu.play")}
        </Button>
        <Button onClick={() => setCurrentMenu("keyConfig")}>
          {t("menu.keyConfig")}
        </Button>
        <Button onClick={() => setCurrentMenu("soundSettings")}>
          {t("menu.soundSettings")}
        </Button>
      </VStack>
    </>
  );
};

Menu.MainMenu.displayName = "MainMenu";

Menu.KeyConfigMenu = KeyConfigMenu;

export default Menu;
