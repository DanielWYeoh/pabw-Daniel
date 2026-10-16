import { initDom } from "./dom.js";
const libraryName = "Library of Ruina";
const characterCount = 3;
let activeSelection = "all";

console.log(typeof libraryName);
console.log(typeof characterCount);
console.log(typeof activeSelection);

const profile = {
  name: "Library of Ruina",
  role: "Library Archive",
  skills: ["HTML", "CSS", "JavaScript"],
};

const introduction = `Welcome to ${profile.name}, a ${profile.role}. I am learning ${profile.skills.length} skills.`;

console.log(introduction);


function createIntroduction({ name, role }) {
  return `${name} — ${role}`;
}

const formatSkills = (skills) => skills.join(" · ");

console.log(createIntroduction(profile));
console.log(formatSkills(profile.skills));  

const projectList = [
  { title: "Library Archive", year: 2026, completed: true },
  { title: "Book of the City", year: 2026, completed: false },
];

console.table(profile.skills);
console.table(projectList);

const completedProjects = projectList.filter(
  (project) => project.completed
);
console.table(completedProjects);

const catalog = projectList.find(
  (project) => project.title === "Book of the City"
);
console.log(catalog);

const projectTitles = projectList.map((project) => project.title);
console.table(projectTitles);

const sortedProjects = [...projectList].sort(
  (a, b) => a.title.localeCompare(b.title)
);

console.table(sortedProjects);
console.table(projectList);

initDom(projectList);

import { fetchNews } from "./api.js";

const characterContainer = document.createElement("section");
characterContainer.id = "list";
characterContainer.innerHTML = "<h2>Rick and Morty Characters</h2>";
document.body.appendChild(characterContainer);

async function loadCharacters() {
  const list = document.createElement("div");
  characterContainer.appendChild(list);

  list.textContent = "Loading characters...";

  try {
    const data = await fetchNews();
    const characters = data.results;

    if (characters.length === 0) {
      list.textContent = "No characters found.";
      return;
    }

    list.textContent = "";

    characters.forEach(function (character) {
      const card = document.createElement("article");

      const heading = document.createElement("h3");
      heading.textContent = character.name;

      const status = document.createElement("p");
      status.textContent = "Status: " + character.status;

      const species = document.createElement("p");
      species.textContent = "Species: " + character.species;

      card.appendChild(heading);
      card.appendChild(status);
      card.appendChild(species);

      list.appendChild(card);
    });
  } catch (error) {
    list.textContent = "Failed to load characters: " + error.message;
  }
}

loadCharacters();