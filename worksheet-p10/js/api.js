const URL = "https://rickandmortyapi.com/api/character";

export async function fetchNews() {
  const response = await fetch(URL);

  console.log("status:", response.status, "ok:", response.ok);

  if (!response.ok) {
    throw new Error("status " + response.status);
  }

  const data = await response.json();
  return data;
}
