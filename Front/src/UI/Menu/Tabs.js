import { Tabs as ChakraTabs } from "@chakra-ui/react";
import styles from "./Menu.module.scss";

const Tabs = ({ list, content, ...rest }) => {
  return (
    <ChakraTabs.Root {...rest}>
      <ChakraTabs.List>
        {list.map((li) => (
          <ChakraTabs.Trigger key={li} value={li}>
            {li}
          </ChakraTabs.Trigger>
        ))}
      </ChakraTabs.List>

      {content.map((item) => (
        <ChakraTabs.Content
          key={item.value}
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
