import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { PageShell } from "../components/PageShell";
import { PostCard } from "../components/PostCard";

const people = [
  ["NP", "Nia Patel", "Street photographer"],
  ["AK", "Arjun Khanna", "Product designer"],
  ["MS", "Maya Sen", "Urban gardener"],
];
export default function ExplorePage() {
  return (
    <PageShell
      eyebrow="DISCOVER"
      title="Explore your world"
      description="Find people, ideas, and communities worth following."
    >
      <label className="page-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input placeholder="Search Mosaic" />
      </label>
      <div className="explore-layout">
        <section>
          <h2>Trending today</h2>
          <div className="tag-row">
            <button>#SlowLiving</button>
            <button>#CityGardens</button>
            <button>#MadeInIndia</button>
            <button>#PhotoWalk</button>
          </div>
          <PostCard
            name="Nia Patel"
            initials="NP"
            time="32 minutes ago"
            text="A quiet corner of the city that deserves a little more attention."
            image="https://images.unsplash.com/photo-1561391690-cd3f9850f0c3?auto=format&fit=crop&w=1000&q=82"
            likes={86}
            comments={12}
          />
        </section>
        <aside>
          <h2>People to know</h2>
          {people.map((p) => (
            <div className="person-row" key={p[1]}>
              <span>{p[0]}</span>
              <div>
                <strong>{p[1]}</strong>
                <small>{p[2]}</small>
              </div>
              <button aria-label={`Follow ${p[1]}`}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          ))}
        </aside>
      </div>
    </PageShell>
  );
}
