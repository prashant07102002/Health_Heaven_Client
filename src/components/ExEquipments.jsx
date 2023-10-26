import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import arr from "../scenes/testapi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExerciseDetail from "./ExerciseDetail";

function ExEquipment() {
  const [equipment, setBodyPart] = React.useState("");
  const [exercise, setExercise] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClick = async (event) => {
    setBodyPart(event.target.value);
  };
  const handleGetExercise = async (event) => {
    event.preventDefault();
    const first = equipment.split(" ")[0];
    const second = equipment.split(" ")[1];
    try {
      //   const apiUrl = `https://exercisedb.p.rapidapi.com/exercises/equipment/${first}${
      //     second ? `%20${second}` : ""
      //   }`;
      //   const response = await axios.get(apiUrl, {
      //     headers: {
      //       "X-RapidAPI-Key":
      //         "ff94c0bc05msh5a7801f49a4f3bep1a28d1jsn2bdd0a1f41af",
      //       "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      //     },
      //   });
      //   console.log(response);
      //   const result = response.data;
      //   console.log(result);
      const response = arr;
      setExercise(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: 30, width: 250 }}>
        <Accordion
          expanded={expanded === "panel123"}
          onChange={handleChange("panel123")}
        >
          <AccordionDetails>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              style={{ gap: 0 }}
            >
              <FormControlLabel
                onClick={handleClick}
                value="back"
                control={<Radio />}
                label="Back"
              />
              <FormControlLabel
                onClick={handleClick}
                value="cardio"
                control={<Radio />}
                label="Cardio"
              />
              <FormControlLabel
                onClick={handleClick}
                value="chest"
                control={<Radio />}
                label="Chest"
              />
              <FormControlLabel
                onClick={handleClick}
                value="lower arms"
                control={<Radio />}
                label="Lower Arms"
              />
              <FormControlLabel
                onClick={handleClick}
                value="lower legs"
                control={<Radio />}
                label="Lower Legs"
              />
              <FormControlLabel
                onClick={handleClick}
                value="neck"
                control={<Radio />}
                label="Neck"
              />
              <FormControlLabel
                onClick={handleClick}
                value="shoulder"
                control={<Radio />}
                label="Shoulder"
              />
              <FormControlLabel
                onClick={handleClick}
                value="upper arms"
                control={<Radio />}
                label="Upper Arms"
              />
              <FormControlLabel
                onClick={handleClick}
                value="upper legs"
                control={<Radio />}
                label="Upper Legs"
              />
              <FormControlLabel
                onClick={handleClick}
                value="waist"
                control={<Radio />}
                label="Waist"
              />
            </RadioGroup>
            <Button onClick={handleGetExercise} variant="contained">
              Get Exercise
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        {exercise.length !== 0 ? (
          <div
            style={{
              width: 800,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {exercise.map((item) => {
              return (
                <Accordion
                  key={item.id}
                  expanded={expanded === item.id}
                  onChange={handleChange(item.id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <Typography sx={{ width: "50%", flexShrink: 0 }}>
                      {item.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ExerciseDetail item={item} />
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ExEquipment;
