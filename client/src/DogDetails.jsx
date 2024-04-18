import { useEffect, useState } from "react";
import { getDogById } from "./apiManager.js";
import { useParams } from "react-router-dom";

export const DogDetails = () => {
   const [dog, setDog] = useState([])
   const {dogId} = useParams()

   useEffect(() => {
    getDogById(dogId).then(setDog)
   },[dogId])

   return (
    <>
    <div>
        Dogs Name: {dog.name}
    </div>
    <div>
        Dogs City: {dog.city?.name}
    </div>
    <div>
        Current Walker: {dog.walker?.name}
    </div>
    </>
   )
}