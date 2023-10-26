import { Typography } from "@mui/material";
import React from "react";

function ExerciseDetail({ item }) {
  let index = 1;
  return (
    <div>
      {/* <img src={`${item.gifUrl}`} alt="" /> */}
      <div style={{ margin: 20 }}>
        <img
          src="https://v2.exercisedb.io/image/mBLxdOGUeEcqRg"
          alt=""
          style={{ border: "1px solid black" }}
        />
        <div style={{ float: "right", marginRight: 150, marginTop: 80 }}>
          <Typography variant="body1" gutterBottom>
            <div style={{ fontWeight: "bold" }}> Body Part:</div>{" "}
            {item.bodyPart}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <div style={{ fontWeight: "bold" }}>Equipment:</div>{" "}
            {item.equipment}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <div style={{ fontWeight: "bold" }}>Target Muscle:</div>{" "}
            {item.target}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <div style={{ fontWeight: "bold" }}>Secondary Muscles:</div>
            {item.secondaryMuscles.map((item) => {
              return ` ${item} ,`;
            })}
          </Typography>
        </div>
      </div>

      <Typography variant="body1" gutterBottom>
        <div style={{ fontWeight: "bold" }}>Instructions:</div>
        {item.instructions.map((item, i) => {
          return <Typography key={i}>{`${index++}. ${item}`}</Typography>;
        })}
      </Typography>
    </div>
  );
}

export default ExerciseDetail;
