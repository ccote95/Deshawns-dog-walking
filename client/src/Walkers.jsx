import { useEffect, useState } from "react"
import { assignAWalker, getCities, getDog, getWalkers } from "./apiManager.js"
import { Link } from "react-router-dom"

export const Walkers = () => {
    const [walkers, setWalkers] = useState([])
    const [cities, setCities] = useState([])
    const [chosenCity, setChosenCity] = useState(0)
    const [filteredWalkers, setFilteredWalkers] = useState([])
    const [dogs, setDogs] = useState([])
    const [showModal, setShowModal]= useState(false)
    const [filteredDogs, setFilteredDogs] = useState([])
    const [currentWalkerId, setCurrentWalkerId] = useState(0)

    useEffect(() => {
        getWalkers().then(setWalkers)
        getCities().then(setCities)
        getDog().then(setDogs)
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

    useEffect(() => {
       
        console.log(filteredDogs)

    },[filteredDogs])


    const handleAssignDog = (e) => {
       
        setShowModal(true)
        const currentWalker = walkers.filter(w => w.id == parseInt(e));
        setCurrentWalkerId(currentWalker[0].id)
        const dogArr = dogs.filter(d => d.cityId == currentWalker[0].walkerCity[0].cityId).filter(d => d.walkerId != currentWalker[0].id)
        setFilteredDogs(dogArr);

    }

    const handleNameClick = (dog) => {
        assignAWalker(dog, currentWalkerId)

    }

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
                <div>{walkers.name} <button value={walkers.id} onClick={(e) => handleAssignDog(e.target.value)}>Assign a Dog</button></div>

            )}
            </div>
            {showModal && (
                <div>{filteredDogs.map((dog) => {
                    return <p>{<Link onClick={() => {handleNameClick(dog)}} to ={`/${dog.id}`} value ={dog}  style={{ textDecoration: "none", color: "black" }}>{dog.name}</Link>}</p>
                })}</div>
            )}
        </div>
    )
}
// when i click add dog it needs to render a list of the dogs that in that walkers city