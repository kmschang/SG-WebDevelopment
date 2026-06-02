export type FaqItem = {
  question: string;
  shortAnswer: string;
  answer: string;
};

export type PolicyCard = {
  title: string;
  shortBody: string;
  body: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "What is Sonnaz Group?",
    shortAnswer: "A small software studio for useful apps.",
    answer:
      "Sonnaz Group is an independent software studio focused on small, useful apps for everyday tasks. The goal is not to make huge apps; it is to make focused tools that solve one thing well."
  },
  {
    question: "Who are these apps built for?",
    shortAnswer: "They start personal and grow outward.",
    answer:
      "The apps start from real personal needs, then get shared for anyone who wants a simple tool that stays focused. Feedback helps shape what gets polished next."
  },
  {
    question: "Which platforms are supported?",
    shortAnswer: "iOS first, web-friendly over time.",
    answer:
      "The current app focus is iOS. The website is built to make room for future web apps, app-specific pages, and standalone domains or subdomains."
  },
  {
    question: "Are the apps free?",
    shortAnswer: "Yes, the current apps are free.",
    answer:
      "The current apps are free to download or test. If a future version ever adds paid features, the app page and App Store listing will make that clear before anyone pays for anything."
  },
  {
    question: "Can I join a beta?",
    shortAnswer: "Yes, when a public TestFlight is open.",
    answer:
      "Day Tracker has an active TestFlight beta. Other beta links will be added when they are ready for public testers."
  },
  {
    question: "How do I send feedback?",
    shortAnswer: "Use the app page or email directly.",
    answer:
      "Use the feedback links on the app pages or email support@sonnazgroup.com with the app name in the subject. Device details and a screenshot are especially helpful."
  }
];

export const privacyCards: PolicyCard[] = [
  {
    title: "No user tracking",
    shortBody: "The apps do not collect or store personal user data.",
    body:
      "Sonnaz Group apps do not create accounts, build user profiles, or store information about who you are or how you use the app."
  },
  {
    title: "Apple analytics only",
    shortBody: "App analytics come from Apple developer tools.",
    body:
      "Apple may provide aggregate App Store, TestFlight, crash, and usage analytics. Those reports help spot problems, but they are not used to personally track users."
  },
  {
    title: "The website is simple",
    shortBody: "No accounts, newsletter signup, or marketing tracker.",
    body:
      "This website is for app information, downloads, FAQ, and support links. It is not set up to collect user accounts, store visitor profiles, or sell visitor data."
  },
  {
    title: "Feedback is your choice",
    shortBody: "Email only includes what you decide to send.",
    body:
      "If you email support, the message includes your email address and whatever you write. Use support@sonnazgroup.com if you want a sent message corrected or deleted."
  }
];

export const termsCards: PolicyCard[] = [
  {
    title: "Free to use",
    shortBody: "The current apps are free.",
    body:
      "The apps currently shown here are free to download or test. If pricing ever changes, it should be clear in the App Store or TestFlight flow before you install or buy."
  },
  {
    title: "Use official links",
    shortBody: "Download through App Store or TestFlight links.",
    body:
      "Use the official links on the app pages. Do not copy, impersonate, resell, abuse, or attack the website or apps."
  },
  {
    title: "Betas can move around",
    shortBody: "TestFlight builds may change or break.",
    body:
      "Beta apps can change quickly, expire, lose TestFlight availability, or include rough edges. Public releases are the calmer version."
  },
  {
    title: "Helpful, not official advice",
    shortBody: "Double-check important dates, money, and totals.",
    body:
      "The apps are utilities meant to help with dates, discounts, tips, and small calculations. For important decisions, double-check the result before relying on it."
  }
];

export const appleDisclaimer =
  "Apple, the Apple logo, App Store, iPhone, iOS, and TestFlight are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store and TestFlight badges are used for informational download links and do not imply endorsement by Apple Inc.";
