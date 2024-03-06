import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearWeatherHistory, fetchAsyncDelhi, getWeatherHistory } from '../features/fetchWeather/fetchWeatherSlice';
import MainHeader from "../components/header/MainHeader"
import { useNavigate } from 'react-router-dom';

const SearchHistory = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const delhiWeather = useSelector(state=> state.weather.delhiWeather);
   const weatherHistory = useSelector(state=> state.weather.weatherHistory);
    const status = useSelector(state=> state.weather.status);

    const isJWTexpired = useSelector(state=> state.login.isJWTexpired);

    useEffect(()=>{
   if(isJWTexpired){
    navigate('/')
   }
    }, [isJWTexpired])
    

    useEffect(()=>{
    dispatch(getWeatherHistory())
    }, [])

    useEffect(()=>{
      dispatch(fetchAsyncDelhi())
    }, [])

  return (
    <div>
      <MainHeader />

     {((!delhiWeather?.temp) && (status==="loading"))?
     <div className=' flex justify-center h-[50vh] items-center'>

     <div className='inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent border-gray-600 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div> 
          
          </div>

          :

          (weatherHistory.length === 0)? <h1 className=' text-center font-bold'>No search history</h1> :
     
      <div>

{weatherHistory.length > 0 && 
        <div className=' flex justify-end'>
            <button className=' bg-red-500 px-3 py-1 rounded font-bold text-white mr-4' onClick={()=>{
                dispatch(clearWeatherHistory())
            }}>Clear Search history</button>
        </div>}

      
        {weatherHistory?.map((weatherDocument)=> 
        <div className=' bg-indigo-100 rounded my-3 font-semibold pl-10 border-2 border-gray-400' key={weatherDocument._id}>
            <h1>City ->   {weatherDocument?.cityName}</h1>
            <div className=' my-2'>
            <p>Temperature ->   {weatherDocument?.temp}&deg; Celsius</p>
         <p>Maximum Temperature ->   {weatherDocument?.max_temp}&deg; Celsius</p>
         <p>Minimum Temperature ->   {weatherDocument?.min_temp}&deg; Celsius</p>
            </div>
        
        <div className=' my-2'>
            <p>Humidity ->   {weatherDocument?.humidity }%</p>
            <p>Cloud PCT -> {weatherDocument?.cloud_pct}</p>
            <p>Feels Like -> {weatherDocument?.feels_like}&deg; Celsius</p>
        </div>

        <div className=' my-2'>
         <p>Wind Speed -> {weatherDocument?.finalSpeed} Km/h</p>
         <p>Wind Degree -> {weatherDocument?.wind_degrees}&deg;</p>
         <p>Searched at -> {weatherDocument?.ist}</p>
        </div>

        </div> )
}

      </div>

    
      
      }
    </div>
  )
}

export default SearchHistory
