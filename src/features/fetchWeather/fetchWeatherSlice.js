import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import conf from "../../conf/conf"

const initialState = {
  status: "idle",
  weatherData: {},
  weatherArr: [],
  delhiWeather: {},
  weatherHistory: []
}

export const fetchAsync = createAsyncThunk(
    'weather/fetchWeather',
    async (inputCity, options) => {
      try {
        const tokenObj =  JSON.parse(localStorage.getItem('token'));
          const response = await axios.get(`${conf.serverBaseUrl}/users/cityName/${inputCity}`, {
            headers: {
              "Authorization": "Bearer "+tokenObj?.token
            }
          });
         
          const result = response.data;
  
        return result;
      } catch (error) {
        throw options.rejectWithValue(error?.response?.data)
      }
    }
)


export const fetchAsyncArr = createAsyncThunk(
  'weather/fetchWeatherArr',
  async (_, options) => {
    try {
      const tokenObj =  JSON.parse(localStorage.getItem('token'));
      const response = await axios.get(`${conf.serverBaseUrl}/users/cities`, {
        headers: {
          "Authorization": "Bearer "+tokenObj?.token
        }
      });
  
     const result = response.data;
  
     return result;
    } catch (error) {
      throw options.rejectWithValue(error?.response?.data)
    }
      
  }
)

export const fetchAsyncDelhi = createAsyncThunk(
  'weather/fetchDelhiWeather',
  async (_, options) => {
    try {
      const tokenObj =  JSON.parse(localStorage.getItem('token'));
      const response = await axios.get(`${conf.serverBaseUrl}/users/delhi`, {
        headers: {
          "Authorization": "Bearer "+tokenObj?.token
        }
      });
  
     const result = response.data;
  
     return result;
    } catch (error) {
      throw options.rejectWithValue(error?.response?.data)
    }
      
  }
)



export const getWeatherHistory = createAsyncThunk(
  'weather/getWeatherHistory',
  async (_, options) => {
    try {
      const tokenObj =  JSON.parse(localStorage.getItem('token'));
      const response = await axios.get(`${conf.serverBaseUrl}/users/weatherHistory`, {
        headers: {
          "Authorization": "Bearer "+tokenObj?.token
        }
      });
  
     const result = response.data;
  
     return result;
    } catch (error) {
      throw options.rejectWithValue(error?.response?.data)
    }
      
  }
)


export const clearWeatherHistory = createAsyncThunk(
  'weather/clearWeatherHistory',
  async (_, options) => {
    try {
      const tokenObj =  JSON.parse(localStorage.getItem('token'));
      const response = await axios.delete(`${conf.serverBaseUrl}/users/clearHistory`, {
        headers: {
          "Authorization": "Bearer "+tokenObj?.token
        }
      });
  
     const result = response.data;
  
     return result;
    } catch (error) {
      throw options.rejectWithValue(error?.response?.data)
    }
      
  }
)



export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {

  },

  extraReducers: (builder)=>{
    builder
    .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";

})
.addCase(fetchAsync.fulfilled, (state, action)=>{
        state.status = "idle";
        console.log("action.payload ",action.payload);
        state.weatherData = action.payload;
})
.addCase(fetchAsync.rejected, (state, action)=>{
    state.status = action.payload;
    console.log("state.error", action.payload);
})

.addCase(fetchAsyncArr.pending, (state)=>{
  state.status = "loading";
})
.addCase(fetchAsyncArr.fulfilled, (state, action)=>{
  state.status = "idle";
  state.weatherArr = action.payload;

})
.addCase(fetchAsyncArr.rejected, (state, action)=>{
  state.status = action.payload;
})

.addCase(fetchAsyncDelhi.pending, (state)=>{
state.status = "loading";
})
.addCase(fetchAsyncDelhi.fulfilled, (state, action)=>{
state.delhiWeather = action.payload;
})
.addCase(fetchAsyncDelhi.rejected, (state, action)=>{
 state.status = action.payload;
})

.addCase(getWeatherHistory.pending, (state, action)=>{
  state.status = "loading";
})
.addCase(getWeatherHistory.fulfilled, (state, action)=>{
  state.weatherHistory = action.payload
})
.addCase(getWeatherHistory.rejected, (state, action)=>{
  state.status = action.payload
})

.addCase(clearWeatherHistory.pending, (state, action)=>{
  state.status = "loading";
})
.addCase(clearWeatherHistory.fulfilled, (state, action)=>{
  state.weatherHistory = []
})
.addCase(clearWeatherHistory.rejected, (state, action)=>{
  state.status = action.payload
})
  }
})


const weatherReducer = weatherSlice.reducer

export default weatherReducer