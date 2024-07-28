import React, { Fragment, useState } from "react";
import classes from "./Location.module.css";

const Location = (props) => {

  const temperature = props.isCelcius ? props.weatherData.tempInC : props.weatherData.tempInF;
  return (
    <Fragment>
      <section className={classes["location-section"]}>
        <div>
          <div>
            <h1>{props.weatherData.cityName}<span className={classes.country}>{props.weatherData.countryName}</span></h1>
            <p>{props.weatherData.conditionText}</p>
          </div>
          <h2 className={classes.temp}>{temperature}&deg;</h2>
        </div>
        <div>
          <img src={props.weatherData.conditionIcon} />
        </div>
      </section>
    </Fragment>
  );
};

export default Location;
