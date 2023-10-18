import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  CardActions,
  Container,
  CardContent,
  Typography,
  TextField,
  FormControlLabel,
  Paper,
  Stack,
  Chip,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import Meal from "../components/Meal";
import ResponsiveAppBar from "../components/Navbar";
import CalorieCalculator from "../components/CalorieCalculator";
import { axiosClient } from "../Utils/axiosClient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  maxHeight: "100vh",
  overflowY: "auto",
  // bgcolor: 'background.paper',
  // border: "2px solid #000",
  boxShadow: 24,
  overFlow: "auto",
  p: 4,
};

function DietPlanner() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [calorie, setCalorie] = React.useState(2000);
  const [checked, setChecked] = React.useState(false);
  const [meal, setMeal] = React.useState([]);
  const [nutrient, setNutrient] = React.useState({
    calories: 0,
    protien: 0,
    fat: 0,
    carbohydates: 0,
  });
  function handleChange(event) {
    setCalorie(event.target.value);
  }

  const handleCheck = async (event) => {
    const getvalue = event.target.value;
    if (getvalue === "true") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=${
        process.env.REACT_APP_SPOONACULAR_API_KEY
      }&timeFrame=day&targetCalories=${calorie}&${
        checked ? "diet=vegetarian" : ""
      }`;
      console.log("api is ", apiUrl);
      const response = await axios.get(apiUrl);
      console.log(response.data);
      setMeal(response.data.meals);
      const nutrients = response.data.nutrients;
      setNutrient({
        ...nutrient,
        calories: nutrients.calories,
        protien: nutrients.protein,
        fat: nutrients.fat,
        carbohydates: nutrients.carbohydrates,
      });
      // console.log(response.data.meals.length);
      // console.log("length is ", meal.length);
      // console.log("the meal array is", meal);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#fff5e6", minHeight: "100%" }}>
      <ResponsiveAppBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography style={{ marginTop: "20px" }} variant="h4" gutterBottom>
          Nutrition Nirvana: Your Personalized Diet Planner
        </Typography>
        <Typography
          style={{
            marginInline: "250px",
            textAlign: "center",
            fontSize: "1.1rem",
          }}
          variant="caption"
          gutterBottom
        >
          Welcome to Health Heaven's exclusive diet planner, where we believe
          that achieving optimal health can be a journey filled with delight and
          satisfaction. With our personalized diet planner, we invite you to
          discover a realm of nutrition tailored uniquely to you.
        </Typography>
        <Typography
          style={{ marginTop: "20px", fontWeight: "bold", fontSize: "1.1rem" }}
          variant="body1"
          gutterBottom
        >
          Ready to Revamp Your Diet? Let Our Diet Planner Lead the Way
        </Typography>
      </div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: 600,
            height: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Typography component="h1" variant="h5">
              Enter Your Daily Calorie Requirement
            </Typography>
            <div
              style={{
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Button onClick={handleOpen}>Want to Calculate Calorie?</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <CalorieCalculator
                    setCalorie={setCalorie}
                    handleClose={handleClose}
                  />
                </Box>
              </Modal>
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="calorie"
              label="Calories"
              name="calorie"
              autoComplete="off"
              size="small"
              value={calorie}
              onChange={handleChange}
              // onSubmit={handleSubmit}
            />
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="veg"
                control={
                  <Radio value={true} color="success" onClick={handleCheck} />
                }
                label="Vegetarian"
              />
              <FormControlLabel
                value="nonveg"
                control={
                  <Radio
                    value={false}
                    sx={{
                      // color: "green",
                      "&.Mui-checked": {
                        color: "brown",
                      },
                    }}
                    onClick={handleCheck}
                  />
                }
                label="Non-vegetarian"
              />
            </RadioGroup>
            <CardActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                size="small"
                style={{ marginTop: "10px" }}
              >
                Generate Meal Plan
              </Button>
            </CardActions>
          </CardContent>
        </Paper>
      </Container>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {meal.length > 0 ? (
          <div>
            <Typography
              style={{ marginTop: "20px", textAlign: "center" }}
              variant="h5"
              gutterBottom
            >
              Fueling Your Wellness: The Day's Diet
            </Typography>
            <Typography
              style={{ marginTop: "20px", textAlign: "center" }}
              variant="h5"
              gutterBottom
            >
              Macros
            </Typography>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              direction="row"
              spacing={2}
            >
              <Chip
                color="info"
                label={`Calories: ${nutrient.calories}`}
                variant="filled"
              />
              <Chip
                color="info"
                label={`Protien: ${nutrient.protien}`}
                variant="filled"
              />
              <Chip
                color="info"
                label={`Fat: ${nutrient.fat}`}
                variant="filled"
              />
              <Chip
                color="info"
                label={`Carbohydrate: ${nutrient.carbohydates}`}
                variant="filled"
              />
            </Stack>
            <div>
              {meal.map((mealno, i) => {
                return <Meal key={i} mealno={mealno} />;
              })}
            </div>
          </div>
        ) : null}
      </Box>
    </div>
  );
}
export default DietPlanner;
