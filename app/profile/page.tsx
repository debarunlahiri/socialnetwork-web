import { PageShell } from "../components/PageShell";
import { PostCard } from "../components/PostCard";
export default function ProfilePage() {
  return (
    <PageShell eyebrow="PROFILE" title="Jordan Lee">
      <section className="profile-card">
        <div className="profile-avatar">JL</div>
        <div>
          <h2>Jordan Lee</h2>
          <p>
            Designer, weekend photographer, and believer in kinder online
            spaces.
          </p>
          <span>
            <strong>248</strong> posts
          </span>
          <span>
            <strong>1.8K</strong> followers
          </span>
          <span>
            <strong>412</strong> following
          </span>
        </div>
        <button>Edit profile</button>
      </section>
      <div className="profile-feed">
        <h2>Recent posts</h2>
        <PostCard
          name="Jordan Lee"
          initials="JL"
          time="2 days ago"
          text="A slow Sunday with good people and no agenda."
          image="https://images.unsplash.com/photo-1752650143267-57c2491f5ba2?auto=format&fit=crop&w=1000&q=82"
          likes={124}
          comments={19}
        />
      </div>
    </PageShell>
  );
}
