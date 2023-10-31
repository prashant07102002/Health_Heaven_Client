import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { axiosClient } from "../Utils/axiosClient";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [generatedOtp, setGeneratedOtp] = React.useState(0);
  const [enteredOtp, setEnteredOtp] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = async (event) => {
    event.preventDefault();
    if (event.target.name === "email") setEmail(event.target.value);
    else setPassword(event.target.value);
  };
  const handleEnteredOtp = async (event) => {
    event.preventDefault();
    setEnteredOtp(event.target.value);
  };
  const handleGenerateOtp = async (event) => {
    event.preventDefault();
    console.log(email);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/auth/getotp`,
        {
          email,
        }
      );
      console.log(response);
      setGeneratedOtp(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    try {
      const response = await axiosClient.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/auth/signup`,
        {
          email,
          password,
          firstName,
          lastName,
          generatedOtp,
          enteredOtp,
        }
      );
      console.log("response from sign up ", response);
      navigate("/signin");
    } catch (e) {
      console.log("the error is ", e);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            p: "2rem 3rem",
            maxWidth: "550px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={
                    email.includes("@gmail.com") || email.length === 0
                      ? false
                      : true
                  }
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  error={
                    password.length >= 8 || password.length === 0 ? false : true
                  }
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  name="otp"
                  label="OTP"
                  type="password"
                  id="otp"
                  onChange={handleEnteredOtp}
                />
                <Button
                  onClick={handleGenerateOtp}
                  type="submit"
                  size="small"
                  style={{ width: "200px" }}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Generate OTP
                </Button>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
