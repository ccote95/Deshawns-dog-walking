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

export const addDog = async () => {
  const res = await fetch("/api/dog/create");
  return res.json();
}