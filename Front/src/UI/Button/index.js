import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({
  onClick: onClickProps,
  isPlaySoundOnClick = true,
  ...rest
}) => {
  const onClick = () => {
    onClickProps?.();

    if (isPlaySoundOnClick) {
      window.soundPlayer.playSound("menuSelect");
    }
  };

  return <ChakraButton onClick={onClick} {...rest} />;
};

export default Button;
