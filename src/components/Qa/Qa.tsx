import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Qa.scss";

export default function Qa() {
  return (
    <section className="qa">
      <h2>Q&A</h2>
      <div className="qa__container">
        <Accordion className="custom-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="custom-details"
          >
            What cryptocurrencies can I trade on your exchange?
          </AccordionSummary>
          <AccordionDetails className="custom-accordion">
            Our exchange supports a wide range of popular cryptocurrencies
            including Bitcoin, Ethereum, Litecoin, Ripple, and many more.
          </AccordionDetails>
        </Accordion>
        <Accordion className="custom-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="custom-details"
          >
            How do I sign up for an account on your exchange?
          </AccordionSummary>
          <AccordionDetails className="custom-accordion">
            Our exchange supports a wide range of popular cryptocurrencies
            including Bitcoin, Ethereum, Litecoin, Ripple, and many more.
          </AccordionDetails>
        </Accordion>
        <Accordion className="custom-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="custom-details"
          >
            Is my personal information safe on your exchange?
          </AccordionSummary>
          <AccordionDetails className="custom-accordion">
            Our exchange supports a wide range of popular cryptocurrencies
            including Bitcoin, Ethereum, Litecoin, Ripple, and many more.
          </AccordionDetails>
        </Accordion>
        <Accordion className="custom-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="custom-details"
          >
            What fees do you charge for trading on your exchange?
          </AccordionSummary>
          <AccordionDetails className="custom-accordion">
            Our exchange supports a wide range of popular cryptocurrencies
            including Bitcoin, Ethereum, Litecoin, Ripple, and many more.
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
}
