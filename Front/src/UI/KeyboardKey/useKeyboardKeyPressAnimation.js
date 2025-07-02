import { useEffect } from "react";

export default function useKeyboardKeyPressAnimation() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      const keyEls = document.querySelectorAll(`[data-keyboard-key="${key}"]`);
      keyEls.forEach((el) => {
        if (!el.classList.contains("pressed")) {
          el.classList.add("pressed");
          setTimeout(() => el.classList.remove("pressed"), 120);
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
