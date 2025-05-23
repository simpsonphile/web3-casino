import { Tabs as ChakraTabs } from "@chakra-ui/react";
import styles from "./Menu.module.scss";

const Tabs = ({ list, content, ...rest }) => {
  return (
    <ChakraTabs.Root {...rest}>
      <ChakraTabs.List>
        {list.map((li) => (
          <ChakraTabs.Trigger value={li}>{li}</ChakraTabs.Trigger>
        ))}
      </ChakraTabs.List>

      {content.map((item) => (
        <ChakraTabs.Content
          value={item.value}
          className={styles.MenuTabContent}
        >
          {item.children}
        </ChakraTabs.Content>
      ))}
    </ChakraTabs.Root>
  );
};

export default Tabs;
