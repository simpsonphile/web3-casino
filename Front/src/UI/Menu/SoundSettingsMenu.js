import { VStack, ButtonGroup } from "@chakra-ui/react";
import SoundControl from "./SoundControl";
import Button from "../Button";
import { useSoundStore } from "@Front/stores/soundStore";

const SoundSettings = ({ setCurrentMenu }) => {
  const { uiVolume, worldVolume, setUiVolume, setWorldVolume, reset } =
    useSoundStore();

  return (
    <VStack align="stretch" spacing={6}>
      <SoundControl
        label="UI Effects"
        volume={uiVolume}
        onVolumeChange={setUiVolume}
      />

      <SoundControl
        label="3D World"
        volume={worldVolume}
        onVolumeChange={setWorldVolume}
      />

      <ButtonGroup>
        <Button variant="subtle" onClick={() => setCurrentMenu("main")}>
          {t("menu.back")}
        </Button>
        <Button onClick={reset}>{t("menu.resetToDefault")}</Button>
      </ButtonGroup>
    </VStack>
  );
};

export default SoundSettings;
