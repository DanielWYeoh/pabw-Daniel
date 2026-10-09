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
