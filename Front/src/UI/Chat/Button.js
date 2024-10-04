import { IoChatboxOutline } from "react-icons/io5";
import { IconButton } from "@chakra-ui/react";

const ChatButton = (props) => {
  return (
    <IconButton rounded="full" {...props}>
      <IoChatboxOutline />
    </IconButton>
  );
};

export default ChatButton;
