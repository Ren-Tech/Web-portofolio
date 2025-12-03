import React from "react";
import SkillSection from "../components/SkillSection";
import { backendSkills } from "../data/skillsData";

const Backend = () => {
  return <SkillSection {...backendSkills} />;
};

export default Backend;