import { useAccount, useSignMessage } from "wagmi";
import { auth, checkIfAddressExist, logOut } from "../../api";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";

const message = "auth me";

const useAuth = () => {
  const [wasConnected, setWasConnected] = useState(false);
  const { isConnected, address } = useAccount();
  const [step, setStep] = useState("Pending");
  const [updateRefreshKey, setUpdateRefreshKey] = useState(0);

  const { signMessage, data: signature } = useSignMessage();

  const { setUser } = useUserStore();

  const refresh = () => setUpdateRefreshKey((prev) => prev + 1);

  useEffect(() => {
    if (isConnected) setWasConnected(true);
  }, [isConnected]);

  useEffect(() => {
    if (isConnected || !wasConnected) return;
    logOut().then(() => {
      location.reload();
    });
  }, [isConnected]);

  useEffect(() => {
    if (!isConnected && !wasConnected) {
      setStep("Start");
    }
  }, [isConnected, wasConnected]);

  useEffect(() => {
    if (!isConnected) return;
    checkIfAddressExist()
      .then((res) => {
        const { isAuthorized, exists, user } = res.data;
        const type = isAuthorized && exists ? "Authorize" : "Register";

        setStep(type);

        if (user) setUser(user);
      })
      .catch(() => {
        setStep("SignWallet");
      });
  }, [address, updateRefreshKey, isConnected]);

  useEffect(() => {
    if (!signature) return;

    auth(address, signature, message)
      .then(() => {
        refresh();
      })
      .catch((reason) => console.error(reason));
  }, [signature]);

  return {
    refresh,
    step,
    signMessage: () => signMessage({ message }),
    setStep,
  };
};

export default useAuth;
