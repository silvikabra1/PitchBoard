import type { Role, Startup, StartupClip } from "./types"

export const mockStartups: Startup[] = [
  {
    id: "1",
    name: "Quantum Labs",
    description: "Building the future of quantum computing for everyday applications.",
    logoUrl: "/placeholder.svg?key=qxh97",
    website: "https://quantumlabs.example",
    roleIds: ["101", "102"],
  },
  {
    id: "2",
    name: "EcoTrack",
    description: "Sustainability platform helping businesses reduce their carbon footprint.",
    logoUrl: "/green-leaf-logo.png",
    website: "https://ecotrack.example",
    roleIds: ["201", "202"],
  },
  {
    id: "3",
    name: "HealthPulse",
    description: "AI-powered health monitoring and predictive analytics platform.",
    logoUrl: "/placeholder.svg?key=ez7ht",
    website: "https://healthpulse.example",
    roleIds: ["301", "302"],
  },
]

export const mockRoles: Role[] = [
  {
    id: "101",
    title: "Senior Frontend Engineer",
    description: "Join our team to build intuitive interfaces for complex quantum computing applications.",
    active: true,
    saved: false,
    location: ["Remote"],
    employmentType: "Full-time",
    tags: ["React", "TypeScript", "Quantum"],
  },
  {
    id: "102",
    title: "Machine Learning Engineer",
    description: "Develop algorithms that bridge quantum computing and machine learning.",
    active: true,
    saved: false,
    location: ["San Francisco, CA"],
    employmentType: "Full-time",
    tags: ["Python", "ML", "Quantum"],
  },
  {
    id: "201",
    title: "Full Stack Developer",
    description: "Build features across our entire stack to help businesses track and reduce emissions.",
    active: true,
    saved: false,
    location: ["New York, NY"],
    employmentType: "Full-time",
    tags: ["JavaScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "202",
    title: "Product Designer",
    description: "Design intuitive interfaces for complex sustainability data.",
    active: true,
    saved: false,
    location: ["Remote"],
    employmentType: "Full-time",
    tags: ["UI/UX", "Figma", "Design Systems"],
  },
  {
    id: "301",
    title: "AI Research Scientist",
    description: "Develop novel machine learning models for health prediction.",
    active: true,
    saved: false,
    location: ["Boston, MA"],
    employmentType: "Full-time",
    tags: ["Python", "TensorFlow", "Healthcare"],
  },
  {
    id: "302",
    title: "Mobile Developer",
    description: "Build our mobile app experience for patients and healthcare providers.",
    active: true,
    saved: false,
    location: ["Remote"],
    employmentType: "Full-time",
    tags: ["React Native", "iOS", "Android"],
  },
]

export const mockStartupClips: StartupClip[] = [
  {
    id: "clip1",
    startupId: mockStartups[0].id,
    roleId: mockRoles[0].id,
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", // Placeholder
    duration: 45,
  },
  {
    id: "clip2",
    startupId: mockStartups[0].id,
    roleId: mockRoles[1].id,
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", // Placeholder
    duration: 62, 
  },
  {
    id: "clip3",
    startupId: mockStartups[1].id,
    roleId: mockRoles[2].id,
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Placeholder
    duration: 53,
  },
  {
    id: "clip4",
    startupId: mockStartups[1].id,
    roleId: mockRoles[3].id,
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", // Placeholder
    duration: 48,
  },
  {
    id: "clip5",
    startupId: mockStartups[2].id,
    roleId: mockRoles[4].id,
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", // Placeholder
    duration: 57,
  },
]
