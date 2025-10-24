"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, DollarSign, ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react"
import Link from "next/link"
import { storage, type Job } from "@/lib/storage"
import { useParams } from "next/navigation"

export default function JobDetailPage() {
  const params = useParams()
  const jobId = params.id as string
  const [job, setJob] = useState<Job | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundJob = storage.getJobById(jobId)
    setJob(foundJob || null)
    if (foundJob) {
      setIsSaved(storage.isSaved(jobId))
    }
    setLoading(false)
  }, [jobId])

  const handleSaveJob = () => {
    if (!job) return
    if (isSaved) {
      storage.removeSavedJob(job.id)
      setIsSaved(false)
    } else {
      storage.addSavedJob({
        jobId: job.id,
        jobTitle: job.role,
        company: job.company,
        savedDate: new Date().toISOString().split("T")[0],
      })
      setIsSaved(true)
    }
  }

  const handleApply = () => {
    if (!job) return
    const app = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.role,
      company: job.company,
      status: "applied" as const,
      appliedDate: new Date().toISOString().split("T")[0],
    }
    storage.addApplication(app)
    alert("Application submitted successfully!")
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/jobs" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
          <p className="text-muted-foreground">Job not found</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">ETH Jobs</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Post a Job
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/jobs" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        <div className="bg-card border border-border/50 rounded-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
              <h1 className="text-4xl font-bold text-foreground mb-4">{job.role}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveJob}
                className="p-3 hover:bg-muted rounded-lg transition"
                title={isSaved ? "Remove from saved" : "Save job"}
              >
                {isSaved ? (
                  <BookmarkCheck className="w-6 h-6 text-primary" />
                ) : (
                  <Bookmark className="w-6 h-6 text-muted-foreground" />
                )}
              </button>
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleApply}>
                Apply Now
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {job.tags.map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-primary/10 text-primary text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-foreground mb-4">About this role</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{job.description}</p>

            <h2 className="text-2xl font-bold text-foreground mb-4">Responsibilities</h2>
            <ul className="text-muted-foreground space-y-2 mb-6">
              <li>Design and implement smart contracts for DeFi protocols</li>
              <li>Conduct security audits and code reviews</li>
              <li>Collaborate with cross-functional teams</li>
              <li>Contribute to protocol documentation and best practices</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
            <ul className="text-muted-foreground space-y-2 mb-6">
              <li>5+ years of blockchain development experience</li>
              <li>Expert-level knowledge of Solidity</li>
              <li>Understanding of DeFi protocols and mechanisms</li>
              <li>Strong problem-solving and communication skills</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mb-4">Benefits</h2>
            <ul className="text-muted-foreground space-y-2">
              <li>Competitive salary and equity package</li>
              <li>Remote work flexibility</li>
              <li>Professional development budget</li>
              <li>Health insurance and retirement benefits</li>
            </ul>
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">About {job.company}</h2>
          <p className="text-muted-foreground mb-6">
            {job.company} is a leading protocol in the Ethereum ecosystem, building innovative solutions for
            decentralized finance.
          </p>
          <Button variant="outline" className="bg-transparent">
            View Company Profile
          </Button>
        </div>
      </div>
    </main>
  )
}
