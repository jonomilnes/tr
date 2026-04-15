import { Project } from "@/types/project";

const PLACEHOLDER_BRIEF =
  "Placeholder brief. This would describe the client challenge, the context, and what we were asked to solve.";
const PLACEHOLDER_THINKING =
  "Placeholder thinking. This would walk through the creative and strategic approach taken to address the brief.";
const PLACEHOLDER_OUTCOME =
  "Placeholder outcome. This would describe the result — what was delivered, how it landed, and what it achieved.";

export const projects: Project[] = [
  {
    id: "AlphaSense",
    title: "AlphaSense",
    year: "2024",
    description: "Visual identity for a fintech startup",
    image: "/images/AlphaSense/Alphasense_1.jpeg",
    galleryImages: [
      "/images/AlphaSense/Alphasense_2.jpeg",
      "/images/AlphaSense/Alphasense_3.jpeg",
      "/images/AlphaSense/Alphasense_4.jpeg",
      "/images/AlphaSense/Alphasense_5.jpeg",
    ],
    brief: PLACEHOLDER_BRIEF,
    thinking: PLACEHOLDER_THINKING,
    outcome: PLACEHOLDER_OUTCOME,
  },
  {
    id: "Too Good To Go",
    title: "Too Good To Go",
    year: "2024",
    description: "Campaign ideation for a global FMCG brand",
    image: "/images/too_good_to_go/too_good_to_go_1.png",
    galleryImages: [
      "/images/too_good_to_go/too_good_to_go_2.jpg",
      "/images/too_good_to_go/too_good_to_go_3.png",
      "/images/too_good_to_go/too_good_to_go_4.jpg",
      "/images/too_good_to_go/too_good_to_go_5.jpg",
    ],
    brief: PLACEHOLDER_BRIEF,
    thinking: PLACEHOLDER_THINKING,
    outcome: PLACEHOLDER_OUTCOME,
  },
  {
    id: "Headspace",
    title: "Headspace",
    year: "2023",
    description: "Tone of voice system for a challenger bank",
    image: "/images/headspace/headspace_1.jpg",
    galleryImages: [
      "/images/headspace/headspace_2.jpg",
      "/images/headspace/headspace_3.jpg",
      "/images/headspace/headspace_4.jpg",
      "/images/headspace/headspace_5.jpg",
    ],
    brief: PLACEHOLDER_BRIEF,
    thinking: PLACEHOLDER_THINKING,
    outcome: PLACEHOLDER_OUTCOME,
  },
  {
    id: "Gigable",
    title: "Gigable",
    year: "2023",
    description: "Positioning story for a luxury hospitality group",
    image: "/images/gigable/gigable_1.png",
    galleryImages: ["/images/gigable/gigable_2.png"],
    brief: PLACEHOLDER_BRIEF,
    thinking: PLACEHOLDER_THINKING,
    outcome: PLACEHOLDER_OUTCOME,
  },
  {
    id: "Ria Money Global",
    title: "Ria Money Global",
    year: "2022",
    description: "Long-form content direction for a digital magazine",
    image: "https://picsum.photos/seed/editorial/800/1200",
    galleryImages: [
      "https://picsum.photos/seed/editorial2/1200/800",
      "https://picsum.photos/seed/editorial3/1200/800",
      "https://picsum.photos/seed/editorial4/1200/800",
    ],
    brief: PLACEHOLDER_BRIEF,
    thinking: PLACEHOLDER_THINKING,
    outcome: PLACEHOLDER_OUTCOME,
  },
  {
    id: "strategy",
    title: "Strategy",
    year: "2022",
    description: "Naming and messaging architecture for a tech IPO",
    image: "https://picsum.photos/seed/strategy/800/1200",
    galleryImages: [
      "https://picsum.photos/seed/strategy2/1200/800",
      "https://picsum.photos/seed/strategy3/1200/800",
      "https://picsum.photos/seed/strategy4/1200/800",
    ],
    brief: PLACEHOLDER_BRIEF,
    thinking: PLACEHOLDER_THINKING,
    outcome: PLACEHOLDER_OUTCOME,
  },
];
