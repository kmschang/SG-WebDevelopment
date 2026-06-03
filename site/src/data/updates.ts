import type { ImageMetadata } from "astro";
import dayTrackerLogo from "../../../Assets/DayTracker/DayTracker_Logo.png";
import discountLogo from "../../../Assets/DiscountCalculator/DiscountCalculator_Logo.png";
import quickerTipperLogo from "../../../Assets/QuickerTipper/QuickerTipper_Logo.png";
import sonnazLogo from "../../../Assets/SonnazGroup/SonnazGroup_Logo(White)(Red).png";

export type StatusItem = {
  name: string;
  label: string;
  state: "online" | "beta" | "planned";
};

export type RoadmapItem = {
  app: string;
  title: string;
  phase: "In progress" | "Considering" | "Launched";
  body: string;
};

export type ReleaseItem = {
  app: string;
  version: string;
  date: string;
  bullets: string[];
};

export type PressKit = {
  name: string;
  icon: ImageMetadata;
  href: string;
};

export const statusItems: StatusItem[] = [
  { name: "Sonnaz Group Website", label: "Online", state: "online" },
  { name: "Day Tracker", label: "Online", state: "online" },
  { name: "Discount Calculator", label: "Online, beta only", state: "beta" },
  { name: "Quicker Tipper", label: "Online, beta only", state: "beta" }
];

export const roadmapItems: RoadmapItem[] = [
  {
    app: "Day Tracker",
    title: "More widgets",
    phase: "In progress",
    body:
      "Refresh existing widgets and add more options so the most useful date information can live on the Home Screen."
  },
  {
    app: "Discount Calculator",
    title: "SwiftUI migration",
    phase: "In progress",
    body:
      "Rebuild the app around a cleaner foundation so future design and feature updates are easier."
  },
  {
    app: "Quicker Tipper",
    title: "SwiftUI migration",
    phase: "In progress",
    body:
      "Modernize the app structure and interface while keeping the fast one-screen tip workflow."
  },
  {
    app: "Day Tracker",
    title: "Photo capability",
    phase: "Considering",
    body:
      "Explore a daily photo layer for tracking memories alongside calendar milestones."
  },
  {
    app: "Discount Calculator",
    title: "Presets",
    phase: "Considering",
    body:
      "Save common discounts, taxes, themes, or shopping setups and reuse them later."
  },
  {
    app: "Day Tracker",
    title: "iOS redesign",
    phase: "Launched",
    body:
      "A glass-inspired redesign, refreshed tabs, expanded countdowns, widgets, themes, and app icons."
  }
];

export const releaseItems: ReleaseItem[] = [
  {
    app: "Day Tracker",
    version: "2.0.1.80",
    date: "March 25, 2026",
    bullets: [
      "Updated custom date experience and settings flow",
      "Improved date formatting consistency",
      "Fixed first-launch navigation and widget launch behavior"
    ]
  },
  {
    app: "Day Tracker",
    version: "2.0.0.235",
    date: "March 21, 2026",
    bullets: [
      "Complete visual refresh",
      "Rebuilt Today, Lookup, and Between experiences",
      "Expanded countdowns, reminders, widgets, themes, and app icons"
    ]
  },
  {
    app: "Discount Calculator",
    version: "1.0.4.27",
    date: "January 20, 2025",
    bullets: ["Updated icons and logo", "Fixed app icon changing", "Small formatting and stability fixes"]
  }
];

export const pressKits: PressKit[] = [
  {
    name: "Sonnaz Group",
    icon: sonnazLogo,
    href: "/press-kits/SonnazGroup-PressKit.zip"
  },
  {
    name: "Day Tracker",
    icon: dayTrackerLogo,
    href: "/press-kits/DayTracker-PressKit.zip"
  },
  {
    name: "Discount Calculator",
    icon: discountLogo,
    href: "/press-kits/DiscountCalculator-PressKit.zip"
  },
  {
    name: "Quicker Tipper",
    icon: quickerTipperLogo,
    href: "/press-kits/QuickerTipper-PressKit.zip"
  }
];

function sortByNewestRelease(first: ReleaseItem, second: ReleaseItem): number {
  return Date.parse(second.date) - Date.parse(first.date);
}

export const latestReleaseItems = [...releaseItems].sort(sortByNewestRelease);

export function getReleasesForApp(appName: string): ReleaseItem[] {
  return latestReleaseItems.filter((release) => release.app === appName);
}

export function getLatestReleaseForApp(appName: string): ReleaseItem | undefined {
  return getReleasesForApp(appName)[0];
}
