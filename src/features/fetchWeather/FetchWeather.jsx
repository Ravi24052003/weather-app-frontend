import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsync } from './fetchWeatherSlice'
import { useForm } from 'react-hook-form'

const FetchWeather = () => {
    const dispatch = useDispatch()
    const status = useSelector(state=> state.weather.status);

    const {register, handleSubmit} = useForm({
        defaultValues: {
            cityField: ""
        }
    })

    const onFormSubmit = (formData)=>{
         const {cityField} = formData
         console.log("cityField", cityField)
         dispatch(fetchAsync(cityField))
    }
  return (
    <div>
    <form onSubmit={handleSubmit(onFormSubmit)} className=' flex justify-center mt-4'>
     <input type="text" {...register("cityField")} className=' rounded bg-gray-200 border  border-gray-400 focus:bg-indigo-200 focus-within:border-orange-300 md:w-[320px]'/>

     <button className=' bg-green-500 px-4 py-1 text-white rounded ml-1 '>Search</button>
    </form>

    <h1 className=' text-center font-semibold text-sm text-red-500'>{status?.error}</h1>
    </div>
  )
}

export default FetchWeather
