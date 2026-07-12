import type { ImageMetadata } from "astro";
import dayTrackerLogo from "../../../Assets/DayTracker/DayTracker_Logo.png";
import dayTrackerPreview from "../../../Assets/DayTracker/DayTracker_AppPreview.png";
import dayTrackerHero from "../../../Assets/DayTracker/DayTracker_Hero.png";
import dayTrackerToday from "../../../Assets/DayTracker/DayTracker_TodayTab.png";
import dayTrackerLookup from "../../../Assets/DayTracker/DayTracker_LookupTab.png";
import dayTrackerBetween from "../../../Assets/DayTracker/DayTracker_BetweenTab.png";
import dayTrackerCountdowns from "../../../Assets/DayTracker/DayTracker_Countdowns.png";
import dayTrackerNotifications from "../../../Assets/DayTracker/DayTracker_Notifications.png";
import dayTrackerWidgets from "../../../Assets/DayTracker/DayTracker_Widgets.png";
import dayTrackerAppIcons from "../../../Assets/DayTracker/DayTracker_AppIcons.png";
import dayTrackerThemes from "../../../Assets/DayTracker/DayTracker_Themes.png";
import dayTrackerBadges from "../../../Assets/DayTracker/DayTracker_Badges.png";
import dayTrackerSettings from "../../../Assets/DayTracker/DayTracker_Settings.png";

import discountLogo from "../../../Assets/DiscountCalculator/DiscountCalculator_Logo.png";
import discountPreview from "../../../Assets/DiscountCalculator/DiscountCalculator_AppPreview.png";
import discountHero from "../../../Assets/DiscountCalculator/DiscountCalculator_Hero1.png";
import discountCalculator from "../../../Assets/DiscountCalculator/DiscountCalculator_Page1.png";
import discountDiscounts from "../../../Assets/DiscountCalculator/DiscountCalculator_Page2.png";
import discountTax from "../../../Assets/DiscountCalculator/DiscountCalculator_Page3.png";
import discountSettings from "../../../Assets/DiscountCalculator/DiscountCalculator_Page4.png";

import quickerTipperLogo from "../../../Assets/QuickerTipper/QuickerTipper_Logo.png";
import quickerTipperPreview from "../../../Assets/QuickerTipper/QuickerTipper_AppPreview.png";
import quickerTipperHero from "../../../Assets/QuickerTipper/QuickerTipper_Hero1.png";
import quickerTipperCalc from "../../../Assets/QuickerTipper/QuickerTipper_Page1.png";
import quickerTipperRounding from "../../../Assets/QuickerTipper/QuickerTipper_Page2.png";
import quickerTipperMinimal from "../../../Assets/QuickerTipper/QuickerTipper_Page3.png";
import quickerTipperSplit from "../../../Assets/QuickerTipper/QuickerTipper_Page4.png";

export type AppStatus = "available" | "beta" | "planned";
export type DownloadKind = "app-store" | "testflight";
export type RoadmapPhase = "In progress" | "Considering" | "Launched";

export type AppFeature = {
  title: string;
  body: string;
  image: ImageMetadata;
};

export type AppLink = {
  label: string;
  href: string;
};

export type AppDownload = {
  kind: DownloadKind;
  label: string;
  href?: string;
  note?: string;
};

// A shipped release. The newest entry (by date) drives the version and release
// date shown on the app page, and feeds the home page "Latest releases" board.
export type ReleaseEntry = {
  version: string;
  date: string;
  bullets: string[];
};

// A roadmap entry for this app. These feed the home page "Roadmap" board,
// grouped by phase (In progress, then Considering, then Launched).
export type RoadmapEntry = {
  title: string;
  phase: RoadmapPhase;
  body: string;
};

// Static store metadata that does not change with each release.
export type AppMetadata = {
  size: string;
  languages: string;
  developer: string;
};

export type AppInfo = {
  name: string;
  slug: string;
  eyebrow: string;
  status: AppStatus;
  statusLabel: string;
  accent: string;
  summary: string;
  description: string;
  logo: ImageMetadata;
  preview: ImageMetadata;
  hero: ImageMetadata;
  availabilityNote: string;
  features: AppFeature[];
  downloads: AppDownload[];
  appInfo: AppMetadata;
  // Order does not matter; getReleasesForApp() sorts these newest-first.
  releases: ReleaseEntry[];
  // Shown in the App Information panel only when releases is empty.
  plannedRelease?: { version: string; date: string };
  roadmap: RoadmapEntry[];
  pressKitHref: string;
  links: AppLink[];
};

export const apps: AppInfo[] = [
  {
    name: "Day Tracker",
    slug: "day-tracker",
    eyebrow: "Date, time, and countdown companion",
    status: "available",
    statusLabel: "Available",
    accent: "#ec2f3b",
    summary:
      "A focused iOS date utility for checking today, looking up any date, measuring date spans, and tracking countdowns.",
    description:
      "Day Tracker turns calendar information into quick, readable answers. It is built for people who want day-of-year values, week numbers, date lookup, date differences, reminders, widgets, and countdowns without digging through a heavy calendar app.",
    logo: dayTrackerLogo,
    preview: dayTrackerPreview,
    hero: dayTrackerHero,
    availabilityNote:
      "Day Tracker is available on the App Store. The TestFlight beta stays open for people who want to try newer features early.",
    features: [
      {
        title: "Today tab",
        body:
          "The Today tab gives you a live snapshot of the current date in useful formats, including day of year, week of year, month, year, weekday, and full date context.",
        image: dayTrackerToday
      },
      {
        title: "Lookup tab",
        body:
          "Select any date in the past, present, or future and instantly view the calendar details for that day.",
        image: dayTrackerLookup
      },
      {
        title: "Between tab",
        body:
          "Measure the distance between two dates across seconds, minutes, hours, days, weeks, months, and years.",
        image: dayTrackerBetween
      },
      {
        title: "Custom countdowns",
        body:
          "Create countdowns for birthdays, holidays, appointments, travel, anniversaries, and repeating events.",
        image: dayTrackerCountdowns
      },
      {
        title: "Notifications and reminders",
        body:
          "Set reminder schedules and customize reminder content so important dates stay visible before they sneak up on you.",
        image: dayTrackerNotifications
      },
      {
        title: "Widgets",
        body:
          "Add date and countdown widgets to your Home Screen or Lock Screen for quick, glanceable time information.",
        image: dayTrackerWidgets
      },
      {
        title: "App icons",
        body:
          "Choose from alternate app icons and color variants to match the look of your Home Screen.",
        image: dayTrackerAppIcons
      },
      {
        title: "Themes and appearance",
        body:
          "Use accent colors and appearance modes to keep the app readable while giving it a personality that fits your setup.",
        image: dayTrackerThemes
      },
      {
        title: "Badge icon metrics",
        body:
          "Show useful date values as app icon badges for a passive, always-visible reference.",
        image: dayTrackerBadges
      },
      {
        title: "Advanced settings",
        body:
          "Adjust startup behavior, tab navigation, date formatting, clock format, decimal precision, and other details for your workflow.",
        image: dayTrackerSettings
      }
    ],
    downloads: [
      {
        kind: "app-store",
        label: "Download Day Tracker",
        href: "https://apps.apple.com/us/app/day-tracker-daymark/id6478195680"
      },
      {
        kind: "testflight",
        label: "Join Day Tracker Beta",
        href: "https://testflight.apple.com/join/39Kk5Fsq",
        note: "Try upcoming features early."
      }
    ],
    appInfo: {
      size: "70 MB",
      languages: "English",
      developer: "Sonnaz Group, LLC"
    },
    releases: [
      {
        version: "2.0.2.88",
        date: "March 31, 2026",
        bullets: [
          "More customizable reminders, clearer countdown widgets, smoother settings navigation",
          "Add Countdown dismissal, reversed widget info, reminder behavior, hidden sections, app icon display",
          "Removed unused files to reduce app size"
        ]
      },
      {
        version: "2.0.1.80",
        date: "March 25, 2026",
        bullets: [
          "Updated custom date experience and settings flow",
          "Improved date formatting consistency",
          "Fixed first-launch navigation and widget launch behavior"
        ]
      },
      {
        version: "2.0.0.235",
        date: "March 21, 2026",
        bullets: [
          "Complete visual refresh",
          "Rebuilt Today, Lookup, and Between experiences",
          "Expanded countdowns, reminders, widgets, themes, and app icons"
        ]
      }
    ],
    roadmap: [
      {
        title: "More widgets",
        phase: "In progress",
        body:
          "Refresh existing widgets and add more options so the most useful date information can live on the Home Screen."
      },
      {
        title: "Photo capability",
        phase: "Considering",
        body:
          "Explore a daily photo layer for tracking memories alongside calendar milestones."
      },
      {
        title: "iOS redesign",
        phase: "Launched",
        body:
          "A glass-inspired redesign, refreshed tabs, expanded countdowns, widgets, themes, and app icons."
      }
    ],
    pressKitHref: "/press-kits/DayTracker-PressKit.zip",
    links: [
      {
        label: "Send feedback",
        href: "mailto:support@sonnazgroup.com?subject=Day%20Tracker%20Feedback"
      }
    ]
  },
  {
    name: "Discount Calculator",
    slug: "discount-calculator",
    eyebrow: "Shopping math without the register guesswork",
    status: "beta",
    statusLabel: "Beta",
    accent: "#1f8a70",
    summary:
      "Calculate final prices with discounts, stacked deals, and sales tax before you get to checkout.",
    description:
      "Discount Calculator helps shoppers understand what they will actually pay. It supports single discounts, multiple stacked discounts, sales tax references, custom tax rates, and theme customization.",
    logo: discountLogo,
    preview: discountPreview,
    hero: discountHero,
    availabilityNote:
      "Discount Calculator is currently in beta. Public App Store links will be added when it is ready.",
    features: [
      {
        title: "Final price calculator",
        body:
          "Enter the original price, choose a discount, include tax, and see the final price update quickly.",
        image: discountCalculator
      },
      {
        title: "Stacked discounts",
        body:
          "Handle multiple discounts without mental math and understand how each offer affects the total.",
        image: discountDiscounts
      },
      {
        title: "Tax references",
        body:
          "Browse state tax references or enter a custom rate when a purchase needs more specific math.",
        image: discountTax
      },
      {
        title: "Customization",
        body:
          "Adjust the app theme and icon so the calculator feels like something you actually want to keep using.",
        image: discountSettings
      }
    ],
    downloads: [
      {
        kind: "testflight",
        label: "TestFlight link coming soon",
        note: "Beta access is not public yet."
      }
    ],
    appInfo: {
      size: "256 MB",
      languages: "English",
      developer: "Sonnaz Group, LLC"
    },
    releases: [
      {
        version: "1.0.4.27",
        date: "January 20, 2025",
        bullets: [
          "Updated icons and logo",
          "Fixed app icon changing",
          "Small formatting and stability fixes"
        ]
      }
    ],
    roadmap: [
      {
        title: "SwiftUI migration",
        phase: "In progress",
        body:
          "Rebuild the app around a cleaner foundation so future design and feature updates are easier."
      },
      {
        title: "Presets",
        phase: "Considering",
        body:
          "Save common discounts, taxes, themes, or shopping setups and reuse them later."
      }
    ],
    pressKitHref: "/press-kits/DiscountCalculator-PressKit.zip",
    links: [
      {
        label: "Send feedback",
        href: "mailto:support@sonnazgroup.com?subject=Discount%20Calculator%20Feedback"
      }
    ]
  },
  {
    name: "Quicker Tipper",
    slug: "quicker-tipper",
    eyebrow: "Fast tip math for real-world checks",
    status: "beta",
    statusLabel: "Beta",
    accent: "#3867d6",
    summary:
      "Calculate tips, adjust rounding, and split a bill quickly when you just need the answer.",
    description:
      "Quicker Tipper keeps tip calculation simple. Choose a tip percentage, adjust rounding, split the bill, and get clear totals without turning dinner into a spreadsheet.",
    logo: quickerTipperLogo,
    preview: quickerTipperPreview,
    hero: quickerTipperHero,
    availabilityNote:
      "Quicker Tipper is currently in beta. Public App Store links will be added when it is ready.",
    features: [
      {
        title: "Quick calculation",
        body:
          "Choose common tip percentages and get the tip, total, and per-person values without extra steps.",
        image: quickerTipperCalc
      },
      {
        title: "Rounding options",
        body:
          "Round the tip, round the total, or leave the exact amount depending on the situation.",
        image: quickerTipperRounding
      },
      {
        title: "Minimal interface",
        body:
          "Use a simple one-page flow that keeps tip calculation fast and easy to read.",
        image: quickerTipperMinimal
      },
      {
        title: "Split the check",
        body:
          "Divide the total across multiple people and keep the per-person amount easy to understand.",
        image: quickerTipperSplit
      }
    ],
    downloads: [
      {
        kind: "testflight",
        label: "TestFlight link coming soon",
        note: "Beta access is not public yet."
      }
    ],
    appInfo: {
      size: "256 MB",
      languages: "English",
      developer: "Sonnaz Group, LLC"
    },
    releases: [],
    plannedRelease: { version: "1.0.0.0", date: "Planned" },
    roadmap: [
      {
        title: "SwiftUI migration",
        phase: "In progress",
        body:
          "Modernize the app structure and interface while keeping the fast one-screen tip workflow."
      }
    ],
    pressKitHref: "/press-kits/QuickerTipper-PressKit.zip",
    links: [
      {
        label: "Send feedback",
        href: "mailto:support@sonnazgroup.com?subject=Quicker%20Tipper%20Feedback"
      }
    ]
  }
];

export function getAppBySlug(slug: string): AppInfo {
  const app = apps.find((candidate) => candidate.slug === slug);

  if (!app) {
    throw new Error(`Unknown app slug: ${slug}`);
  }

  return app;
}

function sortByNewestRelease(first: ReleaseEntry, second: ReleaseEntry): number {
  return Date.parse(second.date) - Date.parse(first.date);
}

// An app's releases, newest first. Source order in the data does not matter.
export function getReleasesForApp(app: AppInfo): ReleaseEntry[] {
  return [...app.releases].sort(sortByNewestRelease);
}

export function getLatestReleaseForApp(app: AppInfo): ReleaseEntry | undefined {
  return getReleasesForApp(app)[0];
}
