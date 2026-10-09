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

