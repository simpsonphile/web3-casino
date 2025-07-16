import { useBilliardStore } from "@Front/stores/billiardStore";

const CueBallPlacementStep = () => {
  const { yourTurn, isPhysicsRunning } = useBilliardStore();

  return (
    <div>
      {t(
        yourTurn
          ? "billiard.playerCueBallPlacement"
          : "billiardBalls.opponentCueBallPlacement"
      )}
    </div>
  );
};

export default CueBallPlacementStep;
