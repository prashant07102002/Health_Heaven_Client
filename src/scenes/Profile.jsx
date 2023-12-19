import { Box, Button, Divider, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setLogout } from '../state';
import { axiosClient } from '../Utils/axiosClient';

const Profile = () => {

    const [pageType, setPageType] = useState("basic");
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const [loggedInUser, setLoggedInUser] = useState(
        useSelector((store) => store.user)
    );
    console.log(loggedInUser);

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

    const setCalories = async (event) => {
        try {
            event.preventDefault();
            const updatedUser = await axiosClient.post(`${process.env.REACT_APP_SERVER_BASE_URL}/getdata/bodyInfo/${loggedInUser._id}`,
            {
                ...formData,
                calculatedCalory: event.target.value
            });
            console.log(updatedUser);
            dispatch(setLogin(updatedUser));
            setLoggedInUser(updatedUser);
        } catch (error) {
            console.log(error);
        }
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
        navigate("/profile");
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
    <>
    <Navbar />
    <Box
      sx={{
        mt: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
        <Paper elevation={3} 
          sx={{
            width: '180px',
            height: '300px',
            mb: 'auto'
          }}
        >
            <Box
              sx={{
                p: '1rem',
                backgroundColor: `${pageType === 'basic' ? '#d4d4d4' : 'white'}`,
                '&:hover': {
                    backgroundColor: '#d4d4d4',
                    cursor: 'pointer'
                }
              }}
              onClick = {() => setPageType('basic')}
            >
                <Typography>Profile</Typography>
            </Box>
            <Divider />
            <Box
            sx={{
                p: '1rem',
                backgroundColor: `${pageType === 'body' ? '#d4d4d4' : 'white'}`,
                '&:hover': {
                    backgroundColor: '#d4d4d4',
                    cursor: 'pointer'
                }
              }}
              onClick = {() => setPageType('body')}
            >
                <Typography>Body Info</Typography>
            </Box>
            <Divider />
        </Paper>
        
        <Paper elevation={3} 
          sx={{
            width: '700px',
            height: 'auto',
            ml: '2rem',
            mb: 'auto'
          }}
        >
            {
                pageType === 'basic' && (
                    <>
                    <Box sx={{
                        textAlign: 'center'
                    }}>
                        <AccountCircleIcon sx={{ fontSize: "6rem" }}/>
                    </Box>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Name
                                        </TableCell>
                                        <TableCell align="right">
                                            {loggedInUser?.firstName} {loggedInUser?.lastName}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Email
                                        </TableCell>
                                        <TableCell align="right">
                                            {loggedInUser?.email}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    </>
                )
            }

            {
                (pageType === 'body' && loggedInUser?.calculatedCalories === undefined) && (
                    <>
                    <Typography sx={{textAlign: 'center', mt: 2}}>
                        ENTER YOUR DETAILS {`${loggedInUser.calculatedCalories}`}
                    </Typography>
                    <Box component="form" noValidate sx={{ p: '0 2rem' }}>
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
                            Get Calories
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
                                        <Box>
                                            {`${rowData.maintain} cal`}
                                        </Box>
                                    <Button
                                        onClick={setCalories}
                                        size="small"
                                        style={{ marginTop: "10px" }}
                                        variant="contained"
                                        value={rowData.maintain}
                                    >
                                        Set Calories
                                    </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                    <Box>
                                            {`${rowData.loose} cal`}
                                        </Box>
                                    <Button
                                        onClick={setCalories}
                                        size="small"
                                        style={{ marginTop: "10px" }}
                                        variant="contained"
                                        value={rowData.loose}
                                    >
                                        Set Calories
                                    </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                    <Box>
                                            {`${rowData.gain} cal`}
                                        </Box>
                                    <Button
                                        onClick={setCalories}
                                        size="small"
                                        style={{ marginTop: "10px" }}
                                        variant="contained"
                                        value={rowData.gain}
                                    >
                                        Set Calories
                                    </Button>
                                    </TableCell>
                                    <TableCell align="center">{rowData.bmr}</TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                            </TableContainer>
                        ) : null}
                        </Box>
                    </>
                ) 
            }

            {
                (pageType === 'body' && loggedInUser.calculatedCalories !== undefined) && (
                    <>
                        <Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableBody>
                                        <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Gender
                                            </TableCell>
                                            <TableCell align="right">
                                                {loggedInUser.gender}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Age
                                            </TableCell>
                                            <TableCell align="right">
                                                {loggedInUser.age}yrs
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Height{`(cm)`}
                                            </TableCell>
                                            <TableCell align="right">
                                                {loggedInUser.height}cm
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Calories Intake
                                            </TableCell>
                                            <TableCell align="right">
                                                {loggedInUser.calculatedCalories}cal
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </>
                )
            }
            
            {
                pageType === 'account' && (
                    <>
                    To Be Implemented :)
                    </>
                )
            }
            
        </Paper>
    </Box>
    </>
  )
}

export default Profile
