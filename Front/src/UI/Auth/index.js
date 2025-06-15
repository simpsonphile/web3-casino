import useAuth from "./useAuth";
import Welcome from "../Welcome";
import AuthSignWallet from "./AuthSignWallet";
import Register from "./Register";
import CenteredLayout from "../../Layouts/CenteredLayout";

const Auth = ({ children }) => {
  const { step, signMessage, refresh, setStep } = useAuth();

  if (step === "Authorize") return children;

  const getContent = () => {
    switch (step) {
      case "Start":
        return <Auth.Start onGuestPlaySelection={() => setStep("Authorize")} />;
      case "SignWallet":
        return <Auth.Login signMessage={signMessage} />;
      case "Register":
        return <Auth.Register onSuccess={refresh} />;
      case "Pending":
      default:
        return null;
    }
  };

  return <CenteredLayout>{getContent()}</CenteredLayout>;
};

Auth.Start = Welcome;
Auth.Login = AuthSignWallet;
Auth.Register = Register;

export default Auth;
