"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Briefcase, Search, X } from "lucide-react"
import Link from "next/link"
import JobCard from "@/components/job-card"
import { storage, type Job } from "@/lib/storage"

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 250000])

  useEffect(() => {
    setJobs(storage.getJobs())
  }, [])

  const allTags = useMemo(() => {
    return Array.from(new Set(jobs.flatMap((job) => job.tags)))
  }, [jobs])

  

  // const filteredJobs = useMemo(() => {
  //   return jobs.filter((job) => {
  //     const matchesSearch =
  //       searchQuery === "" ||
  //       job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       job.description.toLowerCase().includes(searchQuery.toLowerCase())

  //     const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => job.tags.includes(tag))

  //     const salaryMin = Number.parseInt(job.salary.split("-")[0].replace(/[^0-9]/g, "")) * 1000
  //     const salaryMax = Number.parseInt(job.salary.split("-")[1].replace(/[^0-9]/g, "")) * 1000

  //     const matchesSalary = salaryMin >= salaryRange[0] && salaryMax <= salaryRange[1]

  //     return matchesSearch && matchesTags && matchesSalary
  //   })
  // }, [searchQuery, selectedTags, salaryRange, jobs])

  const filteredJobs = useMemo(() => {
  return jobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => job.tags.includes(tag));

    // Handle salary safely
    const salaryParts = job.salary?.split("-") || [];
    const minPart = salaryParts[0] || "";
    const maxPart = salaryParts[1] || "";

    const parsedMin = Number.parseInt(minPart.replace(/[^0-9]/g, ""));
    const parsedMax = Number.parseInt(maxPart.replace(/[^0-9]/g, ""));

    // If no min or max, handle gracefully
    const salaryMin = parsedMin ? parsedMin * 1000 : 0;
    const salaryMax =
      parsedMax ? parsedMax * 1000 : salaryMin; // if max not found, use min

    // Salary match logic
    const matchesSalary =
      salaryMin <= salaryRange[1] && salaryMax >= salaryRange[0];

    return matchesSearch && matchesTags && matchesSalary;
  });
}, [searchQuery, selectedTags, salaryRange, jobs]);


  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setSalaryRange([0, 250000])
  }

  const hasActiveFilters =
    searchQuery !== "" || selectedTags.length > 0 || salaryRange[0] > 0 || salaryRange[1] < 250000

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

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Job Listings</h1>
          <p className="text-lg text-muted-foreground">
            Browse {filteredJobs.length} of {jobs.length} opportunities in the Ethereum ecosystem
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by role, company, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-base"
          />
        </div>

        {/* Filters */}
        <div className="space-y-6">
          {/* Salary Range */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">Salary Range</label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="250000"
                  step="10000"
                  value={salaryRange[0]}
                  onChange={(e) => setSalaryRange([Number(e.target.value), salaryRange[1]])}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="250000"
                  step="10000"
                  value={salaryRange[1]}
                  onChange={(e) => setSalaryRange([salaryRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                ${(salaryRange[0] / 1000).toFixed(0)}k - ${(salaryRange[1] / 1000).toFixed(0)}k
              </div>
            </div>
          </div>

          {/* Skills/Tags Filter */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">Skills</label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          )}
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredJobs.length > 0 ? (
          <div className="grid gap-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No jobs found matching your filters.</p>
            <Button onClick={clearFilters} variant="outline">
              Clear filters and try again
            </Button>
          </div>
        )}
      </section>
    </main>
  )
}
