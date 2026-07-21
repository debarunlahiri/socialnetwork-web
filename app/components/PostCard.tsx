import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

export function PostCard({
  name,
  initials,
  time,
  text,
  image,
  likes = 18,
  comments = 4,
}: {
  name: string;
  initials: string;
  time: string;
  text: string;
  image?: string;
  likes?: number;
  comments?: number;
}) {
  return (
    <article className="post-card">
      <header>
        <span className="post-avatar">{initials}</span>
        <div>
          <strong>{name}</strong>
          <small>{time}</small>
        </div>
        <button aria-label="Save post">
          <FontAwesomeIcon icon={faBookmark} />
        </button>
      </header>
      <p>{text}</p>
      {image && <img src={image} alt="" />}
      <footer>
        <button>
          <FontAwesomeIcon icon={faHeart} />
          {likes}
        </button>
        <button>
          <FontAwesomeIcon icon={faComment} />
          {comments}
        </button>
        <button>
          <FontAwesomeIcon icon={faShareNodes} />
          Share
        </button>
      </footer>
    </article>
  );
}
