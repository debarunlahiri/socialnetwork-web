import { PageShell } from "../components/PageShell";
import { PostCard } from "../components/PostCard";
export default function SavedPage() {
  return (
    <PageShell
      eyebrow="YOUR LIBRARY"
      title="Saved posts"
      description="Ideas and moments you wanted to keep."
    >
      <div className="post-grid">
        <PostCard
          name="Maya Sen"
          initials="MS"
          time="Saved yesterday"
          text="A simple guide to starting herbs on a small balcony."
          image="https://images.unsplash.com/photo-1781785273371-a959f34bfab0?auto=format&fit=crop&w=1000&q=82"
          likes={42}
          comments={6}
        />
        <PostCard
          name="Rhea Kapoor"
          initials="RK"
          time="Saved last week"
          text="The light changed, and the whole street felt new."
          image="https://images.unsplash.com/photo-1561391690-cd3f9850f0c3?auto=format&fit=crop&w=1000&q=82"
          likes={119}
          comments={18}
        />
      </div>
    </PageShell>
  );
}
