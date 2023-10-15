import React, { useState } from "react";
import geolocation from "geolocation";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import gymImage from "../Assets/gym_demo_img.jpg";
import DirectionsIcon from "@mui/icons-material/Directions";
import StarIcon from "@mui/icons-material/Star";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const labels = {
  0: "Useless",
  1: "Poor",
  2: "Ok",
  3: "Good",
  4: "Excellent",
  5: "Best In Class",
};

const GymSearch = () => {
  const [gymList, setGymList] = useState([]);
  const [address, setAddress] = useState("");

  const getMapsLink = (str) => {
    let link = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '"') {
        i++;
        while (str[i] !== '"') {
          link += str[i];
          i++;
        }
      }
    }
    return link;
  };

  const findGyms = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/services/findGyms?query=${address}`,
        {
          method: "GET",
        }
      );
      const { results } = await res.json();
      setGymList(results);
      // const data = await res.json();
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  const getNearbyGyms = async (position) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/services/nearbyGyms`,
        {
          method: "GET",
          headers: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }
      );
      const { results } = await res.json();
      setGymList(results);
      // const data = await res.json();
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  const getGeolocation = () => {
    geolocation.getCurrentPosition((err, position) => {
      if (err) window.alert("Please Allow Location Access");
      getNearbyGyms(position);
    });
  };

  return (
    <>
      <Navbar />

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: "2rem 5rem",
        }}
      >
        <Paper
          component="form"
          elevation={3}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: "850px",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <EditLocationIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Gyms Near"
            inputProps={{ "aria-label": "Search Gyms Near" }}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={findGyms}
          >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Button color="secondary" onClick={getGeolocation}>
            <GpsFixedIcon sx={{ mr: "0.5rem" }} />
            Near Me
          </Button>
        </Paper>
      </Container>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
          p: "2rem 5rem",
        }}
      >
        {gymList.length > 0
          ? gymList.map((gym, i) => {
              return (
                <Paper
                  key={i}
                  elevation={3}
                  sx={{
                    width: "100%",
                    maxWidth: "850px",
                    display: "flex",
                    gap: "2rem",
                    padding: "0.7rem",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      display: "block",
                      overflow: "hidden",
                      maxWidth: "150px",
                      objectFit: "cover",
                    }}
                    src={gymImage}
                    alt="img"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    <Typography variant="h4">{gym.name}</Typography>
                    <Typography variant="h7">
                      {gym.formatted_address || gym.vicinity}
                    </Typography>
                    <Box>
                      Place Status: {gym.business_status}
                      <br />
                      {gym.opening_hours && gym.opening_hours.open_now ? (
                        <Typography sx={{ color: "green" }}>
                          Open Now
                        </Typography>
                      ) : (
                        <Typography sx={{ color: "Red" }}>
                          Currently Closed
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: "flex", marginTop: "auto" }}>
                      <Typography>Rating: </Typography>
                      <Rating
                        name="gym-feedback"
                        value={gym.rating}
                        readOnly
                        precision={0.1}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      <Typography sx={{ display: "inline" }}>
                        {`(${gym.user_ratings_total}) `}
                        {labels[Math.round(gym.rating)]}
                      </Typography>
                      {gym.photos && gym.photos[0].html_attributions ? (
                        <a
                          href={getMapsLink(gym.photos[0].html_attributions[0])}
                          rel="noreferrer"
                          target="_blank"
                          style={{ marginLeft: "auto" }}
                        >
                          <Button>
                            Directions
                            <DirectionsIcon sx={{ pl: "0.25rem" }} />
                          </Button>
                        </a>
                      ) : null}
                    </Box>
                  </Box>
                </Paper>
              );
            })
          : null}
      </Container>
    </>
  );
};

export default GymSearch;
