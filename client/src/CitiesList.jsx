import { useEffect, useState } from "react"
import { getCities } from "./apiManager.js";

export const cityList = () => {
    const [cities, setCities] = useState([])

    useEffect(() => {
        getCities().then(setCities)
    },[cities]);

    return(
        <div>
            <div>
                {cities.map(city => {
                    <p>{city.Name}</p>
                })}
            </div>
        </div>
    )
}