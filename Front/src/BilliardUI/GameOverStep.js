import { Heading } from "@chakra-ui/react";
import { useBilliardStore } from "@Front/stores/billiardStore";
import { useKeyConfigStore } from "@Front/stores/keyConfigStore";
import KeyboardKey from "@Front/UI/KeyboardKey";

const GameOverStep = () => {
  const { didPlayerWin } = useBilliardStore();
  const { keyConfig } = useKeyConfigStore();

  return (
    <div>
      <Heading>{t("billiard.gameOver")}</Heading>
      <Heading>
        {didPlayerWin ? t("billiard.playerWin") : t("billiard.playerLost")}
      </Heading>
      <Heading>
        {t("billiard.playAgain")}{" "}
        <KeyboardKey code={keyConfig.get().billiard.newGame[0]} />
      </Heading>
    </div>
  );
};

export default GameOverStep;
