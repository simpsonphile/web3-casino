export function getReadableKey(code) {
  if (!code) return null;

  if (code.startsWith("Key")) {
    return code.slice(3);
  } else if (code.startsWith("Digit")) {
    return code.slice(5);
  } else if (code.startsWith("Numpad")) {
    return "Num " + code.slice(6);
  }

  const map = {
    Space: "Space",
    Enter: "Enter",
    Escape: "Esc",
    Tab: "Tab",
    ShiftLeft: "Shift",
    ShiftRight: "Shift",
    ControlLeft: "Ctrl",
    ControlRight: "Ctrl",
    AltLeft: "Alt",
    AltRight: "Alt",
    ArrowUp: "↑",
    ArrowDown: "↓",
    ArrowLeft: "←",
    ArrowRight: "→",
    Backspace: "Backspace",
    Delete: "Delete",
  };

  return map[code] || code;
}
