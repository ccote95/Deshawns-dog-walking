export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDog = async () => {
  const res = await fetch("/api/dog");
  return res.json();
}
