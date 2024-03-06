import { useEffect, useState } from 'react'
import FetchWeather from "../features/fetchWeather/FetchWeather"
import DisplayWeather from "../components/DisplayWeather"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncArr, fetchAsyncDelhi } from '../features/fetchWeather/fetchWeatherSlice'
import DiffCitiesWeather from '../components/DiffCitiesWeather'
import MainHeader from '../components/header/MainHeader'
import { useNavigate } from 'react-router-dom'

function WeatherApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isJWTexpired = useSelector(state=> state.login.isJWTexpired);
  const delhiWeather = useSelector(state=> state.weather.delhiWeather);
  const status = useSelector(state=> state.weather.status);

  useEffect(()=>{
 if(isJWTexpired){
  navigate('/')
 }
  }, [isJWTexpired])


  useEffect(()=>{
    dispatch(fetchAsyncArr())
  }, [])

  useEffect(()=>{
    dispatch(fetchAsyncDelhi())
  }, [])

  return (
    <>
    <MainHeader />
    {(!delhiWeather?.temp && status==="loading")?

<div className=' flex justify-center h-[50vh] items-center'>

<div className='inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent border-gray-600 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div> 
     
     </div>

     :


    <div>
  <h1 className=' font-bold text-center text-2xl mt-1 md:text-3xl mb-3'>Weather App</h1>
    <FetchWeather />
    <DisplayWeather />

    <DiffCitiesWeather />
    </div>
  
  }
    </>
  )
}

export default WeatherApp
