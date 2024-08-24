import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Qa.scss";

export default function Qa() {
  return (
    <section className="qa">
      <h2>Q&A</h2>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          What cryptocurrencies can I trade on your exchange?
        </AccordionSummary>
        <AccordionDetails>
          Our exchange supports a wide range of popular cryptocurrencies
          including Bitcoin, Ethereum, Litecoin, Ripple, and many more.
        </AccordionDetails>
      </Accordion>
    </section>
  );
}
