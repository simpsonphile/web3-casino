import { Box, Text, Slider, Heading } from "@chakra-ui/react";

const SoundControl = ({ label, volume, onVolumeChange }) => {
  return (
    <Box>
      <Heading>{label}</Heading>
      <Slider.Root
        value={[volume]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={(e) => onVolumeChange(e.value[0])}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </Box>
  );
};

export default SoundControl;
