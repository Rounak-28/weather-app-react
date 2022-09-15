import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import searchIcon from "./assets/searchIcon.png"

function App() {
  const [location, setLocation] = useState("puruliya")
  const [dataArr, setDataArr] = useState([])

  let apiKey = `${process.env.REACT_APP_API_KEY}`

  useEffect(() => {
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`

    const fetchData = async ()=>{
      try {
        let response = await fetch(url)
        let json = await response.json()
        setDataArr(json)
      } 
      catch (error) {console.log(error)}
    }
    fetchData()
  }, [location])
  

  const handleInputBtnClick = ()=>{
    let newLocation
    newLocation = document.getElementById("inpt").value
    setLocation(newLocation)
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-[#222222] flex justify-center items-center text-white'>
      <div className='w-[500px] h-[400px] bg-[#060606] rounded-3xl space-y-8 flex flex-col items-center'>
        <div className="input flex justify-center items-center  w-[95%] h-12 mt-11 space-x-3">
          <input 
          type="text" 
          className='bg-[#1a1a1a] w-[70%] h-12 rounded-full indent-5 text-xl focus:outline-none' 
          placeholder='Search Location'
          id='inpt'
           />
          <div
           className="searchIcon w-12 h-12 rounded-full bg-[#222222] flex justify-center items-center"
           onClick={handleInputBtnClick}>
            <img src={searchIcon} alt="sIcon" className='w-4' />
          </div>
        </div>
        <div className='flex flex-col mx-12 w-[77%] justify-start'>
          <p className='text-3xl'>Weather in {location}</p>
          <p className='text-5xl my-6'>{dataArr?.current?.temp_c}°C</p>
          <div  className='flex items-center'>
            <img src={dataArr?.current?.condition?.icon} alt="cIcon" />
            <span className='text-xl'>{dataArr?.current?.condition?.text}</span>
          </div>
          <p className='text-xl'>Humidity: {dataArr?.current?.humidity}%</p>
          <p className='text-xl'>Wind speed: {dataArr?.current?.wind_kph} km/h</p>
        </div>
      </div>
    </div>
  );
}

export default App;
