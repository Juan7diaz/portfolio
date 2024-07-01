import MatchIcon, { MatcherKey } from "../common/MatchIcon";

function BagdeSkill({ skill }: { skill: { name: string; label: string } }) {
  return (
    <div
      key={skill.name}
      className="my-2 mr-2 inline-flex items-center space-x-2 rounded-md bg-[#d9d9d9] px-3 py-1 hover:bg-[#f9f9f9]"
    >
      <MatchIcon name={skill.name as MatcherKey} className="text-te" />
      <p className="text-background">{skill.label}</p>
    </div>
  );
}

export default BagdeSkill;