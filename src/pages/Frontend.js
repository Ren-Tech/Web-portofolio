import React from "react";
import SkillSection from "../components/SkillSection";
import { frontendSkills } from "../data/skillsData";

const Frontend = () => {
  return <SkillSection {...frontendSkills} />;
};

export default Frontend;