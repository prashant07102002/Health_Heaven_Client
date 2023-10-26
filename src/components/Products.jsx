import React from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import useStyles from './styles/productsStyles';
import { Typography } from '@mui/material';

const Products = ({ products }) => {
  const classes = useStyles();

  if (!products.length) return (
    <>
    <Typography variant='h3' sx={{
      textAlign: 'center'
    }}>
      No Products To Display
    </Typography>
    </>
  );

  return (
    <>
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product, i) => (
          <Grid className={classes.bgColor} key={i} item xs={12} sm={6} md={4} lg={3}>
            <Product key={i} product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
    </>
  );
};

export default Products;