import BilliardBall from "./BilliardBall";

const billiardBallColors = {
  yellow: "#ffd700",
  blue: "#0000ff",
  red: "#ff0000",
  purple: "#800080",
  orange: "#ffa500",
  green: "#008000",
  maroon: "#800000",
};

const solidColors = {
  ...billiardBallColors,
  black: "#000000", // Solid black ball
  white: "#ffffff", // Cue ball
};

const billiardBalls = {
  solid: Object.fromEntries(
    Object.entries(solidColors).map(([name, color]) => [
      name,
      () => new BilliardBall({ type: "solid", color }),
    ])
  ),
  half: Object.fromEntries(
    Object.entries(billiardBallColors).map(([name, color]) => [
      name,
      () => new BilliardBall({ type: "half", color }),
    ])
  ),
};

export default billiardBalls;
