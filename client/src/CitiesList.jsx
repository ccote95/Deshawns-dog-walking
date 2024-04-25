import { useEffect, useState } from "react"
import { addNewCity, getCities } from "./apiManager.js";

export const CityList = () => {
    const [cities, setCities] = useState([])
    const [newCity, setNewCity] = useState({})

    useEffect(() => {
        getCities().then(setCities)
    },[cities]);

    const handleSubmit =(e) => {
        e.preventDefault()
        //when the submit button is click i need to send the api the newCity
        addNewCity(newCity)
        setNewCity({name: ""})

    }

    return(
        <div>
            <div>
                 <div>
                <input type="text" placeholder="Add a City" value={newCity.name} onChange={(e) => {
                    const userCopy = {...newCity};
                    userCopy.name = e.target.value
                    setNewCity(userCopy);
                }}/>
                <button onClick={(e) => {handleSubmit(e)}}>Submit</button>
                    
                 </div>
                {cities.map(city => {
                  return  <p key={city.id}>{city.name}</p>
                })}
            </div>
        </div>
    )
}