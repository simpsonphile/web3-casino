import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import ChatButton from "./Button";
import { Button, Input } from "@chakra-ui/react";
import { useKeyConfigStore } from "../../stores/keyConfigStore";

const Chat = ({ onSend, messages }) => {
  const { keyConfig } = useKeyConfigStore();
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(document.createElement("input"));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        !!keyConfig &&
        keyConfig.get().navigation.showChat.includes(event.code)
      ) {
        setIsVisible((prev) => !prev);
        if (!isVisible) {
          setTimeout(() => {
            textRef.current.focus();
          }, 50);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible]);

  if (!isVisible) return <ChatButton onClick={setIsVisible} />;

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatMessagesContainer}>
        {Object.entries(messages)
          .reverse()
          .map(([id, message]) => (
            <ChatMessage key={id} {...message} />
          ))}
      </div>
      <ChatInput textRef={textRef} onSend={onSend} />
    </div>
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const ChatMessage = (props) => {
  const { timestamp, nickname, value, type } = props;

  const formattedTimestamp = formatTimestamp(timestamp);

  if (type === "join") {
    return (
      <div className={styles.ChatMessage}>
        <div
          className={styles.ChatMessageTimestamp}
        >{`[${formattedTimestamp}]`}</div>
        <div
          className={styles.ChatMessageNickname}
        >{`${nickname} joined game`}</div>
      </div>
    );
  }

  return (
    <div className={styles.ChatMessage}>
      <div
        className={styles.ChatMessageTimestamp}
      >{`[${formattedTimestamp}]`}</div>
      <div className={styles.ChatMessageNickname}>{nickname}:</div>
      <div className={styles.ChatMessageValue}>{value}</div>
    </div>
  );
};

const ChatInput = ({ onSend: onSendProps, textRef, onBlur }) => {
  const [message, setMessage] = useState("");

  const onKeyDown = (e) => {
    if (e.code === "Enter") {
      setTimeout(() => {
        onSend(message);
      }, 50);
    }
  };

  const clearInput = () => setMessage("");

  const onSend = () => {
    onSendProps(message);
    clearInput();
  };

  return (
    <div className={styles.ChatInput}>
      <Input
        ref={textRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      <Button onClick={() => onSend(message)}>send</Button>
    </div>
  );
};

export default Chat;
