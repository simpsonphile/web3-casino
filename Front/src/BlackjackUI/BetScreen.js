import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import styles from "./index.module.scss";
import KeyboardKey from "../UI/KeyboardKey";
import CasinoChip from "../UI/CasinoChip";
import { chipColorNominalsMap } from "@Common/constants";
import { useBlackjackStore } from "../stores/blackjackStore";
import { useKeyConfigStore } from "../stores/keyConfigStore";

const BetScreen = () => {
  const { bet, hasBeaten } = useBlackjackStore();
  const { keyConfig } = useKeyConfigStore();

  const blackjackKeys = keyConfig.get().blackjack;

  if (hasBeaten) {
    return (
      <Heading size="xl" color="white" textAlign="center" mb={2}>
        {t("blackjackWaitingForPlayers")}
      </Heading>
    );
  }

  return (
    <div className={styles.BetScreen}>
      <Heading size="xl" color="white" textAlign="center" mb={2}>
        {t("blackjackPlaceYourBet", { bet })}
      </Heading>
      <Grid gap={3} templateColumns="repeat(4, 1fr)" textAlign="center">
        {Object.entries(chipColorNominalsMap)
          .sort(([_, a], [__, b]) => a - b)
          .map(([name], i) => (
            <Box
              key={name}
              display="flex"
              flexDir="column"
              gap={2}
              textAlign="center"
            >
              <CasinoChip color={name.split("chip_")[1]} />
              <div>
                <KeyboardKey code={`Digit${i + 1}`}></KeyboardKey>
              </div>
            </Box>
          ))}

        <Box>
          <Heading size="lg" color="white">
            2x
          </Heading>
          <KeyboardKey code={blackjackKeys.doubleBet[0]}></KeyboardKey>
        </Box>

        <GridItem colSpan={2}>
          <Box>
            <Heading size="lg" color="white">
              Accept
            </Heading>
            <KeyboardKey code={blackjackKeys.accept[0]}></KeyboardKey>
          </Box>
        </GridItem>

        <Box>
          <Heading size="lg" color="white">
            1/2
          </Heading>
          <KeyboardKey code={blackjackKeys.halfBet[0]}></KeyboardKey>
        </Box>
      </Grid>
    </div>
  );
};

export default BetScreen;
