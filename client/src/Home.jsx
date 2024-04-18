import { Link, useNavigate } from "react-router-dom";
import { addDog, getCities, getDog, getGreeting } from "./apiManager";
import { useEffect, useState } from "react";
import"./Home.css";
export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });
  const [dog, setDog] = useState([])
  const [showModal, setShowModal]= useState(false)
  const [newDog, setNewDog]=useState({cityId: null, name:""})
  const [cities, setCities] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(()=> {
    getCities().then(setCities)
  }, [])

  useEffect(() => {
    getDog().then(setDog)
  },[]);

  const handleSubmitClick =(e) => {
    e.preventDefault();
    addDog(newDog).then(dogObj => {
      console.log(dogObj);
      navigate(`/${dogObj.id}`)
    });
  }

  // const handleRadioChange = (e) => {
  //   const cityId = parseInt(e.target.value);
  //   const cityName = chosenCity
  //   setChosenCity({id: cityId, name: cityName})
  // }
  return (
    <>
    <p>{greeting.message}</p>
    <div className="add-dog">
      <button onClick={() => setShowModal(true)}>Add a Dog</button>
    </div>
    <div>
        {dog.map((dog) =>
      <p key = {dog.id}><Link to ={`/${dog.id}`}  style={{ textDecoration: "none", color: "black" }}>{dog.name}</Link></p>
      )}
      </div>
        {showModal && (
            <form onSubmit={handleSubmitClick}>
        <div>
          <div>
            <span className="close" onClick ={() => setShowModal(false)}>&times;</span>
            <h2>Add a new dog!</h2>
            <div>
            <input placeholder="Enter the new dogs name." type="text" onChange={(e) => {
              const dogCopy = {...newDog};
              dogCopy.name = e.target.value;
              setNewDog(dogCopy)
            }}/>
            
            </div>
            <div>
             <label>Where do they live?</label>
              {cities.map((city) => {
                return (
                  <div>
                    <input type="radio" value={city.id} name="city"  onChange={(e) => {
              const dogCopy = {...newDog};
              dogCopy.cityId = e.target.value;
              setNewDog(dogCopy)
            }}/>
                    <label> {city.name}</label>
                  </div>
                )
              })}
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
        </form>
        )}
    </>

  );
  
}
/** need to get all cities going to have to also create an end point to get them.X
 * need to iterate thru them and create either a drop down or checkboxes for them? check with someone on that
 * need to refactor the way im handling input changes. check capstone to remind yourself.
 * when they click submit it should add the dog and navigate them to the dogs details page.
 * 
 */