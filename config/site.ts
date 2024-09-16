export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "VoiceVibeAI ✨👩‍🦰",
  description:
    "VoiceVibe is an AI audio diary app that uses voice-to-text transcription, keyword tagging, emotion analysis, and secure storage to help users easily record, track, and reflect on their thoughts and experiences.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "About",
      href: "https://github.com/ashutosh7i/VoiceVibeAI",
    },
  ],
  navMenuItems: [
    {
      label: "Diary",
      href: "/diary",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    home: "/",
    diary: "/diary",
    pages: "/diary/pages",
    notes: "/diary/notes",
    reports: "/diary/reports",
    contact: "/contact",
    issues: "https://github.com/ashutosh7i/voiceVibeAI/issues",
    changelog: "https://github.com/ashutosh7i/VoiceVibeAI/commits",
    github: "https://github.com/ashutosh7i/VoiceVibeAI",
    sponsor: "https://github.com/sponsors/ashutosh7i",
  },
};
