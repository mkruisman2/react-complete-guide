import React, { useState, useEffect, useCallback, Fragment } from "react";

import classes from "./AvailableMeals.module.css";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-b3cc5-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  let content = <section className={classes.MealsError}><p>Found no meals.</p></section>;

  if (meals.length > 0) {
    content = 
    
    <section className={classes.meals}>
      <Card>
        <ul>{meals.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ))}</ul>
      </Card>
    </section>
  }

  if (error) {
    content = <section className={classes.MealsError}><p>{error}</p></section>;
  }

  if (isLoading) {
    content = <section className={classes.MealsLoading}><p>Loading...</p></section>;
  }

  return (
    <Fragment>
      {content}
    </Fragment>
  );
};

export default AvailableMeals;
