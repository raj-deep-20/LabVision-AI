import { Link } from "react-router-dom";

const cards = [
  {
    title: "Patients",
    description: "Manage patient intake, demographics, and care notes.",
    to: "/patients",
  },
  {
    title: "Samples",
    description: "Track specimen status and collection milestones.",
    to: "/samples",
  },
  {
    title: "Upload",
    description: "Send blood smear images for review and analysis.",
    to: "/upload",
  },
  {
    title: "Predictions",
    description: "Review AI-based classification outcomes.",
    to: "/prediction",
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard-grid">
      <div className="hero-card">
        <p className="eyebrow">Operations overview</p>
        <h2>Monitor your microscopy workflow with confidence</h2>
        <p>
          Keep patient records, lab samples, and AI predictions connected in a single, elegant workspace.
        </p>
      </div>

      {cards.map((card) => (
        <Link key={card.title} to={card.to} className="info-card">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </Link>
      ))}
    </div>
  );
}
