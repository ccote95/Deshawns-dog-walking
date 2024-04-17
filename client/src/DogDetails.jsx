import { useEffect, useState } from "react";
import { getDogById } from "./apiManager.js";
import { useParams } from "react-router-dom";

export const DogDetails = () => {
   const [dog, setDog] = useState([])
   const {dogId} = useParams()

   useEffect(() => {
    getDogById(dogId).then(setDog)
   },[])
}