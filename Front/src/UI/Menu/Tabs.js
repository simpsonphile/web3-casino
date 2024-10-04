import { Tabs as ChakraTabs } from "@chakra-ui/react";

const Tabs = ({ list, content, ...rest }) => {
  return (
    <ChakraTabs.Root {...rest}>
      <ChakraTabs.List>
        {list.map((li) => (
          <ChakraTabs.Trigger value={li}>{li}</ChakraTabs.Trigger>
        ))}
      </ChakraTabs.List>

      {content.map((item) => (
        <ChakraTabs.Content value={item.value}>
          {item.children}
        </ChakraTabs.Content>
      ))}
    </ChakraTabs.Root>
  );
};

export default Tabs;
