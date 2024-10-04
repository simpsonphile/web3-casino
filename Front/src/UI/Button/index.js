import { Button as ChakraButton } from "@chakra-ui/react";

const hoverSound = new Audio("game-assets/sounds/menu-select.mp3");

const playSound = () => {
  hoverSound.currentTime = 0;
  hoverSound.play();
};

const Button = ({
  onClick: onClickProps,
  isPlaySoundOnClick = true,
  ...rest
}) => {
  const onClick = () => {
    onClickProps();

    if (isPlaySoundOnClick) {
      playSound();
    }
  };

  return <ChakraButton onClick={onClick} {...rest} />;
};

export default Button;
