import { useRef, useState, useEffect } from "react";
import Button from "../Button";
import styles from "./Menu.module.scss";
import Tabs from "./Tabs";
import { Heading, HStack } from "@chakra-ui/react";
import { getReadableKey } from "../../utils/keyboard";
import { useKeyConfigStore } from "../../stores/keyConfigStore";

const KeyConfigMenu = ({ setCurrentMenu, onKeyConfigUpdate }) => {
  const { keyConfig } = useKeyConfigStore();
  const ref = useRef(document.createElement("div"));
  const keys = keyConfig.get();
  const [state, setState] = useState(keys);
  const [current, setCurrent] = useState(null);

  const resetKeys = () => {
    keyConfig.reset();
    const keys = keyConfig.get();
    setState(keys);
    setCurrent(null);
    onKeyConfigUpdate?.();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        setCurrent(null);
        return;
      }

      if (current) {
        const [mode, action, index] = current.split(".");

        const newKeys = state[mode][action];
        newKeys[index] = event.code;

        setState({
          ...state,
          [mode]: {
            ...state[mode],
            [action]: newKeys,
          },
        });

        keyConfig.update(mode, action, newKeys);
        onKeyConfigUpdate?.();

        setCurrent(null);
      }
    };

    const handleClick = () => {
      setCurrent(null);
    };

    const currentRef = ref.current;
    currentRef && currentRef.addEventListener("keydown", handleKeyDown);
    currentRef && currentRef.addEventListener("click", handleClick);

    return () => {
      currentRef && currentRef.removeEventListener("keydown", handleKeyDown);
      currentRef && currentRef.removeEventListener("click", handleClick);
    };
  }, [current, JSON.stringify(state)]);

  return (
    <div ref={ref} className={styles.Menu}>
      <Tabs
        variant="enclosed"
        defaultValue={Object.keys(state)[0]}
        list={Object.keys(state)}
        content={Object.entries(state).map(([name, values]) => ({
          value: name,
          children: Object.entries(values).map(([settingsName, keys]) => (
            <div className={styles.MenuSubsection} key={settingsName}>
              <Heading as="p" size="md">
                {settingsName}
              </Heading>
              <div className={styles.MenuSubsectionBtns}>
                {keys.map((key, i) => (
                  <Button
                    variant="outline"
                    isKeyConfig
                    isActive={`${name}.${settingsName}.${i}` === current}
                    key={`${name}.${settingsName}.${i}`}
                    onClick={() => setCurrent(`${name}.${settingsName}.${i}`)}
                  >
                    {`${name}.${settingsName}.${i}` === current
                      ? "press any key"
                      : getReadableKey(key)}
                  </Button>
                ))}
              </div>
            </div>
          )),
        }))}
      />
      <HStack>
        <Button variant="subtle" onClick={() => setCurrentMenu("main")}>
          Back
        </Button>
        <Button onClick={resetKeys}>Reset to default</Button>
      </HStack>
    </div>
  );
};

export default KeyConfigMenu;
