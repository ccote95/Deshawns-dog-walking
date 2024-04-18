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