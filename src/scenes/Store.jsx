import React, { useEffect, useState } from 'react'
import Products from '../components/Products'
import {axiosClient} from '../Utils/axiosClient';
import Navbar from '../components/Navbar';
import SearchIcon from "@mui/icons-material/Search";
import { Container, IconButton, InputBase, Paper } from '@mui/material';

const Store = () => {

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getProducts = async () => {
    try {
      console.log(searchQuery);
      const response = await axiosClient.get(`/services/getProducts/${searchQuery}`);
      console.log(response.products);
    } catch (error) {
      console.log("Error in get products handler function: ", error)
    }
  }

  return (
    <div>
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
            p: "2px 10px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: "850px",
          }}
        >
          <InputBase
            placeholder="Search Products..."
            sx={{
              width: "100%",
            }}
            inputProps={{ "aria-label": "Search Products..." }}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={getProducts}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>

      <Products 
        products={products}
      />
    </div>
  )
}

export default Store
