"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Briefcase, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { storage } from "@/lib/storage"

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    salary: "",
    description: "",
    tags: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.company || !formData.role || !formData.location || !formData.salary || !formData.description) {
      alert("Please fill in all fields")
      return
    }

    const newJob = {
      id: `job_${Date.now()}`,
      company: formData.company,
      role: formData.role,
      location: formData.location,
      salary: formData.salary,
      description: formData.description,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      postedDate: new Date().toISOString().split("T")[0],
      applicants: 0,
    }

    storage.addJob(newJob)
    alert("Job posted successfully!")
    setFormData({
      company: "",
      role: "",
      location: "",
      salary: "",
      description: "",
      tags: "",
    })
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
            <Link href="/jobs">
              <Button variant="outline" size="sm">
                Browse Jobs
              </Button>
            </Link>
            <Link href="/companies">
              <Button variant="outline" size="sm">
                Companies
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-card border border-border/50 rounded-xl p-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Post a Job</h1>
          <p className="text-lg text-muted-foreground mb-8">Share your job opportunity with the Web3 community</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Company Name</label>
              <Input
                type="text"
                placeholder="e.g., Uniswap Labs"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="py-6"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Job Title</label>
              <Input
                type="text"
                placeholder="e.g., Senior Smart Contract Engineer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="py-6"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Location</label>
                <Input
                  type="text"
                  placeholder="e.g., Remote"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="py-6"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Salary Range</label>
                <Input
                  type="text"
                  placeholder="e.g., $150k - $200k"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="py-6"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Job Description</label>
              <textarea
                placeholder="Describe the role, responsibilities, and requirements..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full bg-muted border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Skills/Tags</label>
              <Input
                type="text"
                placeholder="e.g., Solidity, Web3, DeFi (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="py-6"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Post Job
              </Button>
              <Link href="/jobs">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
