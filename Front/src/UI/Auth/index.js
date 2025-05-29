import { useState } from "react";
import { registerNickname } from "../../api";
import useAuth from "./useAuth";
import styles from "./index.module.scss";
import { Button, Input } from "@chakra-ui/react";
import { toaster } from "../toaster";

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

Auth.Login.displayName = "AuthLogin";

Auth.Register = ({ onSuccess }) => {
  const [nickname, setNickname] = useState("");

  const register = () => {
    registerNickname(nickname)
      .then((res) => {
        if (res.data.success) {
          toaster.create({
            title: "Success",
            description: res.data.message,
            type: "success",
          });
          onSuccess();
        } else {
          toaster.create({
            title: "Error",
            description: "Something went wrong",
            type: "error",
          });
        }
      })
      .catch((res) => {
        toaster.create({
          title: "Error",
          description: res.response.data.message,
          type: "error",
        });
      });
  };
  return (
    <div className={styles.Auth}>
      <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <Button onClick={register}>Register</Button>
    </div>
  );
};

Auth.Register.displayName = "AuthRegister";

export default Auth;
