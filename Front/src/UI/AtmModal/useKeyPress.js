import { useEffect } from "react";

const useKeyPress = ({ value, onEnter, onChange, max }) => {
  console.log(max);
  useEffect(() => {
    const onKeyDown = (e) => {
      let key = e.key;

      if (e.code === "Enter") {
        onEnter();
        return;
      }

      if (key >= "0" && key <= "9") {
        onChange((prev) => {
          const next = prev === "0" ? key : prev + key;
          console.log(next, Number(next));
          if (Number(next) >= Number(max)) return max.toString();
          return next;
        });
      } else if (key === "." || e.code === "Period") {
        onChange((prev) => {
          // Prevent multiple decimals
          if (prev.includes(".")) return prev;
          return prev + ".";
        });
      } else if (e.code === "Backspace") {
        onChange((prev) => {
          const next = prev.slice(0, -1);
          return next.length > 0 ? next : "0";
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [value]);
};

export default useKeyPress;
