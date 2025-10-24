"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Globe } from "lucide-react"
import Link from "next/link"
import { storage, type Company } from "@/lib/storage"

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCompanies(storage.getCompanies())
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-muted-foreground">Loading...</p>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Companies</h1>
          <p className="text-lg text-muted-foreground">Explore {companies.length} leading Web3 companies hiring now</p>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Link key={company.id} href={`/companies/${company.id}`}>
              <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition h-full flex flex-col group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-muted-foreground text-center px-2">
                      {company.name.substring(0, 3).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{company.openPositions}</p>
                    <p className="text-xs text-muted-foreground">Open roles</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition">
                  {company.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{company.description}</p>

                <div className="space-y-3 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{company.employees} employees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{company.website}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {company.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">View Profile</Button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
