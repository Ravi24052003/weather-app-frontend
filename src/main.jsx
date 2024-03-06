import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from "./app/store.js"
import { Provider } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import Login from "./features/login/Login.jsx"
import Signup from "./features/signup/Signup.jsx"
import WeatherApp from './pages/WeatherApp.jsx'
import SearchHistory from "./pages/SearchHistory.jsx"
import ErrorPage from "./ErrorPage.jsx"


const router = createBrowserRouter(
  createRoutesFromChildren(
   <Route path='/' element={<App />} errorElement={<ErrorPage />}>
   <Route path='' element={<Login />}/>
   <Route path='signup' element={<Signup />} />
  <Route path='weather' element={<WeatherApp />}/>
  <Route path='history' element={<SearchHistory />} />
   </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
