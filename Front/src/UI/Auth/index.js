import { useState } from "react";
import { registerNickname } from "../../api";
import useAuth from "./useAuth";
import styles from "./index.module.scss";
import { Button, Input } from "@chakra-ui/react";
import { toaster } from "../toaster";
import Welcome from "../Welcome";
import AuthSignWallet from "./AuthSignWallet";

const Auth = ({ children }) => {
  const { step, signMessage, refresh, setStep } = useAuth();

  switch (step) {
    case "Start":
      return <Auth.Start onGuestPlaySelection={() => setStep("Authorize")} />;
    case "SignWallet":
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

Auth.Start = Welcome;
Auth.Start.displayName = "AuthStart";

Auth.Login = AuthSignWallet;

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
