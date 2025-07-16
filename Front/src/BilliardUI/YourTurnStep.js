import { useBilliardStore } from "@Front/stores/billiardStore";
import StrengthBar from "./StrengthBar";

const YourTurnStep = () => {
  const { strength, isPhysicsRunning } = useBilliardStore();

  return <div>{!isPhysicsRunning && <StrengthBar strength={strength} />}</div>;
};

export default YourTurnStep;
