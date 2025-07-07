import { Heading } from "@chakra-ui/react";
import { countCardPoints } from "@Common/utilis/cards";
import { useBlackjackStore } from "../stores/blackjackStore";

const Points = () => {
  const { cards, dealerCards } = useBlackjackStore();

  return (
    <div>
      <Heading size="xl" color="white" textAlign="center">
        {t("blackjackHandValue", {
          value: countCardPoints(cards),
        })}
      </Heading>
      <Heading size="xl" color="white" textAlign="center">
        {t("blackjackDealerHandValue", {
          value: countCardPoints(dealerCards),
        })}
      </Heading>
    </div>
  );
};

export default Points;
