import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/fetchWeather/fetchWeatherSlice'
import loginReducer from '../features/login/loginSlice'
import signupReducer from '../features/signup/signupSlice'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    login: loginReducer,
    signup: signupReducer
  },
})