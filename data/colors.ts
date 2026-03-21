export interface ProjectColor {
  bg: string;
  hover: string; // same hue, ~18% darker
  text: string;  // same hue, very dark (~25% brightness)
}

// Derived from user-provided hex bases:
// hover  = each RGB channel × 0.82
// text   = each RGB channel × 0.25
export const PROJECT_COLORS: ProjectColor[] = [
  // 1. Lavender  #B698F2
  { bg: "#B698F2", hover: "#957DC6", text: "#2E263D" },
  // 2. Pink      #E6AAC0
  { bg: "#E6AAC0", hover: "#BD8B9D", text: "#3A2B30" },
  // 3. Amber     #EBB958
  { bg: "#EBB958", hover: "#C19848", text: "#3B2E16" },
  // 4. Yellow    #F2EC7A
  { bg: "#F2EC7A", hover: "#C6C264", text: "#3D3B1F" },
  // 5. Salmon    #E89B8A
  { bg: "#E89B8A", hover: "#BE7F71", text: "#3A2723" },
  // 6. Teal      #70C4B8
  { bg: "#70C4B8", hover: "#5CA197", text: "#1C312E" },
];
