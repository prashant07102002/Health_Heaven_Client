import React, { useState } from 'react'
import geolocation from 'geolocation';

const GymSearch = () => {
  const [gymList, setGymList] = useState([]);
  const [address, setAddress] = useState("");

  const findGyms = async () => {
    try {
        const res = await fetch('http://localhost:5001/gym/findGyms',
        {
          method: 'GET',
          headers: {
            query: address
          }
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
                    <div style={{padding: '10px'}}>
                        {elm.name}
                    </div>
                )
            })
        }    
    </div>
    </>
  )
}

export default GymSearch;