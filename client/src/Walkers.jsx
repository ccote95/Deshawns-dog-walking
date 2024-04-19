import { useEffect, useState } from "react"
import { getCities, getWalkers } from "./apiManager.js"

export const Walkers = () => {
    const [walkers, setWalkers] = useState([])
    const [cities, setCities] = useState([])
    const [chosenCity, setChosenCity] = useState(0)
    const [filteredWalkers, setFilteredWalkers] = useState([])

    useEffect(() => {
        getWalkers().then(setWalkers)
        getCities().then(setCities)
    },[])

 
    const handleChange = (e) => {
        setChosenCity(e)
    };

    useEffect(() =>  {
        if(chosenCity == 0)
        {
            setFilteredWalkers(walkers);
        }
        else{
             const foundWalkers = walkers.filter(w => w.walkerCity.find(wc => wc.cityId == chosenCity))
            setFilteredWalkers(foundWalkers)
        }
    },[chosenCity, walkers, cities])

    return(
        <div>
            <select onChange={(e) => {handleChange(e.target.value)}}>
                <option value={0}>Select a City</option>
                {cities.map((cities) => {
                   return <option value = {cities.id}>{cities.name}</option>
                })}
            </select>
            <div>
                {filteredWalkers.map((walkers) => 
                <div>{walkers.name} <button>Assign a Dog</button></div>

            )}
            </div>
        </div>
    )
}