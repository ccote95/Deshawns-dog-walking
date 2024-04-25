import { useEffect, useState } from "react"
import { getCities } from "./apiManager.js";

export const CityList = () => {
    const [cities, setCities] = useState([])
    const [newCity, setNewCity] = useState({})

    useEffect(() => {
        getCities().then(setCities)
    },[]);

    const handleSubmit =() => {

    }

    return(
        <div>
            <div>
                 <div>
                <input type="text" placeholder="Add a City" onChange={(e) => {
                    const userCopy = {...newCity};
                    userCopy.name = e.target.value
                    setNewCity(userCopy);
                }}/>
                <button onClick={handleSubmit}>Submit</button>
                    
                 </div>
                {cities.map(city => {
                  return  <p key={city.id}>{city.name}</p>
                })}
            </div>
        </div>
    )
}