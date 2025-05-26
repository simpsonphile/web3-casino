import { useState, useEffect } from "react";
import Game from "@Game";
import Menu from "../Menu";
import Chat from "../Chat";
import RemoteChat from "@Common/Remote/Chat";
import Remote from "@Common/Remote";
import SoundPlayer from "@Common/SoundPlayer";
import Footer from "../Footer";
import { useAccount } from "wagmi";
import styles from "./index.module.scss";
import AtmModal from "../AtmModal";
import GameTooltip from "../GameTooltip";
import BlackjackUI from "../../BlackjackUI";
import SlotsUI from "../../SlotsUI";
import { useKeyConfigStore } from "../../stores/keyConfigStore";

const GameContainer = () => {
  const { address, isConnected } = useAccount();
  const [gameInstance, setGameInstance] = useState();
  const [isGameInit, setIsGameInit] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [repo, setRepo] = useState(null);
  const [messages, setMessages] = useState([]);
  const { keyConfig } = useKeyConfigStore();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("");

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
    const soundPlayer = new SoundPlayer();
    soundPlayer.loadSounds();
    window.soundPlayer = soundPlayer;
  }, []);

  useEffect(() => {
    if (!!gameInstance || !keyConfig || !repo) return;
    const initGame = async () => {
      const game = new Game({
        onPause: () => setIsMenuVisible(true),
        repo,
        onAtmExit: () => setIsAtmOpen(false),
        showTooltip: (text) => {
          setTooltipVisible(true);
          setTooltipText(text);
        },
        hideTooltip: () => {
          setTooltipVisible(false);
          setTooltipText("");
        },
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

      <AtmModal />

      {tooltipVisible && <GameTooltip>{tooltipText}</GameTooltip>}

      <BlackjackUI />
      <SlotsUI />
    </div>
  );
};

export default GameContainer;
