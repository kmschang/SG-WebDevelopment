export type FaqItem = {
  question: string;
  answer: string;
};

export type PolicyCard = {
  title: string;
  body: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "What is Sonnaz Group?",
    answer:
      "Sonnaz Group is an independent software studio focused on small, useful apps for everyday tasks."
  },
  {
    question: "Who are these apps built for?",
    answer:
      "The apps start from real personal needs, then get shared for anyone who wants a simple tool that stays focused."
  },
  {
    question: "Which platforms are supported?",
    answer:
      "The current app focus is iOS. The website is built to make room for future web apps and app-specific domains or subdomains."
  },
  {
    question: "Are the apps free?",
    answer:
      "The current plan is to keep the apps easy to try. Pricing can change later if larger premium features are added."
  },
  {
    question: "Can I join a beta?",
    answer:
      "Day Tracker has an active TestFlight beta. Other beta links will be added when they are ready for public testers."
  },
  {
    question: "How do I send feedback?",
    answer:
      "Use the feedback links on the app pages or email support@sonnazgroup.com with the app name in the subject."
  }
];

export const privacyCards: PolicyCard[] = [
  {
    title: "What you choose to send",
    body:
      "If you email Sonnaz Group or send feedback, that message can include your email address and anything you write."
  },
  {
    title: "Basic website operations",
    body:
      "The server may process ordinary technical information like IP address, browser type, page requests, and timestamps so the site can load safely and reliably."
  },
  {
    title: "No sensitive data plan",
    body:
      "The site is not designed to collect sensitive personal information. Please do not send private, financial, medical, or highly sensitive information through feedback messages."
  },
  {
    title: "Questions or removal requests",
    body:
      "If you want to ask what information was sent, correct something, or request deletion of a message you sent, email support@sonnazgroup.com."
  }
];

export const termsCards: PolicyCard[] = [
  {
    title: "Use the site normally",
    body:
      "You can browse the site, download apps from official links, and use the content for personal reference."
  },
  {
    title: "Do not misuse it",
    body:
      "Do not attack, scrape, copy, impersonate, or use the site or apps in a way that breaks laws, harms systems, or infringes someone else's rights."
  },
  {
    title: "Apps can change",
    body:
      "Features, beta availability, screenshots, sizes, prices, and release details can change as the apps are updated."
  },
  {
    title: "Feedback is welcome",
    body:
      "If you send ideas or feedback, Sonnaz Group may use that feedback to improve the apps without owing payment or credit."
  }
];

export const appleDisclaimer =
  "Apple, the Apple logo, App Store, iPhone, iOS, and TestFlight are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store and TestFlight badges are used for informational download links and do not imply endorsement by Apple Inc.";
