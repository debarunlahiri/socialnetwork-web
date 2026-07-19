"use client";

import { useEffect, useMemo, useState } from "react";

type Tile = {
  title: string;
  subtitle?: string;
  icon: string;
  color: string;
  size?: "wide" | "large";
  live?: "people" | "weather" | "calendar" | "photos" | "news" | "music";
  badge?: number;
};

const tiles: Tile[] = [
  { title: "Mail", subtitle: "3 new messages", icon: "✉", color: "#1686d9", size: "wide", badge: 3 },
  { title: "Calendar", subtitle: "Design review · 10:30", icon: "19", color: "#5b2a91", live: "calendar" },
  { title: "People", subtitle: "Rhea, Sam and 8 others", icon: "◎", color: "#d74624", size: "wide", live: "people" },
  { title: "Photos", subtitle: "Sunday in the city", icon: "▧", color: "#168f42", size: "large", live: "photos" },
  { title: "Weather", subtitle: "New Delhi · Clear", icon: "☀", color: "#1597c9", size: "wide", live: "weather" },
  { title: "Messages", subtitle: "Alex: See you there!", icon: "●", color: "#6fa810", badge: 2 },
  { title: "Maps", subtitle: "32 min to Connaught Place", icon: "⌖", color: "#a91d68" },
  { title: "News", subtitle: "The stories people are sharing", icon: "N", color: "#c0362c", size: "wide", live: "news" },
  { title: "Music", subtitle: "Midnight City · M83", icon: "♫", color: "#e65b14", size: "wide", live: "music" },
  { title: "Camera", icon: "◉", color: "#7135a5" },
  { title: "Store", subtitle: "5 app updates", icon: "▱", color: "#168f42", badge: 5 },
  { title: "SkyDrive", subtitle: "Everything is synced", icon: "☁", color: "#087dbd" },
  { title: "Reading list", subtitle: "12 saved stories", icon: "≡", color: "#b24b19" },
  { title: "Travel", subtitle: "Places on your list", icon: "✈", color: "#007f82", size: "wide" },
];

const backgrounds = [
  { name: "Midnight", value: "#102a54" },
  { name: "Plum", value: "#3e174f" },
  { name: "Forest", value: "#16473d" },
  { name: "Cobalt", value: "#075e9f" },
  { name: "Charcoal", value: "#20242b" },
];

export default function Home() {
  const [background, setBackground] = useState("#102a54");
  const [customizing, setCustomizing] = useState(false);
  const [motion, setMotion] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("start-background");
    const savedMotion = localStorage.getItem("start-motion");
    if (saved) setBackground(saved);
    if (savedMotion) setMotion(savedMotion === "true");
  }, []);

  const chooseBackground = (value: string) => {
    setBackground(value);
    localStorage.setItem("start-background", value);
  };

  const toggleMotion = () => {
    const next = !motion;
    setMotion(next);
    localStorage.setItem("start-motion", String(next));
  };

  const visibleTiles = useMemo(
    () => tiles.filter((tile) => tile.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <main className={`start-screen ${motion ? "motion-on" : ""}`} style={{ "--wallpaper": background } as React.CSSProperties}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <h1>Start</h1>
        <div className="user-area">
          <div className="user-copy"><strong>Jordan Lee</strong><span>Online</span></div>
          <button className="avatar" aria-label="Open profile">JL</button>
          <button className="settings-button" onClick={() => setCustomizing(true)} aria-label="Customize background">⚙</button>
        </div>
      </header>

      <section className="content" aria-label="Apps">
        <div className="section-heading">
          <div><p className="eyebrow">YOUR SPACE</p><h2>Good afternoon, Jordan.</h2></div>
          <label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find an app" aria-label="Find an app" /></label>
        </div>

        <div className="tile-grid">
          {visibleTiles.map((tile, index) => (
            <button
              className={`tile ${tile.size ? `tile-${tile.size}` : ""} ${tile.live ? `tile-${tile.live}` : ""}`}
              style={{ "--tile": tile.color, "--delay": `${index * 55}ms` } as React.CSSProperties}
              key={tile.title}
            >
              <div className="live-layer" aria-hidden="true" />
              <span className="tile-icon">{tile.icon}</span>
              {tile.live === "weather" && <span className="weather-temp">31°</span>}
              {tile.live === "music" && <span className="equalizer"><i/><i/><i/><i/></span>}
              {tile.badge && <span className="badge">{tile.badge}</span>}
              <span className="tile-label"><strong>{tile.title}</strong>{tile.subtitle && <small>{tile.subtitle}</small>}</span>
            </button>
          ))}
        </div>
        {visibleTiles.length === 0 && <p className="empty">No apps match “{query}”.</p>}
        <p className="scroll-hint"><span>↓</span> Scroll for more</p>
      </section>

      {customizing && <div className="scrim" onClick={() => setCustomizing(false)} />}
      <aside className={`customizer ${customizing ? "open" : ""}`} aria-hidden={!customizing}>
        <div className="customizer-head"><div><p className="eyebrow">PERSONALIZE</p><h2>Make it yours</h2></div><button onClick={() => setCustomizing(false)} aria-label="Close">×</button></div>
        <p className="muted">Choose a background color. Your choice stays on this device.</p>
        <div className="swatches">
          {backgrounds.map((item) => <button key={item.name} onClick={() => chooseBackground(item.value)} className={background === item.value ? "selected" : ""} style={{ background: item.value }} aria-label={item.name}><span>✓</span></button>)}
        </div>
        <label className="color-row"><span>Custom color</span><input type="color" value={background} onChange={(event) => chooseBackground(event.target.value)} /></label>
        <label className="toggle-row"><span><strong>Live tile motion</strong><small>Gentle movement and updates</small></span><input type="checkbox" checked={motion} onChange={toggleMotion} /></label>
        <button className="done-button" onClick={() => setCustomizing(false)}>Done</button>
      </aside>
    </main>
  );
}
