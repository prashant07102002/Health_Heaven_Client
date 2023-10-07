import React from 'react'
import Navbar from '../components/Navbar';
import imageUrl from '../Assets/home_gif.gif';

const Home = () => {
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
