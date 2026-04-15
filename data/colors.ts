export interface ProjectColor {
  bg: string;
  hover: string;
  text: string;
}

// Strip backgrounds lightest → darkest, all with #202124 text.
// hover = bg darkened slightly (each channel × 0.94).
export const PROJECT_COLORS: ProjectColor[] = [
  { bg: "#FBFBFA", hover: "#ECECE8", text: "#202124" },
  { bg: "#F6F6F4", hover: "#E7E7E3", text: "#202124" },
  { bg: "#F1F0ED", hover: "#E2E1DC", text: "#202124" },
  { bg: "#EBE9E4", hover: "#DCDAD3", text: "#202124" },
  { bg: "#E3DFD8", hover: "#D4D0C8", text: "#202124" },
  { bg: "#DAD4CB", hover: "#CBC5BB", text: "#202124" },
];
