"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Bookmark, BookmarkCheck } from "lucide-react"
import Link from "next/link"
import { storage, type Job } from "@/lib/storage"
import { useState, useEffect } from "react"

export default function JobCard({ job }: { job: Job }) {
  const [isSaved, setIsSaved] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)

  useEffect(() => {
    setIsSaved(storage.isSaved(job.id))
  }, [job.id])

  const handleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault()
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

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowApplyModal(true)
  }

  return (
    <>
      <Link href={`/jobs/${job.id}`}>
        <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-muted-foreground">
                  {job.company.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{job.company}</p>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
                  {job.role}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleSaveJob}
                className="p-2 hover:bg-muted rounded-lg transition"
                title={isSaved ? "Remove from saved" : "Save job"}
              >
                {isSaved ? (
                  <BookmarkCheck className="w-5 h-5 text-primary" />
                ) : (
                  <Bookmark className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              <Button size="sm" variant="outline" className="bg-transparent" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-foreground mb-4">Apply to {job.role}</h2>
            <p className="text-sm text-muted-foreground mb-6">Please connect your wallet to apply for this position.</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowApplyModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => {
                  const app = {
                    id: `app_${Date.now()}`,
                    jobId: job.id,
                    jobTitle: job.role,
                    company: job.company,
                    status: "applied" as const,
                    appliedDate: new Date().toISOString().split("T")[0],
                  }
                  storage.addApplication(app)
                  setShowApplyModal(false)
                  alert("Application submitted successfully!")
                }}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
