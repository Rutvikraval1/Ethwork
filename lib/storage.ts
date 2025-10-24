// Local storage utilities for managing jobs, companies, applications, and user data

export interface Job {
  id: string
  company: string
  role: string
  location: string
  salary: string
  description: string
  tags: string[]
  postedDate: string
  applicants: number
}

export interface Company {
  id: string
  name: string
  description: string
  website: string
  employees: number
  founded: number
  tags: string[]
  openPositions: number
}

export interface Application {
  id: string
  jobId: string
  jobTitle: string
  company: string
  status: "applied" | "reviewing" | "interview" | "rejected" | "accepted"
  appliedDate: string
}

export interface SavedJob {
  jobId: string
  jobTitle: string
  company: string
  savedDate: string
}

export interface UserProfile {
  name: string
  email: string
  bio: string
  skills: string[]
  walletAddress?: string
}

const STORAGE_KEYS = {
  JOBS: "ethjobs_jobs",
  COMPANIES: "ethjobs_companies",
  APPLICATIONS: "ethjobs_applications",
  SAVED_JOBS: "ethjobs_saved_jobs",
  USER_PROFILE: "ethjobs_user_profile",
}

// Initialize default data
const DEFAULT_JOBS: Job[] = [
  {
    id: "1",
    company: "Uniswap Labs",
    role: "Senior Smart Contract Engineer",
    location: "Remote",
    salary: "$150k - $200k",
    description:
      "We are looking for an experienced Smart Contract Engineer to join our team and help build the next generation of decentralized finance protocols.",
    tags: ["Solidity", "Web3", "DeFi", "Smart Contracts"],
    postedDate: "2025-01-15",
    applicants: 45,
  },
  {
    id: "2",
    company: "Lido",
    role: "Full Stack Developer",
    location: "Remote",
    salary: "$120k - $180k",
    description:
      "Join Lido as a Full Stack Developer and help us build the leading liquid staking solution for Ethereum.",
    tags: ["React", "Node.js", "Staking", "TypeScript"],
    postedDate: "2025-01-14",
    applicants: 32,
  },
  {
    id: "3",
    company: "OpenZeppelin",
    role: "Security Researcher",
    location: "Remote",
    salary: "$130k - $190k",
    description:
      "Help secure the Web3 ecosystem as a Security Researcher at OpenZeppelin. Conduct audits and research on smart contracts.",
    tags: ["Security", "Auditing", "Solidity", "Research"],
    postedDate: "2025-01-13",
    applicants: 28,
  },
  {
    id: "4",
    company: "Aave",
    role: "Product Manager",
    location: "Remote",
    salary: "$110k - $170k",
    description:
      "Lead product strategy for Aave's next generation of lending protocols. Work with a world-class team of engineers and designers.",
    tags: ["Product", "DeFi", "Strategy", "Leadership"],
    postedDate: "2025-01-12",
    applicants: 38,
  },
  {
    id: "5",
    company: "Curve Finance",
    role: "Backend Engineer",
    location: "Remote",
    salary: "$100k - $160k",
    description:
      "Build scalable backend systems for Curve Finance. Work on infrastructure that handles billions in TVL.",
    tags: ["Python", "Backend", "DeFi", "Infrastructure"],
    postedDate: "2025-01-11",
    applicants: 25,
  },
  {
    id: "6",
    company: "MakerDAO",
    role: "Frontend Developer",
    location: "Remote",
    salary: "$110k - $170k",
    description: "Create beautiful and intuitive interfaces for MakerDAO's suite of DeFi applications.",
    tags: ["React", "Frontend", "Web3", "UI/UX"],
    postedDate: "2025-01-10",
    applicants: 42,
  },
  {
    id: "7",
    company: "Compound",
    role: "DevOps Engineer",
    location: "Remote",
    salary: "$120k - $180k",
    description: "Manage and optimize infrastructure for Compound's lending protocol. Ensure 99.99% uptime.",
    tags: ["DevOps", "Kubernetes", "Infrastructure", "AWS"],
    postedDate: "2025-01-09",
    applicants: 18,
  },
  {
    id: "8",
    company: "Yearn Finance",
    role: "Quantitative Analyst",
    location: "Remote",
    salary: "$140k - $200k",
    description: "Develop trading strategies and risk models for Yearn's yield optimization vaults.",
    tags: ["Python", "Quantitative", "Finance", "Analytics"],
    postedDate: "2025-01-08",
    applicants: 22,
  },
]

const DEFAULT_COMPANIES: Company[] = [
  {
    id: "1",
    name: "Uniswap Labs",
    description: "The leading decentralized exchange protocol on Ethereum",
    website: "https://uniswap.org",
    employees: 150,
    founded: 2018,
    tags: ["DeFi", "DEX", "Trading"],
    openPositions: 12,
  },
  {
    id: "2",
    name: "Lido",
    description: "Liquid staking solution for Ethereum",
    website: "https://lido.fi",
    employees: 80,
    founded: 2020,
    tags: ["Staking", "DeFi", "Infrastructure"],
    openPositions: 8,
  },
  {
    id: "3",
    name: "OpenZeppelin",
    description: "Security and smart contract development platform",
    website: "https://openzeppelin.com",
    employees: 120,
    founded: 2015,
    tags: ["Security", "Auditing", "Development"],
    openPositions: 6,
  },
  {
    id: "4",
    name: "Aave",
    description: "Leading lending protocol in DeFi",
    website: "https://aave.com",
    employees: 200,
    founded: 2017,
    tags: ["DeFi", "Lending", "Protocol"],
    openPositions: 10,
  },
  {
    id: "5",
    name: "Curve Finance",
    description: "Decentralized exchange for stablecoins",
    website: "https://curve.fi",
    employees: 60,
    founded: 2020,
    tags: ["DeFi", "DEX", "Stablecoins"],
    openPositions: 5,
  },
  {
    id: "6",
    name: "MakerDAO",
    description: "Decentralized stablecoin protocol",
    website: "https://makerdao.com",
    employees: 100,
    founded: 2014,
    tags: ["DeFi", "Stablecoins", "Protocol"],
    openPositions: 7,
  },
  {
    id: "7",
    name: "Compound",
    description: "Algorithmic money market protocol",
    website: "https://compound.finance",
    employees: 90,
    founded: 2018,
    tags: ["DeFi", "Lending", "Protocol"],
    openPositions: 4,
  },
  {
    id: "8",
    name: "Yearn Finance",
    description: "Yield optimization protocol",
    website: "https://yearn.finance",
    employees: 50,
    founded: 2020,
    tags: ["DeFi", "Yield", "Strategy"],
    openPositions: 3,
  },
]

export const storage = {
  // Jobs
  getJobs: (): Job[] => {
    if (typeof window === "undefined") return DEFAULT_JOBS
    const stored = localStorage.getItem(STORAGE_KEYS.JOBS)
    return stored ? JSON.parse(stored) : DEFAULT_JOBS
  },

  setJobs: (jobs: Job[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs))
  },

  addJob: (job: Job) => {
    const jobs = storage.getJobs()
    jobs.push(job)
    storage.setJobs(jobs)
  },

  getJobById: (id: string): Job | undefined => {
    return storage.getJobs().find((job) => job.id === id)
  },

  // Companies
  getCompanies: (): Company[] => {
    if (typeof window === "undefined") return DEFAULT_COMPANIES
    const stored = localStorage.getItem(STORAGE_KEYS.COMPANIES)
    return stored ? JSON.parse(stored) : DEFAULT_COMPANIES
  },

  setCompanies: (companies: Company[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies))
  },

  getCompanyById: (id: string): Company | undefined => {
    return storage.getCompanies().find((company) => company.id === id)
  },

  // Applications
  getApplications: (): Application[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(STORAGE_KEYS.APPLICATIONS)
    return stored ? JSON.parse(stored) : []
  },

  addApplication: (application: Application) => {
    const applications = storage.getApplications()
    applications.push(application)
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications))
  },

  updateApplicationStatus: (id: string, status: Application["status"]) => {
    const applications = storage.getApplications()
    const app = applications.find((a) => a.id === id)
    if (app) {
      app.status = status
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications))
    }
  },

  // Saved Jobs
  getSavedJobs: (): SavedJob[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS)
    return stored ? JSON.parse(stored) : []
  },

  addSavedJob: (savedJob: SavedJob) => {
    const saved = storage.getSavedJobs()
    if (!saved.find((s) => s.jobId === savedJob.jobId)) {
      saved.push(savedJob)
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(saved))
    }
  },

  removeSavedJob: (jobId: string) => {
    const saved = storage.getSavedJobs()
    const filtered = saved.filter((s) => s.jobId !== jobId)
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(filtered))
  },

  isSaved: (jobId: string): boolean => {
    return storage.getSavedJobs().some((s) => s.jobId === jobId)
  },

  // User Profile
  getUserProfile: (): UserProfile => {
    if (typeof window === "undefined") return { name: "", email: "", bio: "", skills: [] }
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    return stored ? JSON.parse(stored) : { name: "", email: "", bio: "", skills: [] }
  },

  setUserProfile: (profile: UserProfile) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
  },
}
