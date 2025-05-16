import type { Startup, StartupClip } from "./types"

export const mockStartups: Startup[] = [
  {
    id: "1",
    name: "Quantum Labs",
    description: "Building the future of quantum computing for everyday applications.",
    logoUrl: "/placeholder.svg?key=qxh97",
    website: "https://quantumlabs.example",
    founderClipUrl: "/audio/founder1.mp3",
    roles: [
      {
        id: "101",
        title: "Senior Frontend Engineer",
        description: "Join our team to build intuitive interfaces for complex quantum computing applications.",
        location: "Remote",
        type: "Full-time",
        tags: ["React", "TypeScript", "Quantum"],
      },
      {
        id: "102",
        title: "Machine Learning Engineer",
        description: "Develop algorithms that bridge quantum computing and machine learning.",
        location: "San Francisco, CA",
        type: "Full-time",
        tags: ["Python", "ML", "Quantum"],
      },
    ],
  },
  {
    id: "2",
    name: "EcoTrack",
    description: "Sustainability platform helping businesses reduce their carbon footprint.",
    logoUrl: "/green-leaf-logo.png",
    website: "https://ecotrack.example",
    roles: [
      {
        id: "201",
        title: "Full Stack Developer",
        description: "Build features across our entire stack to help businesses track and reduce emissions.",
        location: "New York, NY",
        type: "Full-time",
        tags: ["JavaScript", "Node.js", "PostgreSQL"],
      },
      {
        id: "202",
        title: "Product Designer",
        description: "Design intuitive interfaces for complex sustainability data.",
        location: "Remote",
        type: "Full-time",
        tags: ["UI/UX", "Figma", "Design Systems"],
      },
    ],
  },
  {
    id: "3",
    name: "HealthPulse",
    description: "AI-powered health monitoring and predictive analytics platform.",
    logoUrl: "/placeholder.svg?key=ez7ht",
    website: "https://healthpulse.example",
    founderClipUrl: "/audio/founder3.mp3",
    roles: [
      {
        id: "301",
        title: "AI Research Scientist",
        description: "Develop novel machine learning models for health prediction.",
        location: "Boston, MA",
        type: "Full-time",
        tags: ["Python", "TensorFlow", "Healthcare"],
      },
      {
        id: "302",
        title: "Mobile Developer",
        description: "Build our mobile app experience for patients and healthcare providers.",
        location: "Remote",
        type: "Full-time",
        tags: ["React Native", "iOS", "Android"],
      },
    ],
  },
]

export const mockStartupClips: StartupClip[] = [
  {
    id: "clip1",
    startup: mockStartups[0],
    title: "Senior Frontend Engineer @ Quantum Labs",
    description:
      "We're looking for a Senior Frontend Engineer to join our team building the future of quantum computing interfaces. You'll work with React, TypeScript, and our quantum visualization libraries.",
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", // Placeholder
    duration: 45, // 45 seconds
    tags: ["Engineering", "Frontend"],
    locations: ["Remote"],
  },
  {
    id: "clip2",
    startup: mockStartups[1],
    title: "Full Stack Developer @ EcoTrack",
    description:
      "Join EcoTrack as a Full Stack Developer to help businesses track and reduce their carbon footprint. You'll work across our entire stack with JavaScript, Node.js, and PostgreSQL.",
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", // Placeholder
    duration: 62, // 62 seconds
    tags: ["Engineering", "Full Stack"],
    locations: ["New York"],
  },
  {
    id: "clip3",
    startup: mockStartups[2],
    title: "AI Research Scientist @ HealthPulse",
    description:
      "HealthPulse is seeking an AI Research Scientist to develop novel machine learning models for health prediction. You'll work with our team of data scientists and healthcare experts.",
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Placeholder
    duration: 53, // 53 seconds
    tags: ["AI", "Research"],
    locations: ["Boston"],
  },
  {
    id: "clip4",
    startup: mockStartups[2],
    title: "Mobile Developer @ HealthPulse",
    description:
      "Join HealthPulse to build our mobile app experience for patients and healthcare providers. You'll work with React Native to create intuitive interfaces for health monitoring.",
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", // Placeholder
    duration: 48, // 48 seconds
    tags: ["Mobile", "Development"],
    locations: ["Remote"],
  },
  {
    id: "clip5",
    startup: mockStartups[0],
    title: "Machine Learning Engineer @ Quantum Labs",
    description:
      "Quantum Labs is looking for a Machine Learning Engineer to develop algorithms that bridge quantum computing and machine learning. You'll work with our team of quantum physicists and engineers.",
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", // Placeholder
    duration: 57, // 57 seconds
    tags: ["Machine Learning", "Engineering"],
    locations: ["San Francisco", "Remote"],
  },
]
