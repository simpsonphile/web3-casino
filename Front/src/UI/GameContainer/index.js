import { useState, useEffect } from "react";
import Game from "@Game";
import Menu from "../Menu";
import Chat from "../Chat";
import RemoteChat from "@Common/Remote/Chat";
import Remote from "@Common/Remote";
import Footer from "../Footer";
import { useAccount } from "wagmi";
import AtmModal from "../AtmModal";
import GameTooltip from "../GameTooltip";
import BlackjackUI from "../../BlackjackUI";
import SlotsUI from "../../SlotsUI";
import { useKeyConfigStore } from "../../stores/keyConfigStore";
import AssetsLoadingScreen from "../AssetsLoadingScreen";
import styles from "./index.module.scss";
import { useMessagesStore } from "../../stores/messagesStore";
import { useUserStore } from "../../stores/userStore";
import TokenBalance from "../TokenBalance";

const GameContainer = () => {
  const { address, isConnected } = useAccount();
  const { asGuest, nickname } = useUserStore();
  const [gameInstance, setGameInstance] = useState();
  const [isGameInit, setIsGameInit] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const { keyConfig } = useKeyConfigStore();
  const [isChatInit, setIsChatInit] = useState(false);
  const { messages, addMessage } = useMessagesStore();

  useEffect(() => {
    const repo = new Remote({ address, asGuest, nickname });

    window.repo = repo;
  }, []);

  useEffect(() => {
    if (isGameInit && window.repo) {
      window.repo.add("chat", RemoteChat, {
        onNewMessage: (_, newMessage) => {
          addMessage(newMessage);
        },
      });
      window.repo.get("chat").connect();
      setIsChatInit(true);
    }
  }, [gameInstance, isGameInit, window.repo]);

  useEffect(() => {
    if (!!gameInstance || !keyConfig || !window.repo) return;
    const initGame = async () => {
      const game = new Game({
        onPause: () => setIsMenuVisible(true),
        onResume: () => setIsMenuVisible(false),
      });
      setGameInstance(game);
    };

    initGame();
  }, [gameInstance, keyConfig, !!window.repo]);

  const onResumeClick = () => {
    if (!isGameInit) {
      gameInstance.init();
      setIsMenuVisible(false);
      setIsGameInit(true);
    } else {
      gameInstance.resumeGame();
    }
  };

  useEffect(() => {
    const handleOnKeyDown = (event) => {
      if (
        event.code === "Escape" &&
        !isMenuVisible &&
        isGameInit &&
        !gameInstance.pointerLock.isPointerLocked()
      ) {
        window.commandManager.setMode("menu");
        setIsMenuVisible(true);
      }
    };

    window.addEventListener("keydown", handleOnKeyDown);

    return () => window.removeEventListener("keydown", handleOnKeyDown);
  }, [isGameInit, isMenuVisible, keyConfig]);

  return (
    <div className={styles.GameContainer}>
      <TokenBalance />

      {isMenuVisible && (isConnected || asGuest) && (
        <Menu
          isGameInit={isGameInit}
          onResumeClick={onResumeClick}
          onKeyConfigUpdate={() => {
            if (isGameInit) {
              gameInstance?.addCommands.bind(gameInstance)?.();
            }
          }}
        />
      )}

      <Footer>
        {isChatInit && (
          <Chat
            onSend={window.repo
              .get("chat")
              .sendMessage.bind(window.repo.get("chat"))}
            messages={messages}
          />
        )}
      </Footer>

      <AtmModal />

      <GameTooltip />

      <BlackjackUI />
      <SlotsUI />

      <AssetsLoadingScreen />
    </div>
  );
};

export default GameContainer;
