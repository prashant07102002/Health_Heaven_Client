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
import { useDispatch } from "react-redux";
import { showToast } from "../state";

function ExEquipment() {
  const [equipment, setEquipment] = React.useState("");
  const [exercise, setExercise] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClick = async (event) => {
    setEquipment(event.target.value);
  };
  const handleGetExercise = async (event) => {
    event.preventDefault();
    const first = equipment.split(" ")[0];
    const second = equipment.split(" ")[1];
    try {
      const apiUrl = `https://exercisedb.p.rapidapi.com/exercises/equipment/${first}${
        second ? `%20${second}` : ""
      }`;
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      });

      console.log(response);
      const result = response.data;
      console.log(result);
      setExercise(result);
      // const response = arr;
      // setExercise(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          type: "Error",
          message: error.message,
        })
      );
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: 30, width: 300 }}>
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
                value="assisted"
                control={<Radio />}
                label="Assited"
              />
              <FormControlLabel
                onClick={handleClick}
                value="band"
                control={<Radio />}
                label="Band"
              />
              <FormControlLabel
                onClick={handleClick}
                value="barbell"
                control={<Radio />}
                label="Barbell"
              />
              <FormControlLabel
                onClick={handleClick}
                value="body weight"
                control={<Radio />}
                label="Body Weight"
              />
              <FormControlLabel
                onClick={handleClick}
                value="bosu ball"
                control={<Radio />}
                label="Bosu Ball"
              />
              <FormControlLabel
                onClick={handleClick}
                value="cable"
                control={<Radio />}
                label="Cable"
              />
              <FormControlLabel
                onClick={handleClick}
                value="dumbell"
                control={<Radio />}
                label="Dumbell"
              />
              <FormControlLabel
                onClick={handleClick}
                value="elliptical machine"
                control={<Radio />}
                label="Elliptical Machine"
              />
              <FormControlLabel
                onClick={handleClick}
                value="ez barbell"
                control={<Radio />}
                label="Ez Barbell"
              />
              <FormControlLabel
                onClick={handleClick}
                value="hammer"
                control={<Radio />}
                label="Hammer"
              />
              <FormControlLabel
                onClick={handleClick}
                value="kettlebell"
                control={<Radio />}
                label="Kettlebell"
              />
              <FormControlLabel
                onClick={handleClick}
                value="leverage machine"
                control={<Radio />}
                label="Leverage Machine"
              />
              <FormControlLabel
                onClick={handleClick}
                value="medicine ball"
                control={<Radio />}
                label="Medicine Ball"
              />
              <FormControlLabel
                onClick={handleClick}
                value="olympic barbell"
                control={<Radio />}
                label="Olympic Barbell"
              />
              <FormControlLabel
                onClick={handleClick}
                value="resistance band"
                control={<Radio />}
                label="Resistance Band"
              />
              <FormControlLabel
                onClick={handleClick}
                value="roller"
                control={<Radio />}
                label="Roller"
              />
              <FormControlLabel
                onClick={handleClick}
                value="rope"
                control={<Radio />}
                label="Rope"
              />
              <FormControlLabel
                onClick={handleClick}
                value="skierg machine"
                control={<Radio />}
                label="Skierg Machine"
              />
              <FormControlLabel
                onClick={handleClick}
                value="sled machine"
                control={<Radio />}
                label="Sled Machine"
              />
              <FormControlLabel
                onClick={handleClick}
                value="smit machine"
                control={<Radio />}
                label="Smit Machine"
              />
              <FormControlLabel
                onClick={handleClick}
                value="stability ball"
                control={<Radio />}
                label="Stability Ball"
              />
              <FormControlLabel
                onClick={handleClick}
                value="stationary bike"
                control={<Radio />}
                label="Stationary Bike"
              />
              <FormControlLabel
                onClick={handleClick}
                value="stepmill machine"
                control={<Radio />}
                label="Stepmill Machine"
              />
              <FormControlLabel
                onClick={handleClick}
                value="tire"
                control={<Radio />}
                label="Tire"
              />
              <FormControlLabel
                onClick={handleClick}
                value="trap bar"
                control={<Radio />}
                label="Trap Bar"
              />
              <FormControlLabel
                onClick={handleClick}
                value="weighted"
                control={<Radio />}
                label="Weighted"
              />
              <FormControlLabel
                onClick={handleClick}
                value="wheel roller"
                control={<Radio />}
                label="Wheel Roller"
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
                    <Typography
                      sx={{ width: "50%", flexShrink: 0, fontWeight: "bold" }}
                    >
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
