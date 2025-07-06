import { Grid, GridItem } from "@chakra-ui/react";
import TransactionHistory from "../TransactionHistory";
import Footer from "./Footer";

const History = () => {
  return (
    <Grid gap={2}>
      <GridItem>
        <TransactionHistory />
      </GridItem>
      <GridItem>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default History;
