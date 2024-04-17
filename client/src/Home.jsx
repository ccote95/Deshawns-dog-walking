import { Link } from "react-router-dom";
import { getDog, getGreeting } from "./apiManager";
import { useEffect, useState } from "react";
import"./Home.css";
export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });
  const [dog, setDog] = useState([])
  const [showModal, setShowModal]= useState(false)
  const [newDog, setNewDog]=useState("")

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(() => {
    getDog().then(setDog)
  },[]);

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
        <div>
          <div>
            <span className="close" onClick ={() => setShowModal(false)}>&times;</span>
            <h2>Add a new dog!</h2>
            <input placeholder="Enter the new dogs name." type="text"/>
          </div>
        </div>
        )}
    </>

  );
  
}
