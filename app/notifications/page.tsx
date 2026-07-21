import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { PageShell } from "../components/PageShell";
const items = [
  {
    i: faHeart,
    c: "#d65c68",
    t: "Rhea and 23 others liked your post",
    s: "12 minutes ago",
  },
  {
    i: faComment,
    c: "#477fbe",
    t: "Sam commented: “This is wonderful.”",
    s: "35 minutes ago",
  },
  {
    i: faUserPlus,
    c: "#4b9676",
    t: "Maya Sen started following you",
    s: "2 hours ago",
  },
  {
    i: faHeart,
    c: "#d65c68",
    t: "Kabir liked a post you shared",
    s: "Yesterday",
  },
];
export default function NotificationsPage() {
  return (
    <PageShell
      eyebrow="ACTIVITY"
      title="Notifications"
      description="Reactions and updates from your circle."
    >
      <div className="notification-list">
        {items.map((x, i) => (
          <article key={i}>
            <span style={{ background: x.c }}>
              <FontAwesomeIcon icon={x.i} />
            </span>
            <div>
              <strong>{x.t}</strong>
              <small>{x.s}</small>
            </div>
            {i < 2 && <i />}
          </article>
        ))}
      </div>
    </PageShell>
  );
}
