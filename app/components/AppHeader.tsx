"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCommentDots,
  faCompass,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const nav = [
  { href: "/", label: "Home", icon: faHouse },
  { href: "/explore", label: "Explore", icon: faCompass },
  { href: "/messages", label: "Messages", icon: faCommentDots },
  { href: "/notifications", label: "Alerts", icon: faBell },
  { href: "/profile", label: "Profile", icon: faUser },
];

export function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link href="/" className="mini-brand">
          <span>m</span>
          <span className="brand-copy">
            <strong>mosaic</strong>
            <small>your social space</small>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <Link
          href="/profile"
          className="header-profile"
          aria-label="Your profile"
        >
          <span className="profile-copy">
            <strong>Jordan</strong>
            <small>View profile</small>
          </span>
          <span className="header-avatar">JL</span>
        </Link>
      </div>
    </header>
  );
}
