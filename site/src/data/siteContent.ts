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
    shortAnswer: "Easy to try is the current idea.",
    answer:
      "The current plan is to keep the apps easy to try. Pricing can change later if larger premium features are added, but the site will call that out clearly."
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
    title: "Your note stays your note",
    shortBody: "Feedback only includes what you decide to send.",
    body:
      "If you email Sonnaz Group or send feedback, that message can include your email address and anything you write. The site does not ask you to create an account."
  },
  {
    title: "The server keeps the lights on",
    shortBody: "Basic request logs help the site load and stay safe.",
    body:
      "The server may process ordinary technical information like IP address, browser type, page requests, and timestamps so the site can load safely and reliably."
  },
  {
    title: "No secret vault here",
    shortBody: "Please do not send sensitive personal details.",
    body:
      "The site is not designed to collect sensitive personal information. Please do not send private, financial, medical, or highly sensitive information through feedback messages."
  },
  {
    title: "You can ask for cleanup",
    shortBody: "Questions and deletion requests go to support.",
    body:
      "If you want to ask what information was sent, correct something, or request deletion of a message you sent, email support@sonnazgroup.com."
  }
];

export const termsCards: PolicyCard[] = [
  {
    title: "Browse, download, enjoy",
    shortBody: "Use the site for app info and official links.",
    body:
      "You can browse the site, download apps from official links, and use the content for personal reference."
  },
  {
    title: "No funny business",
    shortBody: "Do not attack, copy, or abuse the site.",
    body:
      "Do not attack, scrape, copy, impersonate, or use the site or apps in a way that breaks laws, harms systems, or infringes someone else's rights."
  },
  {
    title: "The apps keep moving",
    shortBody: "Features and beta links may change over time.",
    body:
      "Features, beta availability, screenshots, sizes, prices, and release details can change as the apps are updated."
  },
  {
    title: "Ideas are welcome",
    shortBody: "Feedback may be used to improve the apps.",
    body:
      "If you send ideas or feedback, Sonnaz Group may use that feedback to improve the apps without owing payment or credit."
  }
];

export const appleDisclaimer =
  "Apple, the Apple logo, App Store, iPhone, iOS, and TestFlight are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store and TestFlight badges are used for informational download links and do not imply endorsement by Apple Inc.";
