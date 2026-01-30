import { renderHeader } from "./src/components/Header/header.js";
import { renderJobCards } from "./src/components/JobCard/jobCard.js";
import { renderSkillCards } from "./src/components/SkillCard/skillCard.js";
import { renderDegreeCards } from "./src/components/DegreeCard/degreeCard.js";

renderHeader('.profile-header');
renderJobCards('.work-experience');
renderSkillCards('.skills-list');
renderDegreeCards('.degree-list');