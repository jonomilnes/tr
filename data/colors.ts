export interface ProjectColor {
  bg: string;
  text: string;
}

// Ordered to avoid a rainbow progression:
// blue → red → green → yellow → purple → orange
export const PROJECT_COLORS: ProjectColor[] = [
  { bg: "oklch(0.682 0.176 252)", text: "oklch(0.181 0.028 252)" }, // blue
  { bg: "oklch(0.699 0.166 17)",  text: "oklch(0.195 0.03 17)"  }, // red
  { bg: "oklch(0.676 0.167 145)", text: "oklch(0.178 0.029 145)"}, // green
  { bg: "oklch(0.78 0.171 91)",   text: "oklch(0.192 0.026 91)" }, // yellow
  { bg: "oklch(0.69 0.174 295)",  text: "oklch(0.183 0.027 295)"}, // purple
  { bg: "oklch(0.725 0.175 55)",  text: "oklch(0.188 0.028 55)" }, // orange
];
