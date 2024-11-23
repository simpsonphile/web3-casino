import { Heading } from "@chakra-ui/react";
import { countCardPoints } from "../../../Common/utilis/countCardPoints";
import { useBlackjackUIContext } from "../context/BlackjackUIContext";

const Points = () => {
  const {
    state: { cards, dealerCards },
  } = useBlackjackUIContext();

  return (
    <div>
      <Heading size="xl" color="white" textAlign="center">
        Your current points: {countCardPoints(cards)}
      </Heading>
      <Heading size="xl" color="white" textAlign="center">
        Dealer points: {countCardPoints(dealerCards)}
      </Heading>
    </div>
  );
};

export default Points;
