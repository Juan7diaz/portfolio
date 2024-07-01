import cv from '@/data/cv.json';
import BagdeSkill from './BagdeSkill';

function Skill() {
  return (
    <div>
      {cv.skill.map((skill) => (
        <BagdeSkill skill={skill} key={skill.name} />
      ))}
    </div>
  );
}

export default Skill;
