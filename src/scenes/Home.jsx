import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import imageUrl from '../Assets/home_gif.gif';
import { axiosClient } from '../Utils/axiosClient';

const Home = () => {
  useEffect(()=>{
    fetchData();
  },[]);
  async function fetchData(){
    const response=await axiosClient.get('/getdata/userdata');
    console.log("the respones is" ,response);
  }
  return (
    <>
    <Navbar />
    <img src={imageUrl} alt="Computer man" 
      style={{
        objectFit: 'cover'
      }}
    />
    </>
  )
}

export default Home
