import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function CalorieCalculator({ setCalorie, handleClose }) {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    activity: "",
  });
  const [rowData, setrowData] = useState({
    maintain: "",
    loose: "",
    gain: "",
    bmr: "",
  });
  const [allDetail, setallDetail] = useState("null");

  const handleChange = async (event) => {
    const { value, name } = event.target;
    setformData({ ...formData, [name]: value });
  };

  function containsOnlyDigits(str) {
    if (str === "") {
      return true;
    }
    return /^\d+$/.test(str);
  }

  const sendDataToParent = async (event) => {
    event.preventDefault();
    setCalorie(event.target.value);
    handleClose();
    // const calorieSelected = event.target.value;
    // console.log(calorieSelected);
    // dispatch(
    //   setCalories({
    //     calories: calorieSelected,
    //   })
    // );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    const height = formData.height;
    const weight = formData.weight;
    const age = formData.age;
    const gender = formData.gender;
    const activitylevel = formData.activity;

    if (!height || !weight || !age || !gender || !activitylevel) {
      navigate("/services/dietPlanner");
      setallDetail("false");
    } else {
      setallDetail("true");
      const apiUrl = `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activitylevel}`;

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "X-RapidAPI-Key":
              "ff94c0bc05msh5a7801f49a4f3bep1a28d1jsn2bdd0a1f41af",
            "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
          },
        });
        console.log("the data after calling api is ", response.data);
        const goals = response.data.data.goals;
        console.log(goals);
        setrowData({
          ...rowData,
          maintain: goals["maintain weight"],
          loose: goals["Weight loss"].calory,
          gain: goals["Weight gain"].calory,
          bmr: response.data.data.BMR,
        });
        // console.log("value of you bmr is : ",rowData.bmr);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
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
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "600px",
          backgroundColor: "white",
          padding: "2rem 2rem",
        }}
      >
        <Typography component="h1" variant="h5">
          Nutrition Calculator
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            error={
              formData.height !== "" &&
              (!containsOnlyDigits(formData.height) ||
                !(formData.height >= 130 && formData.height <= 230))
            }
            helperText={
              formData.height !== "" &&
              (!containsOnlyDigits(formData.height) ||
                !(formData.height >= 130 && formData.height <= 230))
                ? `height should be numeric and in range 130-230`
                : ""
            }
            id="height"
            label="Height(cm)"
            name="height"
            autoComplete="off"
            size="small"
            value={formData.height}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            error={
              formData.weight !== "" &&
              (!containsOnlyDigits(formData.weight) ||
                !(formData.weight >= 40 && formData.weight <= 160))
            }
            helperText={
              formData.weight !== "" &&
              (!containsOnlyDigits(formData.weight) ||
                !(formData.weight >= 40 && formData.weight <= 160))
                ? `weight should numeric and in range 40-160`
                : ""
            }
            required
            fullWidth
            id="weight"
            label="Weight(kg)"
            name="weight"
            autoComplete="off"
            size="small"
            value={formData.weight}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            error={
              formData.age !== "" &&
              (!containsOnlyDigits(formData.age) ||
                !(formData.age > 0 && formData.age <= 80))
            }
            helperText={
              formData.age !== "" &&
              (!containsOnlyDigits(formData.age) ||
                !(formData.age > 0 && formData.age <= 80))
                ? `age should be numeric and in range 0-80`
                : ""
            }
            required
            fullWidth
            id="age"
            label="Age"
            name="age"
            autoComplete="off"
            size="small"
            value={formData.age}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            select
            id="gender"
            label="Gender"
            name="gender"
            size="small"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            required
            select
            fullWidth
            id="activity"
            label="Activity level"
            name="activity"
            autoComplete="off"
            size="small"
            value={formData.activity}
            onChange={handleChange}
          >
            <MenuItem value="level_1">
              Sedentary: little or no exercise
            </MenuItem>
            <MenuItem value="level_2">Exercise 1-3 times/week</MenuItem>
            <MenuItem value="level_3">Exercise 4-5 times/week</MenuItem>
            <MenuItem value="level_4">
              Daily exercise or intense exercise 3-4 times/week
            </MenuItem>
            <MenuItem value="level_5">Intense exercise 6-7 times/week</MenuItem>
            <MenuItem value="level_6">
              Very intense exercise daily, or physical job
            </MenuItem>
          </TextField>
          {allDetail === "false" ? (
            <div style={{ color: "red" }}>all fields are required</div>
          ) : null}
          <Button
            type="submit"
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Calculate Calorie
          </Button>
          {allDetail === "true" ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"> Maintain Weight</TableCell>
                    <TableCell align="center">Loose Weight</TableCell>
                    <TableCell align="center">Gain Weight</TableCell>
                    <TableCell align="center">BMR</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <Button
                        onClick={sendDataToParent}
                        size="small"
                        style={{ marginTop: "10px" }}
                        variant="contained"
                        value={rowData.maintain}
                      >
                        {`${rowData.maintain} cal`}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={sendDataToParent}
                        size="small"
                        style={{ marginTop: "10px" }}
                        variant="contained"
                        value={rowData.loose}
                      >
                        {`${rowData.loose} cal`}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={sendDataToParent}
                        size="small"
                        style={{ marginTop: "10px" }}
                        variant="contained"
                        value={rowData.gain}
                      >
                        {`${rowData.gain} cal`}
                      </Button>
                    </TableCell>
                    <TableCell align="center">{rowData.bmr}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </Box>
      </Paper>
    </Container>
  );
}

export default CalorieCalculator;
