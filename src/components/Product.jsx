import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Button,
  Divider,
} from "@mui/material";
// import { AddShoppingCart } from '@material-ui/icons';
import useStyles from "./styles/productStyles";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link, useNavigate } from "react-router-dom";

const labels = {
  0: "Useless",
  1: "Poor",
  2: "Ok",
  3: "Good",
  4: "Excellent",
  5: "Best In Class",
};

const Product = ({ product }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Card className={classes.root}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <img
            src={product.imgHref}
            style={{ height: "100%", objectFit: "contain" }}
            alt="img"
          ></img>
        </Box>
        <CardContent>
          <Link
            to={product.product_link}
            className={classes.cardContent}
            target="_blank"
          >
            <Typography gutterBottom variant="h5" component="h2">
              {product.title.slice(0, 40)}...
            </Typography>
          </Link>

          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: "850px",
            }}
          >
            {product.price}/-
            <Divider
              sx={{ height: 28, m: "0 0.25rem" }}
              orientation="vertical"
            />
            <Typography
              sx={{
                color: "#5e5e5e",
              }}
            >
              {product.percent_off}
            </Typography>
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Typography>Rating: </Typography>
            <Rating
              name="gym-feedback"
              value={product.rating}
              readOnly
              precision={0.1}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <Typography sx={{ display: "inline" }}>
              {`${product.users_rated}`}
            </Typography>
            <Typography sx={{ marginLeft: "20px" }}>
              {labels[Math.round(product.rating)]}
            </Typography>
          </Box>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <Link to={product.product_link} target="_blank">
            <Button variant="contained" onClick={() => navigate()}>
              Buy Now
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
