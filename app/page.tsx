"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowDown,
  faArrowTrendUp,
  faBell,
  faBookmark,
  faCalendarDays,
  faCamera,
  faComment,
  faCommentDots,
  faGear,
  faHeart,
  faHouse,
  faImage,
  faLocationDot,
  faMagnifyingGlass,
  faMusic,
  faPlus,
  faShareNodes,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

type Tile = {
  title: string;
  subtitle?: string;
  icon: IconDefinition;
  color: string;
  size?: "wide" | "large";
  live?: "people" | "weather" | "calendar" | "photos" | "news" | "music";
  badge?: number;
  avatar?: string;
  social?: boolean;
  image?: string;
  href?: string;
};

const tiles: Tile[] = [
  {
    title: "Aarav Mehta",
    subtitle:
      "Our community garden map is finally live—find seed swaps, shared tools, and open plots nearby. · 12m",
    icon: faLocationDot,
    avatar: "AM",
    color: "#d96548",
    size: "wide",
    social: true,
    image:
      "https://images.unsplash.com/photo-1781785273371-a959f34bfab0?auto=format&fit=crop&w=1000&q=82",
  },
  {
    title: "Your circle",
    subtitle: "8 friends are active now",
    icon: faUsers,
    color: "#3476a7",
    live: "people",
    href: "/explore",
  },
  {
    title: "Rhea Kapoor",
    subtitle:
      "Golden hour, quiet streets, and nowhere to rush to. Sharing a few frames from today’s walk. · 28m",
    icon: faCamera,
    avatar: "RK",
    color: "#238b72",
    size: "large",
    live: "photos",
    social: true,
    image:
      "https://images.unsplash.com/photo-1561391690-cd3f9850f0c3?auto=format&fit=crop&w=1100&q=82",
  },
  {
    title: "Messages",
    subtitle: "Sam: The photos look amazing!",
    icon: faCommentDots,
    color: "#6250b7",
    size: "wide",
    badge: 3,
    href: "/messages",
  },
  {
    title: "Design Commons",
    subtitle: "Mina started a conversation · 1h",
    icon: faUsers,
    color: "#9b557e",
    live: "calendar",
    href: "/communities",
  },
  {
    title: "Trending",
    subtitle: "#SlowLiving · 1.8K posts",
    icon: faArrowTrendUp,
    color: "#c58732",
    href: "/explore",
  },
  {
    title: "Kabir & Nia",
    subtitle:
      "Six small moments from Sunday: old streets, good coffee, and the people who made it memorable. · 2h",
    icon: faCamera,
    avatar: "KN",
    color: "#187d80",
    size: "wide",
    live: "news",
    social: true,
    image:
      "https://images.unsplash.com/photo-1752650143267-57c2491f5ba2?auto=format&fit=crop&w=1000&q=82",
  },
  {
    title: "Now playing",
    subtitle: "Afterglow · Luna Park",
    icon: faMusic,
    color: "#c95f42",
    size: "wide",
    live: "music",
  },
  {
    title: "Create",
    subtitle: "Share a new moment",
    icon: faPlus,
    color: "#347f9f",
  },
  {
    title: "Notifications",
    subtitle: "5 new reactions",
    icon: faBell,
    color: "#805482",
    badge: 5,
    href: "/notifications",
  },
  {
    title: "Book club",
    subtitle: "Thursday · 7:00 PM",
    icon: faCalendarDays,
    color: "#95613d",
  },
  {
    title: "Saved",
    subtitle: "12 posts for later",
    icon: faBookmark,
    color: "#46677d",
    href: "/saved",
  },
  {
    title: "People nearby",
    subtitle: "Discover your local circle",
    icon: faLocationDot,
    color: "#47745a",
    size: "wide",
    href: "/explore",
  },
];

const backgrounds = [
  { name: "Midnight", value: "#102a54" },
  { name: "Plum", value: "#3e174f" },
  { name: "Forest", value: "#16473d" },
  { name: "Cobalt", value: "#075e9f" },
  { name: "Charcoal", value: "#20242b" },
];

const photoBackgrounds = [
  {
    name: "Golden city",
    value:
      "https://images.unsplash.com/photo-1561391690-cd3f9850f0c3?auto=format&fit=crop&w=1800&q=80",
  },
  {
    name: "Community",
    value:
      "https://images.unsplash.com/photo-1781785273371-a959f34bfab0?auto=format&fit=crop&w=1800&q=80",
  },
  {
    name: "Together",
    value:
      "https://images.unsplash.com/photo-1752650143267-57c2491f5ba2?auto=format&fit=crop&w=1800&q=80",
  },
];

const liveUpdates: Record<string, string[]> = {
  "Aarav Mehta": [
    "Finally shipped our community garden map · 12m",
    "24 people loved this update",
    "4 new replies in the conversation",
  ],
  "Your circle": [
    "8 friends are active now",
    "Rhea and Sam just came online",
    "3 new people to discover",
  ],
  "Rhea Kapoor": [
    "Golden hour walks are undefeated · 28m",
    "18 reactions and 8 replies",
    "Rhea added this to City Stories",
  ],
  Messages: [
    "Sam: The photos look amazing!",
    "Rhea: Let’s do another walk soon.",
    "Design Commons shared a post",
  ],
  "Design Commons": [
    "Mina started a conversation · 1h",
    "12 members are talking now",
    "New critique session this Friday",
  ],
  Trending: [
    "#SlowLiving · 1.8K posts",
    "#CityGardens · 942 posts",
    "#PhotoWalk · 614 posts",
  ],
  "Kabir & Nia": [
    "Shared 6 photos from Sunday · 2h",
    "18 people loved their album",
    "New photo added moments ago",
  ],
  "Now playing": [
    "Afterglow · Luna Park",
    "Up next: Soft Focus",
    "Playing from Jordan’s Mix",
  ],
  Notifications: [
    "5 new reactions",
    "Rhea mentioned you in a post",
    "Maya started following you",
  ],
};

export default function Home() {
  const [background, setBackground] = useState(() =>
    typeof window === "undefined"
      ? "#102a54"
      : localStorage.getItem("start-background") || "#102a54",
  );
  const [customizing, setCustomizing] = useState(false);
  const [motion, setMotion] = useState(() =>
    typeof window === "undefined"
      ? true
      : localStorage.getItem("start-motion") !== "false",
  );
  const [backgroundImage, setBackgroundImage] = useState(() =>
    typeof window === "undefined"
      ? ""
      : localStorage.getItem("start-background-image") || "",
  );
  const [imageUrl, setImageUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [query, setQuery] = useState("");
  const [liveFrame, setLiveFrame] = useState(0);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!motion) return;
    const timer = window.setInterval(
      () => setLiveFrame((frame) => frame + 1),
      4500,
    );
    return () => window.clearInterval(timer);
  }, [motion]);

  const chooseBackground = (value: string) => {
    setBackground(value);
    localStorage.setItem("start-background", value);
  };

  const toggleMotion = () => {
    const next = !motion;
    setMotion(next);
    if (!next) setLiveFrame(0);
    localStorage.setItem("start-motion", String(next));
  };

  const chooseBackgroundImage = (value: string) => {
    setBackgroundImage(value);
    try {
      localStorage.setItem("start-background-image", value);
    } catch {
      /* Large uploads still work for this session. */
    }
  };

  const uploadBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => chooseBackgroundImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const applyImageUrl = () => {
    try {
      const parsed = new URL(imageUrl.trim());
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
      chooseBackgroundImage(parsed.toString());
      setUrlError("");
      setImageUrl("");
    } catch {
      setUrlError("Enter a valid http or https image URL.");
    }
  };

  const wallpaperStyle = backgroundImage
    ? `linear-gradient(rgba(9,25,49,.38), rgba(9,25,49,.58)), url("${backgroundImage.replaceAll('"', "%22")}")`
    : "none";

  const visibleTiles = useMemo(
    () =>
      tiles.filter((tile) =>
        tile.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <main
      className={`start-screen ${motion ? "motion-on" : ""} ${backgroundImage ? "has-wallpaper" : ""}`}
      style={
        {
          "--wallpaper": background,
          backgroundImage: wallpaperStyle,
        } as React.CSSProperties
      }
    >
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">m</span>
          <div>
            <h1>mosaic</h1>
            <small>people, in the moment</small>
          </div>
        </div>
        <div className="user-area">
          <div className="user-copy">
            <strong>Jordan Lee</strong>
            <span>Online</span>
          </div>
          <button className="avatar" aria-label="Open profile">
            JL
          </button>
          <button className="nav-button active" aria-label="Home">
            <FontAwesomeIcon icon={faHouse} />
          </button>
          <button
            className="settings-button"
            onClick={() => setCustomizing(true)}
            aria-label="Customize background"
          >
            <FontAwesomeIcon icon={faGear} />
          </button>
        </div>
      </header>

      <section className="content" aria-label="Apps">
        <div className="section-heading">
          <div>
            <p className="eyebrow">HOME FEED</p>
            <h2>What’s happening in your world</h2>
          </div>
          <label className="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search people or posts"
              aria-label="Search people or posts"
            />
          </label>
        </div>

        <div className="tile-grid">
          {visibleTiles.map((tile, index) => {
            const updates = liveUpdates[tile.title];
            const updateIndex = updates
              ? (liveFrame + index) % updates.length
              : 0;
            const liveSubtitle = updates ? updates[updateIndex] : tile.subtitle;
            const showLiveFace = Boolean(
              motion && updates && updateIndex !== 0,
            );
            return (
              <Link
                className={`tile ${tile.size ? `tile-${tile.size}` : ""} ${tile.live ? `tile-${tile.live}` : ""} ${tile.social ? "tile-social flip-live" : ""} ${tile.image ? "has-image" : ""} ${updates ? "tile-live" : ""} ${showLiveFace ? "show-live-face" : ""}`}
                style={
                  {
                    "--tile": tile.color,
                    "--delay": `${index * 55}ms`,
                    "--tile-image": tile.image ? `url(${tile.image})` : "none",
                  } as React.CSSProperties
                }
                key={tile.title}
                href={tile.href || "#"}
              >
                <span className="tile-front">
                  <span className="live-layer" aria-hidden="true" />
                  <span
                    className={`tile-icon ${tile.avatar ? "avatar-icon" : ""}`}
                  >
                    {tile.avatar || <FontAwesomeIcon icon={tile.icon} />}
                  </span>
                  {tile.live === "music" && (
                    <span className="equalizer">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                  {tile.badge && <span className="badge">{tile.badge}</span>}
                  <span className="tile-label">
                    <strong>{tile.title}</strong>
                    {tile.subtitle && <small>{tile.subtitle}</small>}
                  </span>
                  {tile.social && (
                    <span className="social-actions" aria-label="Post actions">
                      <span>
                        <FontAwesomeIcon icon={faHeart} /> {tile.badge || 18}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faComment} />{" "}
                        {tile.avatar === "RK" ? 8 : 4}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faShareNodes} />
                      </span>
                    </span>
                  )}
                </span>
                {updates && (
                  <span className="live-face" aria-live="polite">
                    <small>LIVE UPDATE</small>
                    <strong key={liveSubtitle}>{liveSubtitle}</strong>
                    <span>Updated just now</span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        {visibleTiles.length === 0 && (
          <p className="empty">Nothing here matches “{query}”.</p>
        )}
        <p className="scroll-hint">
          <FontAwesomeIcon icon={faArrowDown} /> Scroll for more
        </p>
      </section>

      {customizing && (
        <div className="scrim" onClick={() => setCustomizing(false)} />
      )}
      <aside
        className={`customizer ${customizing ? "open" : ""}`}
        aria-hidden={!customizing}
      >
        <div className="customizer-head">
          <div>
            <p className="eyebrow">PERSONALIZE</p>
            <h2>Make it yours</h2>
          </div>
          <button onClick={() => setCustomizing(false)} aria-label="Close">
            ×
          </button>
        </div>
        <p className="muted">
          Choose a background color. Your choice stays on this device.
        </p>
        <div className="swatches">
          {backgrounds.map((item) => (
            <button
              key={item.name}
              onClick={() => chooseBackground(item.value)}
              className={background === item.value ? "selected" : ""}
              style={{ background: item.value }}
              aria-label={item.name}
            >
              <span>✓</span>
            </button>
          ))}
        </div>
        <label className="color-row">
          <span>Custom color</span>
          <input
            type="color"
            value={background}
            onChange={(event) => chooseBackground(event.target.value)}
          />
        </label>
        <p className="field-label">Background image</p>
        <div className="photo-swatches">
          {photoBackgrounds.map((item) => (
            <button
              key={item.name}
              onClick={() => chooseBackgroundImage(item.value)}
              className={backgroundImage === item.value ? "selected" : ""}
              style={{ backgroundImage: `url(${item.value})` }}
              aria-label={item.name}
            />
          ))}
        </div>
        <div className="image-actions">
          <button onClick={() => fileInput.current?.click()}>
            <FontAwesomeIcon icon={faImage} /> Upload image
          </button>
          {backgroundImage && (
            <button onClick={() => chooseBackgroundImage("")}>
              <FontAwesomeIcon icon={faTrash} /> Remove
            </button>
          )}
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            onChange={uploadBackground}
            hidden
          />
        </div>
        <div className="url-field">
          <label htmlFor="background-url">Or paste an image URL</label>
          <div>
            <input
              id="background-url"
              type="url"
              value={imageUrl}
              onChange={(event) => {
                setImageUrl(event.target.value);
                setUrlError("");
              }}
              onKeyDown={(event) => event.key === "Enter" && applyImageUrl()}
              placeholder="https://example.com/image.jpg"
            />
            <button onClick={applyImageUrl}>Apply</button>
          </div>
          {urlError && <small role="alert">{urlError}</small>}
        </div>
        <label className="toggle-row">
          <span>
            <strong>Live tile motion</strong>
            <small>Gentle movement and updates</small>
          </span>
          <input type="checkbox" checked={motion} onChange={toggleMotion} />
        </label>
        <button className="done-button" onClick={() => setCustomizing(false)}>
          Done
        </button>
      </aside>
    </main>
  );
}
