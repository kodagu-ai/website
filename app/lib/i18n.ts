import { cookies } from "next/headers";

// Lightweight i18n for Kodagu.ai. Locale is stored in a cookie (set by the
// header LangToggle) and read in server components via getLocale(), so pages
// render server-side in the chosen language. Strings live in the S dictionary
// as { en, kn } leaves; access with S.section.key[locale]. Any leaf whose kn is
// missing simply shows en (write kn as you translate — nothing breaks).

export type Locale = "en" | "kn";

export function getLocale(): Locale {
  const v = cookies().get("locale")?.value;
  return v === "kn" ? "kn" : "en";
}

type Leaf = { en: string; kn: string };
export const t = (locale: Locale, leaf: Leaf): string => leaf[locale] || leaf.en;

export const S = {
  nav: {
    projects: { en: "Projects", kn: "ಯೋಜನೆಗಳು" },
    insights: { en: "Insights", kn: "ಒಳನೋಟಗಳು" },
    community: { en: "Community", kn: "ಸಮುದಾಯ" },
    news: { en: "News", kn: "ಸುದ್ದಿ" },
    about: { en: "About", kn: "ನಮ್ಮ ಬಗ್ಗೆ" },
    join: { en: "Get Involved", kn: "ಭಾಗಿಯಾಗಿ" },
    github: { en: "GitHub", kn: "GitHub" },
  },
  tagline: {
    en: "Rooted in Heritage. Driven by Purpose.",
    kn: "ಪರಂಪರೆಯಲ್ಲಿ ಬೇರೂರಿ. ಉದ್ದೇಶದಿಂದ ಮುನ್ನಡೆ.",
  },
  home: {
    eyebrow: { en: "A unified platform for Kodagu", kn: "ಕೊಡಗಿಗಾಗಿ ಒಂದು ಏಕೀಕೃತ ವೇದಿಕೆ" },
    heroLine1: { en: "Rooted in Heritage.", kn: "ಪರಂಪರೆಯಲ್ಲಿ ಬೇರೂರಿ." },
    heroLine2: { en: "Driven by Purpose.", kn: "ಉದ್ದೇಶದಿಂದ ಮುನ್ನಡೆ." },
    lead: {
      en: "Kodagu.ai brings the Kodava community together to build open-source projects that protect our land, empower our people, and preserve our heritage for generations to come.",
      kn: "ನಮ್ಮ ನಾಡನ್ನು ರಕ್ಷಿಸುವ, ನಮ್ಮ ಜನರನ್ನು ಸಬಲಗೊಳಿಸುವ ಮತ್ತು ಮುಂದಿನ ತಲೆಮಾರುಗಳಿಗೆ ನಮ್ಮ ಪರಂಪರೆಯನ್ನು ಉಳಿಸುವ ಮುಕ್ತ-ಮೂಲ ಯೋಜನೆಗಳನ್ನು ನಿರ್ಮಿಸಲು Kodagu.ai ಕೊಡವ ಸಮುದಾಯವನ್ನು ಒಗ್ಗೂಡಿಸುತ್ತದೆ.",
    },
    exploreProjects: { en: "Explore Projects", kn: "ಯೋಜನೆಗಳನ್ನು ನೋಡಿ" },
    contributeGithub: { en: "Contribute on GitHub", kn: "GitHub ನಲ್ಲಿ ಕೊಡುಗೆ ನೀಡಿ" },

    pillarsHead: { en: "What brings us together", kn: "ನಮ್ಮನ್ನು ಒಗ್ಗೂಡಿಸುವುದೇನು" },
    pillarsSub: {
      en: "Every project on Kodagu.ai is guided by four principles drawn from who we are as a community.",
      kn: "Kodagu.ai ನ ಪ್ರತಿಯೊಂದು ಯೋಜನೆಯೂ ನಾವು ಒಂದು ಸಮುದಾಯವಾಗಿ ಯಾರೆಂಬುದರಿಂದ ಮೂಡಿದ ನಾಲ್ಕು ತತ್ವಗಳಿಂದ ಮಾರ್ಗದರ್ಶಿತವಾಗಿದೆ.",
    },
    pRootedT: { en: "Rooted", kn: "ಬೇರೂರಿದ" },
    pRootedB: {
      en: "Proud of our heritage, our land, and the values that shape Kodava life.",
      kn: "ನಮ್ಮ ಪರಂಪರೆ, ನಮ್ಮ ನಾಡು ಮತ್ತು ಕೊಡವ ಜೀವನವನ್ನು ರೂಪಿಸುವ ಮೌಲ್ಯಗಳ ಬಗ್ಗೆ ಹೆಮ್ಮೆ.",
    },
    pUnitedT: { en: "United", kn: "ಒಗ್ಗಟ್ಟು" },
    pUnitedB: {
      en: "Stronger together — a community building shared tools for shared problems.",
      kn: "ಒಟ್ಟಿಗೆ ಬಲಶಾಲಿ — ಸಾಮಾನ್ಯ ಸಮಸ್ಯೆಗಳಿಗೆ ಸಾಮಾನ್ಯ ಸಾಧನಗಳನ್ನು ನಿರ್ಮಿಸುವ ಸಮುದಾಯ.",
    },
    pInnovativeT: { en: "Innovative", kn: "ನಾವೀನ್ಯ" },
    pInnovativeB: {
      en: "Using open technology to make a real, meaningful impact on the ground.",
      kn: "ನೆಲಮಟ್ಟದಲ್ಲಿ ನಿಜವಾದ, ಅರ್ಥಪೂರ್ಣ ಪರಿಣಾಮ ಬೀರಲು ಮುಕ್ತ ತಂತ್ರಜ್ಞಾನದ ಬಳಕೆ.",
    },
    pSustainableT: { en: "Sustainable", kn: "ಸುಸ್ಥಿರ" },
    pSustainableB: {
      en: "Building for a better, balanced future for Kodagu's people and nature.",
      kn: "ಕೊಡಗಿನ ಜನ ಮತ್ತು ಪ್ರಕೃತಿಗೆ ಉತ್ತಮ, ಸಮತೋಲಿತ ಭವಿಷ್ಯಕ್ಕಾಗಿ ನಿರ್ಮಾಣ.",
    },

    projectsHead: { en: "Community Projects", kn: "ಸಮುದಾಯ ಯೋಜನೆಗಳು" },
    projectsSub: {
      en: "Open-source initiatives built by and for Kodagu. We are starting with one and growing from here — new projects join as the community builds them.",
      kn: "ಕೊಡಗಿನಿಂದ, ಕೊಡಗಿಗಾಗಿ ನಿರ್ಮಿಸಿದ ಮುಕ್ತ-ಮೂಲ ಉಪಕ್ರಮಗಳು. ನಾವು ಒಂದರಿಂದ ಆರಂಭಿಸಿ ಇಲ್ಲಿಂದ ಬೆಳೆಯುತ್ತಿದ್ದೇವೆ — ಸಮುದಾಯ ನಿರ್ಮಿಸಿದಂತೆ ಹೊಸ ಯೋಜನೆಗಳು ಸೇರುತ್ತವೆ.",
    },
    yourProjectHere: { en: "Your project here", kn: "ನಿಮ್ಮ ಯೋಜನೆ ಇಲ್ಲಿ" },
    yourProjectBody: {
      en: "Have an idea that serves Kodagu? This hub is built to grow.",
      kn: "ಕೊಡಗಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುವ ಆಲೋಚನೆ ಇದೆಯೆ? ಈ ವೇದಿಕೆ ಬೆಳೆಯಲೆಂದೇ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
    },
    proposeProject: { en: "Propose a project →", kn: "ಯೋಜನೆ ಸೂಚಿಸಿ →" },

    stayHead: { en: "Stay in the loop", kn: "ಮಾಹಿತಿಯಲ್ಲಿರಿ" },
    staySub: {
      en: "Get occasional updates on new projects, milestones, and ways to help — sent only when there’s something worth sharing. No spam.",
      kn: "ಹೊಸ ಯೋಜನೆಗಳು, ಮೈಲಿಗಲ್ಲುಗಳು ಮತ್ತು ಸಹಾಯ ಮಾಡುವ ದಾರಿಗಳ ಬಗ್ಗೆ ಆಗಾಗ ಅಪ್‌ಡೇಟ್‌ಗಳು — ಹಂಚಿಕೊಳ್ಳಲು ಯೋಗ್ಯವಾದದ್ದು ಇದ್ದಾಗ ಮಾತ್ರ. ಸ್ಪ್ಯಾಮ್ ಇಲ್ಲ.",
    },

    ctaHead: { en: "Build with us", kn: "ನಮ್ಮೊಂದಿಗೆ ನಿರ್ಮಿಸಿ" },
    ctaSub: {
      en: "Kodagu.ai is a community effort. Whether you write code, know the land, speak the language, or simply care — there is a place for you here.",
      kn: "Kodagu.ai ಒಂದು ಸಮುದಾಯದ ಪ್ರಯತ್ನ. ನೀವು ಕೋಡ್ ಬರೆಯುವವರಾಗಿರಲಿ, ನಾಡನ್ನು ಬಲ್ಲವರಾಗಿರಲಿ, ಭಾಷೆ ಮಾತನಾಡುವವರಾಗಿರಲಿ, ಅಥವಾ ಕೇವಲ ಕಾಳಜಿ ಇರುವವರಾಗಿರಲಿ — ಇಲ್ಲಿ ನಿಮಗೊಂದು ಸ್ಥಾನವಿದೆ.",
    },
    getInvolved: { en: "Get Involved", kn: "ಭಾಗಿಯಾಗಿ" },
    viewCode: { en: "View the code", kn: "ಕೋಡ್ ನೋಡಿ" },
  },
  footer: {
    tag: {
      en: "A unified, open-source platform for Kodagu. Our people. Our land. Our future.",
      kn: "ಕೊಡಗಿಗಾಗಿ ಒಂದು ಏಕೀಕೃತ, ಮುಕ್ತ-ಮೂಲ ವೇದಿಕೆ. ನಮ್ಮ ಜನ. ನಮ್ಮ ನಾಡು. ನಮ್ಮ ಭವಿಷ್ಯ.",
    },
    getUpdates: { en: "Get updates", kn: "ಅಪ್‌ಡೇಟ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ" },
    explore: { en: "Explore", kn: "ಅನ್ವೇಷಿಸಿ" },
    community: { en: "Community", kn: "ಸಮುದಾಯ" },
    contact: { en: "Contact", kn: "ಸಂಪರ್ಕಿಸಿ" },
    contribute: { en: "Contribute", kn: "ಕೊಡುಗೆ ನೀಡಿ" },
    place: { en: "Kodagu · Karnataka · India", kn: "ಕೊಡಗು · ಕರ್ನಾಟಕ · ಭಾರತ" },
  },
} as const;
