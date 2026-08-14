import type { ImageMetadata } from "astro";
import sonnazLogo from "../../../Assets/SonnazGroup/SonnazGroup_Logo(White)(Red).png";
import { apps } from "./apps";
import type { AppStatus, RoadmapPhase } from "./apps";

// ---------------------------------------------------------------------------
// Home page "Pulse board" data.
//
// Everything here is DERIVED from data/apps.ts. To change an app's status,
// roadmap, releases, or press kit, edit that app in data/apps.ts — not here.
// The only values defined in this file are the two brand-level rows below
// (the website status row and the Sonnaz Group press kit), which are not
// tied to any single app.
// ---------------------------------------------------------------------------

export type PulseState = "online" | "beta" | "planned";

export type StatusItem = {
  name: string;
  label: string;
  state: PulseState;
};

export type RoadmapItem = {
  app: string;
  title: string;
  phase: RoadmapPhase;
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

// Brand-level rows that are not tied to a single app.
const siteStatus: StatusItem = {
  name: "Sonnaz Group Website",
  label: "Online",
  state: "online"
};

const brandPressKit: PressKit = {
  name: "Sonnaz Group",
  icon: sonnazLogo,
  href: "/press-kits/SonnazGroup-PressKit.zip"
};

// How each app's store status maps onto a Pulse status row.
const PULSE_STATUS: Record<AppStatus, { label: string; state: PulseState }> = {
  available: { label: "Online", state: "online" },
  beta: { label: "Online, beta only", state: "beta" },
  planned: { label: "Planned", state: "planned" }
};

// Which phase counts as "most upcoming" when picking an app's single
// roadmap highlight for the home page.
const UPCOMING_PHASES: RoadmapPhase[] = ["In progress", "Considering"];

export const statusItems: StatusItem[] = [
  siteStatus,
  ...apps.map((app) => ({
    name: app.name,
    label: PULSE_STATUS[app.status].label,
    state: PULSE_STATUS[app.status].state
  }))
];

// The home page roadmap panel always shows exactly this many rows, so it never
// grows (and stretches the panels beside it) as roadmaps get longer.
const ROADMAP_PANEL_SIZE = 5;

// One upcoming entry per app — the first "In progress" entry, falling back to
// the first "Considering" — then recently launched work (apps in order, so
// Day Tracker's launches lead) fills the remaining rows up to the panel size.
export const roadmapItems: RoadmapItem[] = (() => {
  const upcoming = apps
    .map((app) => {
      const entry = UPCOMING_PHASES
        .map((phase) => app.roadmap.find((candidate) => candidate.phase === phase))
        .find((candidate) => candidate !== undefined);
      return entry ? { app: app.name, ...entry } : undefined;
    })
    .filter((item): item is RoadmapItem => item !== undefined);

  const launched = apps.flatMap((app) =>
    app.roadmap
      .filter((entry) => entry.phase === "Launched")
      .map((entry) => ({ app: app.name, ...entry }))
  );

  return [...upcoming, ...launched].slice(0, ROADMAP_PANEL_SIZE);
})();

export const latestReleaseItems: ReleaseItem[] = apps
  .flatMap((app) => app.releases.map((release) => ({ app: app.name, ...release })))
  .sort((first, second) => Date.parse(second.date) - Date.parse(first.date));

export const pressKits: PressKit[] = [
  brandPressKit,
  ...apps.map((app) => ({ name: app.name, icon: app.logo, href: app.pressKitHref }))
];
