import React from "react";
import SkillSection from "../components/SkillSection";
import { hostingSkills } from "../data/skillsData";

const ServersAndHosting = () => {
  return <SkillSection {...hostingSkills} />;
};

export default ServersAndHosting;