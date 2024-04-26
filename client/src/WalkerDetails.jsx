import { useEffect, useState } from "react"
import {assignWalkerToNewCity, getCities, getWalkerById, unAssignWalkerFromCity } from "./apiManager.js"
import { useParams } from "react-router-dom"

export const WalkerDetails =() => {
  const [walker, setWalker] = useState({})
  const [cities, setCities] = useState([])
  const {walkerId} = useParams()

  useEffect(() => {
    getWalkerById(walkerId).then(setWalker)
    getCities().then(setCities)
  },[])


  const handleCheckingANewBox = (cityId) => {
    assignWalkerToNewCity(cityId, walkerId)
  }

  const handleUncheckingABox = (cityId) => {
    unAssignWalkerFromCity(cityId, walkerId)
  }

  const displayCheckBoxes = () => {
    const CitiesTheWalkerLivesIn = []
    const CitiesTheWalkerDoesNotLiveIn = []
    for (const city of cities) {
        let isCityInWalkerCities = false;
        
        for (const wc of walker.walkerCity) {
            if (city.id === wc.cityId) {
                isCityInWalkerCities = true;
                break;
            }
        }

        if (isCityInWalkerCities) {
            CitiesTheWalkerLivesIn.push(city);
        } else {
            CitiesTheWalkerDoesNotLiveIn.push(city);
        }
    }
    return (
        <div>
            {/* Checkboxes for cities the walker lives in */}
            {CitiesTheWalkerLivesIn.map((city) => (
                <label key={city.id}>
                    <input type="checkbox" onChange={() => {handleUncheckingABox(city.id)}} value={city.id} defaultChecked />
                    {city.name}
                </label>
            ))}
            
            {/* Checkboxes for cities the walker does not live in */}
            {CitiesTheWalkerDoesNotLiveIn.map((city) => (
                <label key={city.id}>
                    <input type="checkbox"onChange={() => {handleCheckingANewBox(city.id)}} value={city.id} />
                    {city.name}
                </label>
            ))}
        </div>
    );
};
    

    
  
return(
    <div>
        <div>
            <h4>{walker.name}</h4>
            {displayCheckBoxes()}
        </div>
    </div>
)
}