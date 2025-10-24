"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Globe, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { storage, type Company, type Job } from "@/lib/storage"
import { useParams } from "next/navigation"

export default function CompanyPage() {
  const params = useParams()
  const companyId = params.id as string
  const [company, setCompany] = useState<Company | null>(null)
  const [companyJobs, setCompanyJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundCompany = storage.getCompanyById(companyId)
    setCompany(foundCompany || null)

    if (foundCompany) {
      const jobs = storage.getJobs().filter((job) => job.company === foundCompany.name)
      setCompanyJobs(jobs)
    }
    setLoading(false)
  }, [companyId])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (!company) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950">
        <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">ETH Jobs</span>
            </Link>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Company not found</h1>
          <Link href="/companies">
            <Button className="mt-4 bg-primary hover:bg-primary/90">Back to Companies</Button>
          </Link>
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
            <Link href="/jobs">
              <Button variant="outline" size="sm">
                Browse Jobs
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
        <Link href="/companies" className="text-primary hover:text-primary/80 transition mb-6 inline-block">
          ← Back to Companies
        </Link>

        <div className="bg-card border border-border/50 rounded-xl p-8 mb-12">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-muted-foreground text-center">
                {company.name.substring(0, 3).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-2">{company.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{company.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{company.employees} employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Founded {company.founded}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{company.website}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {company.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {company.description} is a leading protocol in the Ethereum ecosystem, building innovative solutions for
            decentralized finance. With {company.employees} employees and founded in {company.founded}, the company has
            established itself as a key player in the Web3 space.
          </p>
        </section>

        {/* Open Positions */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Open Positions ({companyJobs.length})</h2>
          {companyJobs.length > 0 ? (
            <div className="space-y-4">
              {companyJobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition group">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition">
                          {job.role}
                        </h3>
                        <p className="text-primary font-medium">{job.salary}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border/50 rounded-xl p-8 text-center">
              <p className="text-muted-foreground mb-4">No open positions at the moment</p>
              <Link href="/jobs">
                <Button variant="outline">Browse other jobs</Button>
              </Link>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}
