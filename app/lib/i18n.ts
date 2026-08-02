// Lightweight i18n for Kodagu.ai. Locale is stored in a cookie (set by the
// header LangToggle). Server components read it via getLocale() (in
// ./getLocale — server-only, kept out of this file so client components can
// import the dictionary too). Strings live in the S dictionary as { en, kn }
// leaves; access with S.section.key[locale]. Any leaf whose kn is missing
// simply shows en (write kn as you translate — nothing breaks).

export type Locale = "en" | "kn";

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
  join: {
    title: { en: "Get Involved", kn: "ಭಾಗಿಯಾಗಿ" },
    lead: {
      en: "Kodagu.ai is built by the community, for the community. Here is how you can be part of it.",
      kn: "Kodagu.ai ಸಮುದಾಯದಿಂದ, ಸಮುದಾಯಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ. ನೀವು ಇದರ ಭಾಗವಾಗುವುದು ಹೀಗೆ.",
    },
    devT: { en: "Developers", kn: "ಡೆವಲಪರ್‌ಗಳು" },
    devB: {
      en: "Build and improve the projects — frontend, backend, mobile, data, and infrastructure. Every project is open source.",
      kn: "ಯೋಜನೆಗಳನ್ನು ನಿರ್ಮಿಸಿ ಮತ್ತು ಸುಧಾರಿಸಿ — ಫ್ರಂಟೆಂಡ್, ಬ್ಯಾಕೆಂಡ್, ಮೊಬೈಲ್, ಡೇಟಾ ಮತ್ತು ಮೂಲಸೌಕರ್ಯ. ಪ್ರತಿಯೊಂದು ಯೋಜನೆಯೂ ಮುಕ್ತ-ಮೂಲ.",
    },
    coordT: { en: "Community Coordinators", kn: "ಸಮುದಾಯ ಸಂಯೋಜಕರು" },
    coordB: {
      en: "Be the trusted local link — verify information, onboard villages and estates, and keep projects grounded in reality.",
      kn: "ವಿಶ್ವಾಸಾರ್ಹ ಸ್ಥಳೀಯ ಕೊಂಡಿಯಾಗಿರಿ — ಮಾಹಿತಿ ಪರಿಶೀಲಿಸಿ, ಹಳ್ಳಿಗಳು ಮತ್ತು ಎಸ್ಟೇಟ್‌ಗಳನ್ನು ಸೇರಿಸಿ, ಯೋಜನೆಗಳನ್ನು ವಾಸ್ತವದಲ್ಲಿ ನೆಲೆಗೊಳಿಸಿ.",
    },
    designT: { en: "Designers & Translators", kn: "ಡಿಸೈನರ್‌ಗಳು ಮತ್ತು ಅನುವಾದಕರು" },
    designB: {
      en: "Make everything clear and usable in Kodava thakk, Kannada, and English, with a design that respects the brand.",
      kn: "ಕೊಡವ ತಕ್ಕ್, ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಎಲ್ಲವನ್ನೂ ಸ್ಪಷ್ಟ ಹಾಗೂ ಬಳಸಲು ಸುಲಭವಾಗಿಸಿ — ಬ್ರ್ಯಾಂಡ್‌ಗೆ ಗೌರವ ನೀಡುವ ವಿನ್ಯಾಸದೊಂದಿಗೆ.",
    },
    expertT: { en: "Domain Experts", kn: "ಕ್ಷೇತ್ರ ಪರಿಣತರು" },
    expertB: {
      en: "Wildlife biologists, farmers, Forest Department partners, historians — your knowledge shapes what we build.",
      kn: "ವನ್ಯಜೀವಿ ಜೀವಶಾಸ್ತ್ರಜ್ಞರು, ರೈತರು, ಅರಣ್ಯ ಇಲಾಖೆ ಪಾಲುದಾರರು, ಇತಿಹಾಸಕಾರರು — ನಿಮ್ಮ ಜ್ಞಾನವು ನಾವು ನಿರ್ಮಿಸುವುದನ್ನು ರೂಪಿಸುತ್ತದೆ.",
    },
    startHead: { en: "Start here", kn: "ಇಲ್ಲಿಂದ ಆರಂಭಿಸಿ" },
    startBody: {
      en: "All our work lives on GitHub. Browse the projects, open an issue, or say hello — no contribution is too small.",
      kn: "ನಮ್ಮ ಎಲ್ಲಾ ಕೆಲಸ GitHub ನಲ್ಲಿದೆ. ಯೋಜನೆಗಳನ್ನು ನೋಡಿ, ಇಶ್ಯೂ ತೆರೆಯಿರಿ, ಅಥವಾ ಹಲೋ ಹೇಳಿ — ಯಾವ ಕೊಡುಗೆಯೂ ಚಿಕ್ಕದಲ್ಲ.",
    },
    visitGithub: { en: "Visit our GitHub", kn: "ನಮ್ಮ GitHub ಗೆ ಭೇಟಿ ನೀಡಿ" },
    emailTeam: { en: "Email the team", kn: "ತಂಡಕ್ಕೆ ಇಮೇಲ್ ಮಾಡಿ" },
    proposeHead: { en: "Propose a project", kn: "ಯೋಜನೆ ಸೂಚಿಸಿ" },
    proposeBody: {
      en: "Have an idea that serves Kodagu — its people, land, language, or wildlife? This hub is designed to grow. Reach out with your idea and we will help you get it off the ground.",
      kn: "ಕೊಡಗಿಗೆ — ಅದರ ಜನ, ನಾಡು, ಭಾಷೆ ಅಥವಾ ವನ್ಯಜೀವಿಗಳಿಗೆ — ಸೇವೆ ಸಲ್ಲಿಸುವ ಆಲೋಚನೆ ಇದೆಯೆ? ಈ ವೇದಿಕೆ ಬೆಳೆಯಲೆಂದೇ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ನಿಮ್ಮ ಆಲೋಚನೆಯೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ, ಅದನ್ನು ಆರಂಭಿಸಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
    },
  },
  about: {
    title: { en: "About Kodagu.ai", kn: "Kodagu.ai ಬಗ್ಗೆ" },
    p1: {
      en: "Kodagu.ai is the digital identity and initiative hub for the Kodava community. It brings together technology, tradition, and purpose to build solutions that protect our land, empower our people, and preserve our heritage for generations to come.",
      kn: "Kodagu.ai ಕೊಡವ ಸಮುದಾಯದ ಡಿಜಿಟಲ್ ಗುರುತು ಮತ್ತು ಉಪಕ್ರಮಗಳ ಕೇಂದ್ರ. ನಮ್ಮ ನಾಡನ್ನು ರಕ್ಷಿಸುವ, ನಮ್ಮ ಜನರನ್ನು ಸಬಲಗೊಳಿಸುವ ಮತ್ತು ಮುಂದಿನ ತಲೆಮಾರುಗಳಿಗೆ ನಮ್ಮ ಪರಂಪರೆಯನ್ನು ಉಳಿಸುವ ಪರಿಹಾರಗಳನ್ನು ನಿರ್ಮಿಸಲು ಇದು ತಂತ್ರಜ್ಞಾನ, ಸಂಪ್ರದಾಯ ಮತ್ತು ಉದ್ದೇಶವನ್ನು ಒಗ್ಗೂಡಿಸುತ್ತದೆ.",
    },
    p2: {
      en: "Kodagu — nestled in the Western Ghats of Karnataka — is a land of coffee estates, sacred forests, rivers, and a proud, distinct culture. As the world changes, our community faces new challenges: protecting wildlife and people alike, sustaining the land, and carrying our language and traditions forward.",
      kn: "ಕರ್ನಾಟಕದ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಲ್ಲಿ ನೆಲೆಸಿರುವ ಕೊಡಗು — ಕಾಫಿ ಎಸ್ಟೇಟ್‌ಗಳು, ಪವಿತ್ರ ಕಾಡುಗಳು, ನದಿಗಳು ಮತ್ತು ಹೆಮ್ಮೆಯ, ವಿಶಿಷ್ಟ ಸಂಸ್ಕೃತಿಯ ನಾಡು. ಜಗತ್ತು ಬದಲಾಗುತ್ತಿದ್ದಂತೆ, ನಮ್ಮ ಸಮುದಾಯ ಹೊಸ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸುತ್ತಿದೆ: ವನ್ಯಜೀವಿ ಮತ್ತು ಜನರನ್ನು ಸಮಾನವಾಗಿ ರಕ್ಷಿಸುವುದು, ನಾಡನ್ನು ಉಳಿಸುವುದು, ಮತ್ತು ನಮ್ಮ ಭಾಷೆ ಹಾಗೂ ಸಂಪ್ರದಾಯಗಳನ್ನು ಮುಂದಕ್ಕೆ ಕೊಂಡೊಯ್ಯುವುದು.",
    },
    p3: {
      en: "This platform is a home for open-source projects that meet those challenges. Each one is free to use, built in the open, and owned by the community it serves. We start small and grow with purpose — one meaningful project at a time.",
      kn: "ಈ ವೇದಿಕೆ ಆ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸುವ ಮುಕ್ತ-ಮೂಲ ಯೋಜನೆಗಳಿಗೆ ಒಂದು ನೆಲೆ. ಪ್ರತಿಯೊಂದೂ ಉಚಿತವಾಗಿ ಬಳಸಬಹುದಾದದ್ದು, ಮುಕ್ತವಾಗಿ ನಿರ್ಮಿಸಲಾದದ್ದು, ಮತ್ತು ಅದು ಸೇವೆ ಸಲ್ಲಿಸುವ ಸಮುದಾಯದ ಒಡೆತನದ್ದು. ನಾವು ಚಿಕ್ಕದಾಗಿ ಆರಂಭಿಸಿ ಉದ್ದೇಶದಿಂದ ಬೆಳೆಯುತ್ತೇವೆ — ಒಂದು ಬಾರಿಗೆ ಒಂದು ಅರ್ಥಪೂರ್ಣ ಯೋಜನೆ.",
    },
    valuesHead: { en: "Our values", kn: "ನಮ್ಮ ಮೌಲ್ಯಗಳು" },
    vHeritageT: { en: "Heritage", kn: "ಪರಂಪರೆ" },
    vHeritageB: { en: "We honor the history, culture, and land that shape us.", kn: "ನಮ್ಮನ್ನು ರೂಪಿಸುವ ಇತಿಹಾಸ, ಸಂಸ್ಕೃತಿ ಮತ್ತು ನಾಡನ್ನು ನಾವು ಗೌರವಿಸುತ್ತೇವೆ." },
    vCommunityT: { en: "Community", kn: "ಸಮುದಾಯ" },
    vCommunityB: { en: "We believe in the power of unity and collective progress.", kn: "ಒಗ್ಗಟ್ಟು ಮತ್ತು ಸಾಮೂಹಿಕ ಪ್ರಗತಿಯ ಶಕ್ತಿಯಲ್ಲಿ ನಾವು ನಂಬಿಕೆ ಇಡುತ್ತೇವೆ." },
    vInnovationT: { en: "Innovation", kn: "ನಾವೀನ್ಯ" },
    vInnovationB: { en: "We embrace technology to solve real problems.", kn: "ನಿಜವಾದ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ನಾವು ತಂತ್ರಜ್ಞಾನವನ್ನು ಅಪ್ಪಿಕೊಳ್ಳುತ್ತೇವೆ." },
    vSustainabilityT: { en: "Sustainability", kn: "ಸುಸ್ಥಿರತೆ" },
    vSustainabilityB: { en: "We are committed to protecting our environment and resources.", kn: "ನಮ್ಮ ಪರಿಸರ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳನ್ನು ರಕ್ಷಿಸಲು ನಾವು ಬದ್ಧರಾಗಿದ್ದೇವೆ." },
    founderHead: { en: "The Founder", kn: "ಸಂಸ್ಥಾಪಕ" },
    fp1: {
      en: "Poonacha Machaiah (Balyatanda) is the founder of Kodagu.ai, an open-source initiative applying agentic AI to conservation and community challenges in Kodagu.",
      kn: "ಪೂಣಚ್ಚ ಮಾಚಯ್ಯ (ಬಾಳ್ಯತಂಡ) ಅವರು Kodagu.ai ನ ಸಂಸ್ಥಾಪಕರು — ಇದು ಕೊಡಗಿನ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಸಮುದಾಯದ ಸವಾಲುಗಳಿಗೆ ಏಜೆಂಟಿಕ್ AI ಅನ್ನು ಅನ್ವಯಿಸುವ ಮುಕ್ತ-ಮೂಲ ಉಪಕ್ರಮ.",
    },
    fp2: {
      en: "He is also the founder of Cyberhuman.ai, a pioneering agentic-AI strategic consulting firm, and the creator of AiJiv.ai, an agentic knowledge platform. His other ventures include Peak Living, a longevity and vitality services initiative, and Dharma, a media platform he co-founded.",
      kn: "ಅವರು Cyberhuman.ai ನ ಸಂಸ್ಥಾಪಕರೂ ಹೌದು — ಇದು ಪ್ರವರ್ತಕ ಏಜೆಂಟಿಕ್-AI ಕಾರ್ಯತಂತ್ರ ಸಲಹಾ ಸಂಸ್ಥೆ — ಮತ್ತು ಏಜೆಂಟಿಕ್ ಜ್ಞಾನ ವೇದಿಕೆಯಾದ AiJiv.ai ನ ರಚನಕಾರರು. ಅವರ ಇತರ ಉದ್ಯಮಗಳಲ್ಲಿ ದೀರ್ಘಾಯುಷ್ಯ ಮತ್ತು ಚೈತನ್ಯ ಸೇವೆಗಳ ಉಪಕ್ರಮವಾದ Peak Living, ಹಾಗೂ ಅವರು ಸಹ-ಸಂಸ್ಥಾಪಿಸಿದ ಮಾಧ್ಯಮ ವೇದಿಕೆ Dharma ಸೇರಿವೆ.",
    },
    fp3: {
      en: "Previously, Poonacha served as CEO of The Chopra Foundation, where he led global initiatives advancing mental health, societal well-being, and environmental sustainability. A founding member of the Global Mental Health Task Force aligned to the UN Sustainable Development Goals, he spearheaded programs such as NeverAlone, dedicated to mental health and suicide prevention.",
      kn: "ಈ ಹಿಂದೆ, ಪೂಣಚ್ಚ ಅವರು The Chopra Foundation ನ CEO ಆಗಿ ಸೇವೆ ಸಲ್ಲಿಸಿದರು; ಅಲ್ಲಿ ಮಾನಸಿಕ ಆರೋಗ್ಯ, ಸಾಮಾಜಿಕ ಯೋಗಕ್ಷೇಮ ಮತ್ತು ಪರಿಸರ ಸುಸ್ಥಿರತೆಯನ್ನು ಮುನ್ನಡೆಸುವ ಜಾಗತಿಕ ಉಪಕ್ರಮಗಳನ್ನು ಮುನ್ನಡೆಸಿದರು. ವಿಶ್ವಸಂಸ್ಥೆಯ ಸುಸ್ಥಿರ ಅಭಿವೃದ್ಧಿ ಗುರಿಗಳಿಗೆ ಹೊಂದಿಕೊಂಡ Global Mental Health Task Force ನ ಸಂಸ್ಥಾಪಕ ಸದಸ್ಯರಾಗಿ, ಮಾನಸಿಕ ಆರೋಗ್ಯ ಮತ್ತು ಆತ್ಮಹತ್ಯೆ ತಡೆಗೆ ಮೀಸಲಾದ NeverAlone ನಂತಹ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಮುಂದಾಳತ್ವ ವಹಿಸಿದರು.",
    },
    fp4: {
      en: "Earlier in his career, Poonacha held technology leadership roles at Nortel, Iridium, Motorola, and Sasken, driving innovation across global markets. He holds an MBA from the College of William & Mary and a Bachelor of Science in Computer Science and Engineering.",
      kn: "ತಮ್ಮ ವೃತ್ತಿಜೀವನದ ಆರಂಭದಲ್ಲಿ, ಪೂಣಚ್ಚ ಅವರು Nortel, Iridium, Motorola ಮತ್ತು Sasken ನಲ್ಲಿ ತಂತ್ರಜ್ಞಾನ ನಾಯಕತ್ವದ ಹುದ್ದೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ, ಜಾಗತಿಕ ಮಾರುಕಟ್ಟೆಗಳಾದ್ಯಂತ ನಾವೀನ್ಯವನ್ನು ಮುನ್ನಡೆಸಿದರು. ಅವರು College of William & Mary ಇಂದ MBA ಮತ್ತು ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಹಾಗೂ ಎಂಜಿನಿಯರಿಂಗ್‌ನಲ್ಲಿ Bachelor of Science ಪದವಿ ಪಡೆದಿದ್ದಾರೆ.",
    },
    getInvolvedHead: { en: "Get involved", kn: "ಭಾಗಿಯಾಗಿ" },
    getInvolvedBody: {
      en: "Whether you are a developer, a designer, a wildlife expert, a translator, or simply someone who cares about Kodagu, there is a place for you here.",
      kn: "ನೀವು ಡೆವಲಪರ್ ಆಗಿರಲಿ, ಡಿಸೈನರ್ ಆಗಿರಲಿ, ವನ್ಯಜೀವಿ ಪರಿಣತರಾಗಿರಲಿ, ಅನುವಾದಕರಾಗಿರಲಿ, ಅಥವಾ ಕೊಡಗಿನ ಬಗ್ಗೆ ಕಾಳಜಿ ಇರುವವರಾಗಿರಲಿ — ಇಲ್ಲಿ ನಿಮಗೊಂದು ಸ್ಥಾನವಿದೆ.",
    },
    joinCommunity: { en: "Join the community", kn: "ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ" },
  },
  news: {
    eyebrow: { en: "News · updated daily", kn: "ಸುದ್ದಿ · ಪ್ರತಿದಿನ ನವೀಕರಣ" },
    brandTitle: { en: "Kodagu Today", kn: "ಕೊಡಗು ಇಂದು" },
    brandSub: { en: "The verified daily brief", kn: "ಪರಿಶೀಲಿತ ದೈನಂದಿನ ಸಾರಾಂಶ" },
    lead: {
      en: "What’s happening across Kodagu and the Kodava community — gathered from many sources, sorted by topic, and rated for how much you can trust it. The antidote to the WhatsApp rumour mill.",
      kn: "ಕೊಡಗು ಮತ್ತು ಕೊಡವ ಸಮುದಾಯದಾದ್ಯಂತ ಏನಾಗುತ್ತಿದೆ — ಹಲವು ಮೂಲಗಳಿಂದ ಸಂಗ್ರಹಿಸಿ, ವಿಷಯವಾರು ವಿಂಗಡಿಸಿ, ಎಷ್ಟು ನಂಬಬಹುದೆಂದು ರೇಟ್ ಮಾಡಲಾಗಿದೆ. ವಾಟ್ಸಾಪ್ ವದಂತಿಗಳಿಗೆ ಪರಿಹಾರ.",
    },
    howWeRate: { en: "How we rate", kn: "ನಾವು ಹೇಗೆ ರೇಟ್ ಮಾಡುತ್ತೇವೆ" },
    legendTail: {
      en: "Every item links to its sources so you can judge for yourself.",
      kn: "ಪ್ರತಿಯೊಂದು ಸುದ್ದಿಯೂ ತನ್ನ ಮೂಲಗಳಿಗೆ ಲಿಂಕ್ ನೀಡುತ್ತದೆ — ನೀವೇ ನಿರ್ಣಯಿಸಬಹುದು.",
    },
    worksHead: { en: "How this works", kn: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ" },
    worksBody: {
      en: "Kodagu.ai aggregates — it doesn’t report. Each day we gather Kodagu news from established outlets, cluster the same story across sources, summarise it in plain language, and score it on source reliability, corroboration and verifiability. 🟢 Confirmed and 🟡 Reported items publish (each shown with its rating); 🔴 Unverified items are held for human review before they appear.",
      kn: "Kodagu.ai ಸುದ್ದಿಯನ್ನು ಒಗ್ಗೂಡಿಸುತ್ತದೆ — ಸ್ವತಃ ವರದಿ ಮಾಡುವುದಿಲ್ಲ. ಪ್ರತಿದಿನ ನಾವು ಪ್ರತಿಷ್ಠಿತ ಮಾಧ್ಯಮಗಳಿಂದ ಕೊಡಗಿನ ಸುದ್ದಿಯನ್ನು ಸಂಗ್ರಹಿಸಿ, ಒಂದೇ ಸುದ್ದಿಯನ್ನು ಬೇರೆ ಬೇರೆ ಮೂಲಗಳಲ್ಲಿ ಗುಂಪುಗೂಡಿಸಿ, ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಸಾರಾಂಶ ಮಾಡಿ, ಮೂಲದ ವಿಶ್ವಾಸಾರ್ಹತೆ, ಖಚಿತತೆ ಮತ್ತು ಪರಿಶೀಲನೆಯ ಆಧಾರದಲ್ಲಿ ಅಂಕ ನೀಡುತ್ತೇವೆ. 🟢 ದೃಢೀಕೃತ ಮತ್ತು 🟡 ವರದಿ ಸುದ್ದಿಗಳು ಪ್ರಕಟವಾಗುತ್ತವೆ (ಪ್ರತಿಯೊಂದೂ ಅದರ ರೇಟಿಂಗ್‌ನೊಂದಿಗೆ); 🔴 ಪರಿಶೀಲಿಸದ ಸುದ್ದಿಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುವ ಮೊದಲು ಮಾನವ ಪರಿಶೀಲನೆಗೆ ಕಾದಿರಿಸಲಾಗುತ್ತದೆ.",
    },
    disclaimerPre: {
      en: "This is a trust signal, not a guarantee, and not original journalism. We only publish items about individuals when they are corroborated and in the public interest. Spotted an error?",
      kn: "ಇದು ವಿಶ್ವಾಸದ ಸೂಚನೆ, ಖಾತರಿ ಅಲ್ಲ, ಮತ್ತು ಮೂಲ ಪತ್ರಿಕೋದ್ಯಮವಲ್ಲ. ವ್ಯಕ್ತಿಗಳ ಬಗ್ಗೆ ಸುದ್ದಿಗಳನ್ನು ಖಚಿತಪಡಿಸಿ, ಸಾರ್ವಜನಿಕ ಹಿತಾಸಕ್ತಿ ಇದ್ದಾಗ ಮಾತ್ರ ಪ್ರಕಟಿಸುತ್ತೇವೆ. ದೋಷ ಕಂಡಿತೇ?",
    },
    tellUs: { en: "Tell us", kn: "ನಮಗೆ ತಿಳಿಸಿ" },
    disclaimerPost: { en: "and we’ll fix it.", kn: "— ನಾವು ಸರಿಪಡಿಸುತ್ತೇವೆ." },
    // NewsFeed (client) UI
    all: { en: "All", kn: "ಎಲ್ಲಾ" },
    emptyCat: {
      en: "No verified items in today’s brief for this category. We only publish what we can source — nothing fabricated.",
      kn: "ಈ ವಿಭಾಗಕ್ಕೆ ಇಂದಿನ ಸಾರಾಂಶದಲ್ಲಿ ಪರಿಶೀಲಿತ ಸುದ್ದಿಗಳಿಲ್ಲ. ಮೂಲ ಇರುವುದನ್ನು ಮಾತ್ರ ನಾವು ಪ್ರಕಟಿಸುತ್ತೇವೆ — ಸೃಷ್ಟಿಸಿದ್ದೇನೂ ಇಲ್ಲ.",
    },
    source: { en: "source", kn: "ಮೂಲ" },
    sources: { en: "sources", kn: "ಮೂಲಗಳು" },
    today: { en: "Today", kn: "ಇಂದು" },
    yesterday: { en: "Yesterday", kn: "ನಿನ್ನೆ" },
    daysAgo: { en: "days ago", kn: "ದಿನಗಳ ಹಿಂದೆ" },
  },
  community: {
    title: { en: "Community Directory", kn: "ಸಮುದಾಯ ಡೈರೆಕ್ಟರಿ" },
    lead: {
      en: "The people and organizations building Kodagu.ai together. Find collaborators, see who works on what, and add yourself to the map.",
      kn: "Kodagu.ai ಅನ್ನು ಒಟ್ಟಿಗೆ ನಿರ್ಮಿಸುತ್ತಿರುವ ಜನ ಮತ್ತು ಸಂಸ್ಥೆಗಳು. ಸಹಯೋಗಿಗಳನ್ನು ಹುಡುಕಿ, ಯಾರು ಯಾವುದರಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತಾರೆಂದು ನೋಡಿ, ಮತ್ತು ನಿಮ್ಮನ್ನು ಸೇರಿಸಿಕೊಳ್ಳಿ.",
    },
    addYourself: { en: "Add yourself or your organization", kn: "ನಿಮ್ಮನ್ನು ಅಥವಾ ನಿಮ್ಮ ಸಂಸ್ಥೆಯನ್ನು ಸೇರಿಸಿ" },
    note: {
      en: "Listings are opt-in. Everyone here has asked to be included — we never add people from outside sources.",
      kn: "ಪಟ್ಟಿಗಳು ಸ್ವಯಂ-ಆಯ್ಕೆ. ಇಲ್ಲಿರುವ ಪ್ರತಿಯೊಬ್ಬರೂ ಸೇರಿಸಿಕೊಳ್ಳಲು ಕೇಳಿಕೊಂಡಿದ್ದಾರೆ — ಹೊರಗಿನ ಮೂಲಗಳಿಂದ ನಾವು ಎಂದಿಗೂ ಜನರನ್ನು ಸೇರಿಸುವುದಿಲ್ಲ.",
    },
  },
  insights: {
    back: { en: "← Kodagu Almanac", kn: "← ಕೊಡಗು ಪಂಚಾಂಗ" },
    title: { en: "Kodagu Insights", kn: "ಕೊಡಗು ಒಳನೋಟಗಳು" },
    sub: { en: "Intelligence that’s hard to find, made clear", kn: "ಹುಡುಕಲು ಕಷ್ಟವಾದ ಮಾಹಿತಿ, ಸ್ಪಷ್ಟವಾಗಿ" },
    lead: {
      en: "Using AI to pull together scattered market, government and local data into insights Kodagu residents rarely get to see — and can act on.",
      kn: "ಚದುರಿದ ಮಾರುಕಟ್ಟೆ, ಸರ್ಕಾರಿ ಮತ್ತು ಸ್ಥಳೀಯ ಡೇಟಾವನ್ನು AI ಬಳಸಿ ಒಗ್ಗೂಡಿಸಿ, ಕೊಡಗಿನ ನಿವಾಸಿಗಳು ವಿರಳವಾಗಿ ನೋಡುವ — ಮತ್ತು ಕಾರ್ಯರೂಪಕ್ಕೆ ತರಬಹುದಾದ — ಒಳನೋಟಗಳಾಗಿಸಲಾಗಿದೆ.",
    },
    navCoffee: { en: "☕ Coffee Market", kn: "☕ ಕಾಫಿ ಮಾರುಕಟ್ಟೆ" },
    navSchemes: { en: "📜 Schemes & Compensation", kn: "📜 ಯೋಜನೆಗಳು ಮತ್ತು ಪರಿಹಾರ" },
    navRisk: { en: "⛰️ Landslide & Climate Risk", kn: "⛰️ ಭೂಕುಸಿತ ಮತ್ತು ಹವಾಮಾನ ಅಪಾಯ" },
    navHealth: { en: "🩺 Monsoon Health", kn: "🩺 ಮುಂಗಾರು ಆರೋಗ್ಯ" },
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
