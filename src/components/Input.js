import React, { useState } from 'react'
import classes from './Input.module.css'
import { FaMapMarkerAlt, FaSearch} from 'react-icons/fa'

const Input = (props) => {
  const [enteredQuery, setEnteredQuery] = useState('')
  const changeHandler =(event) => {
    setEnteredQuery(event.target.value);
  }

  const searchHandle = () => {
    props.fetchWeather(enteredQuery);
    setEnteredQuery('')
  }

  const celciusHandler = () => {
    props.setCelciusTemp();
  }

  const farenheitHandler = () => {
    props.setFarenheitTemp();
  }

  const getLocation = () => {
    props.getUserLocation();
  }
  return (
    <section className={classes['input-section']}>
        <div className={classes.inputs}>
            <input value={enteredQuery} onChange={changeHandler} type='text' placeholder='Enter city name'/>
            <FaSearch className={classes.icons} onClick={searchHandle}/>
            <FaMapMarkerAlt className={classes.icons} onClick={getLocation}/>
        </div>
        <div className={classes.units}>
            <p onClick={celciusHandler}>C</p>
            <p>|</p>
            <p onClick={farenheitHandler}>F</p>
        </div>
    </section>
  )
}

export default Input