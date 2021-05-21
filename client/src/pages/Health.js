import React,{useState} from 'react'
import MealList from "../component/Meals/MealList"
import "./Health.css"
import HeaderFood from "../component/Meals/HeaderFood"


export default function Health() {

  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=501cdfea26324cd8b3410456a219072c&timeFrame=day&targetCalories=${calories}`
    )
    .then((response) =>response.json()).then((data) => {setMealData(data) ; console.log(data);}) .catch(() => {console.log("error"); });//format json
   //take the data and pass it
    // in case there is an error
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }

  return (
    <>
   <HeaderFood/>
    <div className="health">
       <div className="controls">
        <input
          className="input"
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />
        <button className="btn" onClick={getMealData}>Get Daily Meal Plan</button>
      </div>
      
      {mealData && <MealList mealData={mealData} />}
    </div>
    </>
  )
}
