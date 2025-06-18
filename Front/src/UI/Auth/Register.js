import { useState } from "react";
import { registerNickname } from "../../api";
import { Field, Heading, Input } from "@chakra-ui/react";
import { toaster } from "../toaster";
import Button from "../Button";
import styles from "./index.module.scss";
import Paragraph from "../Paragraph";

const Register = ({ onSuccess }) => {
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
      <Heading size="lg">{t("auth.register.createYourNickname")}</Heading>

      <Paragraph textAlign="center">
        {t("auth.register.createYourNicknameDescription")}
      </Paragraph>
      <Field.Root required>
        <Field.Label>
          Nickname <Field.RequiredIndicator />
        </Field.Label>
        <Input
          placeholder="Casino_Enjoyer"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </Field.Root>
      <Button onClick={register}>Register</Button>
    </div>
  );
};

export default Register;
