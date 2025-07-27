import StatusBadge from "./StatusBadge";

function ProjectCard({ name, description, status }) {
  return (
    <div className="p-4 border rounded shadow flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <StatusBadge status={status} />
    </div>
  );
}

export default ProjectCard;
