import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPen } from "@fortawesome/free-solid-svg-icons";
import { AppHeader } from "../components/AppHeader";

const chats = [
  ["SK", "Sam Kapoor", "The photos look amazing!", "2m"],
  ["RK", "Rhea Kapoor", "Let’s do another walk soon.", "18m"],
  ["DC", "Design Commons", "Mina shared a new post", "1h"],
  ["KN", "Kabir & Nia", "You: See you Sunday!", "3h"],
];

export default function MessagesPage() {
  return (
    <main className="app-page messages-page">
      <AppHeader />
      <div className="messages-panel fullscreen">
        <aside className="chat-list">
          <header className="inbox-head">
            <div>
              <small>INBOX</small>
              <h1>Messages</h1>
            </div>
            <button aria-label="New message">
              <FontAwesomeIcon icon={faPen} />
            </button>
          </header>
          <label className="chat-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input placeholder="Search conversations" />
          </label>
          <div className="chat-scroll">
            {chats.map((c, i) => (
              <button className={i === 0 ? "active" : ""} key={c[1]}>
                <span>{c[0]}</span>
                <div>
                  <strong>{c[1]}</strong>
                  <small>{c[2]}</small>
                </div>
                <time>{c[3]}</time>
              </button>
            ))}
          </div>
        </aside>
        <section className="conversation">
          <header>
            <span>SK</span>
            <div>
              <strong>Sam Kapoor</strong>
              <small>Active now</small>
            </div>
          </header>
          <div className="chat-body">
            <p className="received">
              The photos look amazing! Did you edit them on your phone?
            </p>
            <p className="sent">Thank you! Just a tiny color adjustment.</p>
            <p className="received">You have to show me next time 🙌</p>
          </div>
          <form>
            <input placeholder="Write a message…" />
            <button>Send</button>
          </form>
        </section>
      </div>
    </main>
  );
}
