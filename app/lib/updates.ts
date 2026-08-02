// Kodagu.ai updates / announcements feed.
// Newest first. Add an item at the top when there's news worth sharing.

export type Update = {
  date: string; // ISO date, e.g. "2026-08-01"
  tag: "Launch" | "Project" | "Community" | "Update" | "Event";
  title: string;
  titleKn: string;
  body: string;
  bodyKn: string;
  href?: string; // optional internal or external link
};

export const UPDATES: Update[] = [
  {
    date: "2026-08-01",
    tag: "Community",
    title: "Community directory is open",
    titleKn: "ಸಮುದಾಯ ಡೈರೆಕ್ಟರಿ ತೆರೆದಿದೆ",
    body: "People and organizations can now list themselves and find collaborators across Kodagu.",
    bodyKn: "ಜನ ಮತ್ತು ಸಂಸ್ಥೆಗಳು ಈಗ ತಮ್ಮನ್ನು ಪಟ್ಟಿ ಮಾಡಿಕೊಂಡು ಕೊಡಗಿನಾದ್ಯಂತ ಸಹಯೋಗಿಗಳನ್ನು ಹುಡುಕಬಹುದು.",
    href: "/community",
  },
  {
    date: "2026-08-01",
    tag: "Launch",
    title: "Kodagu.ai is live",
    titleKn: "Kodagu.ai ಲೈವ್ ಆಗಿದೆ",
    body: "The community open-source hub is online — our people, our land, our future.",
    bodyKn: "ಸಮುದಾಯ ಮುಕ್ತ-ಮೂಲ ಕೇಂದ್ರ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿದೆ — ನಮ್ಮ ಜನ, ನಮ್ಮ ನಾಡು, ನಮ್ಮ ಭವಿಷ್ಯ.",
  },
  {
    date: "2026-07-31",
    tag: "Project",
    title: "Aane Alert enters development",
    titleKn: "ಆನೆ ಅಲರ್ಟ್ ಅಭಿವೃದ್ಧಿಗೆ ಪ್ರವೇಶಿಸಿದೆ",
    body: "An open elephant early-warning network for human–elephant safety across Kodagu.",
    bodyKn: "ಕೊಡಗಿನಾದ್ಯಂತ ಮಾನವ–ಆನೆ ಸುರಕ್ಷತೆಗಾಗಿ ಒಂದು ಮುಕ್ತ ಆನೆ ಮುನ್ನೆಚ್ಚರಿಕೆ ಜಾಲ.",
    href: "/projects/aane-alert",
  },
];
