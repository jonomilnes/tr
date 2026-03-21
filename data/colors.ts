export interface ProjectColor {
  bg: string;
  hover: string; // same hue, ~12% darker (base × 0.88)
  text: string;  // same hue, very dark (base × 0.18)
}

export const PROJECT_COLORS: ProjectColor[] = [
  // 1. Lavender  #B698F2
  { bg: "#B698F2", hover: "#A086D5", text: "#211B2C" },
  // 2. Pink      #E6AAC0
  { bg: "#E6AAC0", hover: "#CA96A9", text: "#291F23" },
  // 3. Amber     #EBB958
  { bg: "#EBB958", hover: "#CFA34D", text: "#2A2110" },
  // 4. Yellow    #F2EC7A
  { bg: "#F2EC7A", hover: "#D5D06B", text: "#2C2A16" },
  // 5. Salmon    #E89B8A
  { bg: "#E89B8A", hover: "#CC8879", text: "#2A1C19" },
  // 6. Teal      #70C4B8
  { bg: "#70C4B8", hover: "#63ACA2", text: "#142321" },
];
