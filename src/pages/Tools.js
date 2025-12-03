import React from "react";
import SkillSection from "../components/SkillSection";
import { toolsSkills } from "../data/skillsData";

const Tools = () => {
  return <SkillSection {...toolsSkills} />;
};

export default Tools;