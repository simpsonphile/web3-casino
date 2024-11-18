import { useState, useEffect } from "react";
import Game from "@Game";
import Menu from "../Menu";
import Chat from "../Chat";
import RemoteChat from "@Common/Remote/Chat";
import Remote from "@Common/Remote";
import Footer from "../Footer";
import { useAccount } from "wagmi";
import styles from "./index.module.scss";
import { useKeyConfigContext } from "../../context/KeyConfigContext";
import AtmModal from "../AtmModal";

const GameContainer = () => {
  const { address, isConnected } = useAccount();
  const [gameInstance, setGameInstance] = useState();
  const [isGameInit, setIsGameInit] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [repo, setRepo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isAtmOpen, setIsAtmOpen] = useState(false);
  const { keyConfig } = useKeyConfigContext();

  useEffect(() => {
    const repo = new Remote({ address });

    repo.add("chat", RemoteChat, {
      onNewMessage: (_, newMessage) =>
        setMessages((prev) => [...prev, newMessage]),
    });

    repo.get("chat").connect();

    setRepo(repo);
  }, []);

  useEffect(() => {
    if (!!gameInstance || !keyConfig || !repo) return;
    const initGame = async () => {
      const game = new Game({
        onPause: () => setIsMenuVisible(true),
        keyConfig: keyConfig,
        repo,
        onAtmClick: () => setIsAtmOpen(true),
        onAtmExit: () => setIsAtmOpen(false),
      });
      setGameInstance(game);
    };

    initGame();
  }, [gameInstance, keyConfig, !!repo]);

  const onResumeClick = () => {
    if (!isGameInit) {
      gameInstance.init();
      setIsGameInit(true);
    } else {
      gameInstance.resumeGame();
    }
    setIsMenuVisible(false);
  };

  useEffect(() => {
    const handleOnKeyDown = (event) => {
      if (event.code === "Escape" && isMenuVisible && isGameInit) {
        setTimeout(() => {
          gameInstance.resumeGame();
          setIsMenuVisible(false);
        }, 100);
      }
    };

    window.addEventListener("keydown", handleOnKeyDown);

    return () => window.removeEventListener("keydown", handleOnKeyDown);
  }, [isGameInit, isMenuVisible, keyConfig]);
  return (
    <div className={styles.GameContainer}>
      {isMenuVisible && isConnected && (
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
        {!!repo && (
          <Chat
            onSend={repo.get("chat").sendMessage.bind(repo.get("chat"))}
            messages={messages}
          />
        )}
      </Footer>

      <AtmModal isOpen={isAtmOpen} setIsOpen={setIsAtmOpen} />
    </div>
  );
};

export default GameContainer;
