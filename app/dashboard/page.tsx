"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Briefcase, Bookmark, CheckCircle, Settings, Trash2 } from "lucide-react"
import Link from "next/link"
import WalletButton from "@/components/wallet-button"
import { storage, type Application, type SavedJob, type UserProfile } from "@/lib/storage"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"applications" | "saved" | "profile">("applications")
  const [applications, setApplications] = useState<Application[]>([])
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([])
  const [profile, setProfile] = useState<UserProfile>({ name: "", email: "", bio: "", skills: [] })
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if wallet is connected (in real app, use wagmi)
    const checkConnection = () => {
      setIsConnected(true)
      setApplications(storage.getApplications())
      setSavedJobs(storage.getSavedJobs())
      setProfile(storage.getUserProfile())
      setLoading(false)
    }
    checkConnection()
  }, [])

  const handleUpdateProfile = () => {
    storage.setUserProfile(profile)
    alert("Profile updated successfully!")
  }

  const handleDeleteApplication = (id: string) => {
    const updated = applications.filter((app) => app.id !== id)
    setApplications(updated)
    localStorage.setItem("ethjobs_applications", JSON.stringify(updated))
  }

  const handleRemoveSavedJob = (jobId: string) => {
    storage.removeSavedJob(jobId)
    setSavedJobs(storage.getSavedJobs())
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (!isConnected) {
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
            <WalletButton />
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Connect Your Wallet</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Please connect your wallet to access your dashboard and manage your applications.
          </p>
          <WalletButton />
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
            <WalletButton />
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-lg text-muted-foreground">Manage your applications and saved jobs.</p>
          </div>
          <Link href="/dashboard/settings">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-foreground">{applications.length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Saved Jobs</p>
                <p className="text-3xl font-bold text-foreground">{savedJobs.length}</p>
              </div>
              <Bookmark className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Accepted Offers</p>
                <p className="text-3xl font-bold text-foreground">
                  {applications.filter((a) => a.status === "accepted").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border/40">
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-3 font-medium transition ${
              activeTab === "applications"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-3 font-medium transition ${
              activeTab === "saved"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Saved Jobs
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-3 font-medium transition ${
              activeTab === "profile"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Profile
          </button>
        </div>

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {applications.length > 0 ? (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{app.jobTitle}</h3>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            app.status === "accepted"
                              ? "bg-green-500/20 text-green-400"
                              : app.status === "interview"
                                ? "bg-blue-500/20 text-blue-400"
                                : app.status === "reviewing"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : app.status === "rejected"
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{app.company}</p>
                      <p className="text-xs text-muted-foreground">Applied {app.appliedDate}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteApplication(app.id)}
                      className="p-2 hover:bg-muted rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No applications yet</p>
                <Link href="/jobs">
                  <Button className="bg-primary hover:bg-primary/90">Browse Jobs</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Saved Jobs Tab */}
        {activeTab === "saved" && (
          <div className="space-y-4">
            {savedJobs.length > 0 ? (
              savedJobs.map((job) => (
                <div
                  key={job.jobId}
                  className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{job.jobTitle}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                      <p className="text-xs text-muted-foreground">Saved {job.savedDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/jobs/${job.jobId}`}>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          View
                        </Button>
                      </Link>
                      <button
                        onClick={() => handleRemoveSavedJob(job.jobId)}
                        className="p-2 hover:bg-muted rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No saved jobs yet</p>
                <Link href="/jobs">
                  <Button className="bg-primary hover:bg-primary/90">Browse Jobs</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <div className="bg-card border border-border/50 rounded-xl p-8 space-y-6">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-muted border border-border/50 rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-muted border border-border/50 rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Bio</label>
                <textarea
                  placeholder="Tell us about yourself..."
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="w-full bg-muted border border-border/50 rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Skills</label>
                <input
                  type="text"
                  placeholder="e.g., Solidity, React, Node.js (comma separated)"
                  value={profile.skills.join(", ")}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full bg-muted border border-border/50 rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="bg-primary hover:bg-primary/90" onClick={handleUpdateProfile}>
                  Save Changes
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
