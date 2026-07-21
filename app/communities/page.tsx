import { PageShell } from "../components/PageShell";
const groups = [
  [
    "DC",
    "Design Commons",
    "12.4K members",
    "A generous place for design critique and conversation.",
  ],
  [
    "BC",
    "Book Club",
    "3.8K members",
    "One thoughtful book and one warm conversation each month.",
  ],
  [
    "CG",
    "City Growers",
    "8.1K members",
    "Small gardens, shared harvests, better neighborhoods.",
  ],
];
export default function CommunitiesPage() {
  return (
    <PageShell
      eyebrow="COMMUNITIES"
      title="Find your people"
      description="Shared spaces built around the things you love."
    >
      <div className="community-grid">
        {groups.map((g, i) => (
          <article key={g[1]} className={`community-${i}`}>
            <span>{g[0]}</span>
            <h2>{g[1]}</h2>
            <small>{g[2]}</small>
            <p>{g[3]}</p>
            <button>{i === 0 ? "Joined" : "Join community"}</button>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
