import { useEffect, useState } from "react"
import { assignAWalker, getCities, getDog, getWalkers, removeAWalker } from "./apiManager.js"
import { Link } from "react-router-dom"
import"./Home.css";

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
    },[walkers])

 
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
        const dogObj = []
        currentWalker[0]?.walkerCity?.map((cw)=> {
            dogs.map((d) => {
                if(d.cityId == cw.cityId&& d.walkerId != currentWalker[0].id)
                {
                    if(!dogObj.includes(d))
                    {
                        dogObj.push(d)
                    }
                }
            })
        })
        setFilteredDogs(dogObj);

    }

    const handleNameClick = (dog) => {
        assignAWalker(dog, currentWalkerId)

    }

    const handleRemovingAWalker = (id) => {
        removeAWalker(id)
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
                {filteredWalkers.map((walker) => 
                <div><Link to={`/walkers/${walker.id}`} style={{ textDecoration: "none", color: "black" }}>{walker.name}</Link> <button value={walker.id} onClick={(e) => handleAssignDog(e.target.value)}>Assign a Dog</button>
                <button value={walker.id} onClick={(e) => handleRemovingAWalker(e.target.value)}>Remove Walker</button>
                </div>

            )}
            </div>
            {showModal && (
            <div>
                <div>
                    <span className="close" onClick ={() => setShowModal(false)}>&times;</span>
                </div>
                <h3>Select a Dog</h3>
                <div>{filteredDogs.map((dog) => {
                    return <p>{<Link onClick={() => {handleNameClick(dog)}} to ={`/${dog.id}`} value ={dog}  style={{ textDecoration: "none", color: "black" }}>{dog.name}</Link>}</p>
                })}</div>
            </div>
            )}
        </div>
    )
}
// when i click add dog it needs to render a list of the dogs that in that walkers city