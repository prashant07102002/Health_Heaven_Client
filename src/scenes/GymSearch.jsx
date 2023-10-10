import React, { useState } from 'react'
import geolocation from 'geolocation';
import Navbar from '../components/Navbar';
import { Box, Container, Divider, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import DirectionsIcon from '@mui/icons-material/Directions';

const GymSearch = () => {
  const [gymList, setGymList] = useState([{
    "business_status": "OPERATIONAL",
    "formatted_address": "28/1, Patnipura Chauraha, HIG Main Rd, Nanda Nagar, Indore, Madhya Pradesh 452011, India",
    "geometry": {
        "location": {
            "lat": 22.7413867,
            "lng": 75.8784912
        },
        "viewport": {
            "northeast": {
                "lat": 22.74270562989272,
                "lng": 75.87982032989272
            },
            "southwest": {
                "lat": 22.74000597010728,
                "lng": 75.87712067010727
            }
        }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    "icon_background_color": "#7B9EB0",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    "name": "AiSh Zumba Classes",
    "opening_hours": {
        "open_now": false
    },
    "photos": [
        {
            "height": 2322,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/107329173698105199329\">A Google User</a>"
            ],
            "photo_reference": "ATJ83zgsvQpIO581J_uTMN2YIiIWmMRlzyARUNyVevuJQP8iqRrxvws4KGijDjEJ1eqAo_GIPWBCrzpBLPj8mVwErPv8N3d-_-Xu83rfu7Mwo8OODev2hq6uP0rLBwZ7MZoNHRmSitYsG2tmL8z0YlmgaKKk6ZbojTUo-OT5u4KIGQ79xUJg",
            "width": 2322
        }
    ],
    "place_id": "ChIJpSdFx139YjkRm-Oc5rQcEvI",
    "plus_code": {
        "compound_code": "PVRH+HC Indore, Madhya Pradesh",
        "global_code": "7JJQPVRH+HC"
    },
    "rating": 4.1,
    "reference": "ChIJpSdFx139YjkRm-Oc5rQcEvI",
    "types": [
        "gym",
        "health",
        "point_of_interest",
        "establishment"
    ],
    "user_ratings_total": 19
}]);
  const [address, setAddress] = useState("");

  const findGyms = async () => {
    try {
        const res = await fetch('http://localhost:8000/services/findGyms',
        {
          method: 'GET',
          body: JSON.stringify({
            query: address
          })
        });
        const { results } = await res.json();
        setGymList(results);
        // const data = await res.json();
        console.log(results);
    } catch (error) {
        console.log(error);
    }
  }

  const getNearbyGyms = async (position) => {
    try {
      const res = await fetch('http://localhost:5001/gym/nearbyGyms',
      {
        method: 'GET',
        headers: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })
      const { results } = await res.json();
      setGymList(results);
      // const data = await res.json();
      console.log(results);
    } catch (error) {
        console.log(error);
    }
  }

  const getGeolocation = () => {
    geolocation.getCurrentPosition((err, position) => {
      if (err) throw err
      console.log(position);
      getNearbyGyms(position);
    })
  }

  return (
    <>
    <Navbar />

    <Container
      sx={{
        alignItems: 'center',
        p: '2rem 5rem'
      }}
    >
      <Paper
        component="form"
        elevation={3}
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%'}}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <EditLocationIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Gyms Near"
          inputProps={{ 'aria-label': 'Search Gyms Near' }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Container>

    <Container
    sx={{
      alignItems: 'center',
      p: '2rem 5rem'
    }}
    >
      {
        gymList.length > 0 ? (
          gymList.map((gym, i) => {
            return (
              <Paper key={i} elevation={3}
              sx={{
                width: '100%',
                height: '200px'
              }}
              >
                
              </Paper>
            )
          })
        ) : (
          null
        )
      }
    </Container>

    {/* <Container sx={{
      backgroundColor: 'white'
    }}>
      <InputBase
        sx={{ ml: 1, flex: 1, backgroundColor: 'gray' }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Container>
    <div id='map'></div>
    <input type='text' placeholder='ENTER LOCATION' id='autocomplete' onChange={(e) => setAddress(e.target.value)} />
    or
    <button onClick={getGeolocation}>Locate me</button>
    <br />
    <button onClick={findGyms}>Get Gyms</button>
    <div>
        {
            gymList.map((elm, i) => {
                return (
                    <div key={i} style={{padding: '10px'}}>
                        {elm.name}
                    </div>
                )
            })
        }
    </div> */}
    </>
  )
}

export default GymSearch;