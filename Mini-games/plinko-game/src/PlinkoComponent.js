import { useEffect, useRef, useState } from "react";
import { PlinkoGame } from "./lib/PlinkoGame";

import { pickInverseWeighted } from "./lib/helpers";

const PlinkoComponent = () => {
  const ref = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [game, setGame] = useState(null);
  useEffect(() => {
    const plinkoGame = new PlinkoGame({
      difficulty: "easy",
      multipliers: {
        easy: [11, 3.2, 1.6, 1.2, 1.1, 1, 0.5].reverse(),
        medium: [25, 8, 3.1, 1.7, 1.2, 0.7, 0.3].reverse(),
        hard: [141, 25, 8.1, 2.3, 0.7, 0.2, 0.1].reverse(),
      },
      onBallFinish: (rate) => {
        window.soundPlayer.playSound("plinkoHit", rate);
      },
    });

    plinkoGame.init();
    setCanvas(plinkoGame.canvas);
    setGame(plinkoGame);
    return () => {
      if (window.plinkoGame) {
        setCanvas(null);
        plinkoGame.stop();
        setGame(null);
      }
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      // const multiplier = 3.2;
      if (e.key === "e") {
        game.setDifficulty("easy");
      } else if (e.key === "m") {
        game.setDifficulty("medium");
      } else if (e.key === "h") {
        game.setDifficulty("hard");
      } else {
        const multiplier = pickInverseWeighted(
          game.multipliers[game.difficulty]
        );
        game.dropBall({
          multiplier,
          difficulty: game.difficulty,
          bet: 10,
          payout: 10,
        });
      }
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [game]);

  useEffect(() => {
    if (canvas && ref.current) {
      ref.current.appendChild(canvas);
    }
  }, [canvas, ref.current]);

  return (
    <div className="plinko-component" ref={ref}>
      <h1>Plinko Game</h1>
      <p>
        Welcome to the Plinko game! Click any button to drop a ball.
        <br />
        Use the keys <strong>e</strong>, <strong>m</strong>, and{" "}
        <strong>h</strong> to change the difficulty to Easy, Medium, and Hard
        respectively.
      </p>
    </div>
  );
};

export default PlinkoComponent;
