import { Button, ImageListItem, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Meal(props) {
  const [imgUrl, setImageUrl] = useState("");
  const recipeUrl = props.mealno.sourceUrl;
  const fetchData = async () => {
    const apiUrl = `https://api.spoonacular.com/recipes/${props.mealno.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&includeNutrition=false`;
    const response = await axios.get(apiUrl);
    console.log(response.data.image);
    setImageUrl(response.data.image);
  };
  useEffect(
    () => {
      fetchData();
    },
    [props.mealno.id],
    fetchData()
  );
  const paperStyle = {
    width: "600px",
    height: "150px",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    margin: "20px",
  };
  return (
    <Paper style={paperStyle} elevation={5}>
      {/* <ImageList sx={{ width: 500, height: 100 }} cols={3} rowHeight={164}> */}
      <ImageListItem
        style={{
          display: "flex",
        }}
      >
        <img
          srcSet={`${imgUrl}`}
          //   src={`https://spoonacular.com/recipeImages/157399-556x370.jpg`}
          alt="hello"
          loading="lazy"
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "10px",
            marginRight: "20px",
          }}
        />
        <div>
          <Typography
            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
            component="h2"
          >
            {props.mealno.title}
          </Typography>
          <Typography
            style={{ fontSize: "0.9rem" }}
            variant="caption"
            component="h2"
          >
            {`Servings : ${props.mealno.servings}`}
          </Typography>
          <Typography
            style={{ fontSize: "0.9rem" }}
            variant="caption"
            component="h2"
          >
            {`Ready in minutes : ${props.mealno.readyInMinutes}`}
          </Typography>
          <a target="_blank" rel="noreferrer" href={recipeUrl}>
            <Button
              style={{ marginTop: "10px" }}
              size="small"
              variant="contained"
            >
              Want Recipe
            </Button>
          </a>
        </div>
      </ImageListItem>
      {/* </ImageList> */}
    </Paper>
  );
}

export default Meal;
