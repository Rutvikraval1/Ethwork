import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Users, Zap, Globe } from "lucide-react"
import Link from "next/link"
import WalletButton from "@/components/wallet-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">ETH Jobs</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/jobs" className="text-sm text-muted-foreground hover:text-foreground transition">
              Jobs
            </Link>
            <Link href="/companies" className="text-sm text-muted-foreground hover:text-foreground transition">
              Companies
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <WalletButton />
            <Link href="/post-job">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                Build Your Career in Web3
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover the best opportunities in the Ethereum ecosystem. Connect with innovative companies building
                the future of decentralized technology.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/jobs">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                  Explore Jobs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-border/50 p-8 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white">Smart Opportunities</h3>
                <p className="text-sm text-muted-foreground font-bold">
                  Find roles that match your skills and interests in the fastest-growing sector of tech.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-border/30">
                <div>
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-xs text-muted-foreground">Active Jobs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">200+</p>
                  <p className="text-xs text-muted-foreground">Companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Briefcase, label: "Active Jobs", value: "500+" },
            { icon: Users, label: "Companies", value: "200+" },
            { icon: Globe, label: "Countries", value: "50+" },
            { icon: Zap, label: "Placements", value: "1000+" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 transition">
              <stat.icon className="w-8 h-8 text-primary mb-4" />
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Preview */}
      <section id="jobs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Featured Opportunities</h2>
            <p className="text-lg text-muted-foreground">Handpicked roles from leading Web3 companies</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                company: "Uniswap Labs",
                role: "Senior Smart Contract Engineer",
                location: "Remote",
                salary: "$150k - $200k",
                tags: ["Solidity", "Web3", "DeFi"],
              },
              {
                company: "Lido",
                role: "Full Stack Developer",
                location: "Remote",
                salary: "$120k - $180k",
                tags: ["React", "Node.js", "Staking"],
              },
              {
                company: "OpenZeppelin",
                role: "Security Researcher",
                location: "Remote",
                salary: "$130k - $190k",
                tags: ["Security", "Auditing", "Solidity"],
              },
              {
                company: "Aave",
                role: "Product Manager",
                location: "Remote",
                salary: "$110k - $170k",
                tags: ["Product", "DeFi", "Strategy"],
              },
            ].map((job, i) => (
              <Link key={i} href="/jobs" className="group">
                <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{job.company}</p>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
                        {job.role}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span className="text-primary font-medium">{job.salary}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/jobs">
              <Button size="lg" variant="outline">
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 rounded-2xl p-12 md:p-16 text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Ready to Join Web3?</h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Start your journey in decentralized technology today. Browse thousands of opportunities from the best
            companies in the ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Browse Jobs
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Post a Job
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-slate-950/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-foreground">ETH Jobs</span>
              </div>
              <p className="text-sm text-muted-foreground">The leading job platform for the Ethereum ecosystem.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Companies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2025 ETH Jobs. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-foreground transition">
                Twitter
              </Link>
              <Link href="#" className="hover:text-foreground transition">
                Discord
              </Link>
              <Link href="#" className="hover:text-foreground transition">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
