import { useState } from "react";
import { registerNickname } from "../../api";
import useAuth from "./useAuth";
import styles from "./index.module.scss";
import { Button, Input } from "@chakra-ui/react";

const Auth = ({ children }) => {
  const { step, signMessage, refresh } = useAuth();

  switch (step) {
    case "Auth":
      return <Auth.Login signMessage={signMessage} />;
    case "Register":
      return <Auth.Register onSuccess={refresh} />;
    case "Authorize":
      return children;
    case "Pending":
    default:
      return null;
  }
};

Auth.Login = ({ signMessage }) => {
  return (
    <div className={styles.Auth}>
      <Button onClick={signMessage}>sign me</Button>
    </div>
  );
};

Auth.Register = ({ onSuccess }) => {
  const [nickname, setNickname] = useState("");

  const register = () => {
    registerNickname(nickname).then((res) => {
      if (res.data.success) {
        console.log("success");
        onSuccess();
      } else {
        console.log("exist other TODO input red");
      }
    });
  };
  return (
    <div className={styles.Auth}>
      <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <Button onClick={register}>Register</Button>
    </div>
  );
};

export default Auth;
