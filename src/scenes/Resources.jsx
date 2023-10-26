import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import ResponsiveAppBar from "../components/Navbar";
import ExBodyPart from "../components/ExBodyPart";
import ExEquipment from "../components/ExEquipments";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Resources() {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        // display: "flex",
        minHeight: "100%",
        flexDirection: "row",
      }}
    >
      <ResponsiveAppBar />
      <Typography
        style={{ textAlign: "center", fontWeight: "bold", padding: 20 }}
        variant="h4"
        component="h2"
        gutterBottom
      >
        Transform Your Body, Transform Your Life
      </Typography>
      <Typography
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          marginInline: 200,
          paddingBottom: 20,
        }}
        variant="body1"
        component="h2"
        gutterBottom
      >
        Our exercise library is filled with a diverse range of workouts, each
        carefully crafted to help you target specific muscle groups and achieve
        your unique fitness goals. Whether you're a novice or a seasoned
        athlete, we have something for everyone.
      </Typography>
      <div
        style={{
          marginInline: 60,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Exercise By Body Part
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ExBodyPart />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Exercise By Equipments
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ExEquipment />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default Resources;
