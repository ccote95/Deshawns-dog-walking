export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDog = async () => {
  const res = await fetch("/api/dog");
  return res.json();
}

export const getDogById = async (id) => {
  const res = await fetch(`/api/dog/${id}`);
  return res.json();
}

export const addDog = async (newDog) => {
 return await fetch("/api/dog/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog)
  }).then((resp) => resp.json());
  
}

export const getCities = async () => {
  const res = await fetch("/api/city");
  return res.json();
}

export const getWalkers = async () => {
  const res = await fetch("/api/walker");
  return res.json();
}

export const assignAWalker = async (dogWalker, walkerId) => {
   dogWalker.walkerId = walkerId
  return await fetch("/api/dog/assign", {
    method: "PUT",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(dogWalker)
  });

}

export const addNewCity = async (newCity) => {
  return await fetch("/api/city/new", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(newCity)
  });
}

export const getWalkerById = async (id) => {
  const res =  await fetch(`/api/walker/${id}`)
  return res.json()

}

export const assignWalkerToNewCity = async (cityId,currentWalkerId) => {
  const newWalkerCity = {
    cityId : cityId,
    walkerId : currentWalkerId
  }
    return await fetch("/api/walkercity/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWalkerCity)
    })
  
}