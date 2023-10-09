import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import imageUrl from '../Assets/home_gif.gif';
import { axiosClient } from '../Utils/axiosClient';
import homeGif1 from '../Assets/girl-running-on-treadmill.gif';
import homeGif2 from '../Assets/man-lifting-barbell.gif';
import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const Home = () => {
  useEffect(()=>{
    fetchData();
  },[]);
  async function fetchData(){
    const response=await axiosClient.get('/getdata/userdata');
    console.log("the respones is" ,response);
  }
  const theme = useTheme();
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const [activeStep, setActiveStep] = React.useState(0);
  
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const images = [
    homeGif1, homeGif2
  ];
  return (
    <>
    <Navbar />
    <Grid container spacing={2} 
    sx={{
      display: 'flex',
      justifyContent: 'space-evenly',
      mt: '5rem'
    }}
    >
      <Grid item xs={6}
      sx={{
        display: 'flex',
        // alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      >
        <Typography variant='h2'>Welcome to HealthHeaven </Typography>
        <Typography variant='h5'>Your Path to a Healthy and Active Lifestyle</Typography>
        <br/>
        <Typography variant='h6'>Are you a gym membership? Because I'm looking to get committed to something this year!</Typography>
        <Typography variant='h6'>At HealthHeaven, we are dedicated to helping you lead a healthier and happier life. Our platform provides you with the tools and resources you need to achieve your fitness and wellness goals.</Typography>
      </Grid>


      <Grid item xs={4}>
        {/* Carousel */}
        <Box sx={{ flexGrow: 1 }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((imgPath, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      maxWidth: '400px',
                      objectFit: 'cover'
                    }}
                    src={imgPath}
                    alt='Gif'
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
        </Box>
      </Grid>

    </Grid>
    </>
  )
}

export default Home
