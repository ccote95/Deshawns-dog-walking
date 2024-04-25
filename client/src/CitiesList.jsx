import { useEffect, useState } from "react"
import { getCities } from "./apiManager.js";

export const CityList = () => {
    const [cities, setCities] = useState([])

    useEffect(() => {
        getCities().then(setCities)
    },[]);

    return(
        <div>
            <div>
                 <div>
                <input type="text" placeholder="Add a City" />
                <button>Submit</button>
                    
                 </div>
                {cities.map(city => {
                  return  <p key={city.id}>{city.name}</p>
                })}
            </div>
        </div>
    )
}