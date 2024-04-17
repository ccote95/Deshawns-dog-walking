import { getDog, getGreeting } from "./apiManager";
import { useEffect, useState } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });
  const [dog, setDog] = useState([])

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
        {dog.map((dog) =>
      <p key = {dog.id}>{dog.name}</p>
      )}

    </>

  );
  
}
