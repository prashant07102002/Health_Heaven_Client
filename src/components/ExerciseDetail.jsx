import { Typography } from "@mui/material";
import React from "react";

function ExerciseDetail({ item }) {
  let index = 1;
  return (
    <>
      <div style={{ margin: 20, display: "flex", gap: 30 }}>
        <img
          src={`${item.gifUrl}`}
          alt=""
          style={{ border: "1px solid black" }}
        />
        <div
          style={{
            marginRight: 120,
            marginTop: 80,
          }}
        >
          <Typography variant="body1" gutterBottom>
            <b>Body Part:</b> {item.bodyPart}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Equipment:</b> {item.equipment}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Target Muscle:</b> {item.target}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Secondary Muscles:</b>
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
    </>
  );
}

export default ExerciseDetail;
