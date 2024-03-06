import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../conf/conf";

const initialState = {
    status: 'idle',
    tokenState: {},
    isJWTexpired: false,
    isJWTmalformed: false
}

const fetchweatherErr = createAction("weather/fetchWeather/rejected");
const featchWeatherArrErr = createAction("weather/fetchWeatherArr/rejected");
const delhiWeatherErr = createAction("weather/fetchDelhiWeather/rejected");
const weatherHistoryErr = createAction("weather/getWeatherHistory/rejected");
const clearWeatherHistoryErr = createAction("weather/clearWeatherHistory/rejected");
const signupFulfilled = createAction("signup/fetchToken/fulfilled");


export const loginAsync = createAsyncThunk(
    'login/fetchToken',
    async (formVal, options) => {
        try {
            const response = await axios.post(`${conf.serverBaseUrl}/auth/login`, formVal);
          
            const token = response.data;
            return token;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
       setTokenState: (state)=>{
        state.tokenState = {}
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(loginAsync.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.tokenState = action.payload;
                state.isJWTexpired = false;
               localStorage.setItem('token', JSON.stringify(action.payload));
               state.isJWTmalformed = false;
        })
        .addCase(loginAsync.rejected, (state, action)=>{
          
            state.status = action.payload;
        })

        .addCase(fetchweatherErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })

        .addCase(featchWeatherArrErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })

        .addCase(delhiWeatherErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })

        .addCase(weatherHistoryErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })

        .addCase(clearWeatherHistoryErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })

        
        .addCase(signupFulfilled, (state, action)=>{
            state.isJWTexpired = false
            state.isJWTmalformed = false
        })
    }
})

export const {setTokenState} = loginSlice.actions 

const loginReducer = loginSlice.reducer

export default loginReducer