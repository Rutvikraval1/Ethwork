"use client"

import { Button } from "@/components/ui/button"
import { Briefcase, Users, Globe, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              About ETH Jobs
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              We're building the leading job platform for the Ethereum ecosystem, connecting talented developers and
              professionals with innovative Web3 companies.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ETH Jobs exists to accelerate the growth of the Ethereum ecosystem by connecting the best talent with the
              most innovative companies. We believe that Web3 represents the future of the internet, and we're committed
              to helping talented individuals find their place in this revolution.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform makes it easy for companies to find and hire top talent, while giving job seekers access to
              the most exciting opportunities in the space.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl p-8 border border-primary/20">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Fast & Easy</h3>
                  <p className="text-sm text-muted-foreground">Post jobs and find talent in minutes, not weeks.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Global Reach</h3>
                  <p className="text-sm text-muted-foreground">Connect with talent from around the world.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Community Focused</h3>
                  <p className="text-sm text-muted-foreground">Built by and for the Web3 community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at ETH Jobs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                description:
                  "We believe in open communication and honest relationships between employers and job seekers.",
              },
              {
                title: "Innovation",
                description:
                  "We're constantly improving our platform to better serve the Web3 community and support its growth.",
              },
              {
                title: "Inclusivity",
                description:
                  "We welcome talent from all backgrounds and experience levels to participate in the Web3 revolution.",
              },
              {
                title: "Security",
                description: "We prioritize the security and privacy of our users' data and transactions.",
              },
              {
                title: "Community",
                description: "We're committed to building a supportive community where everyone can thrive and grow.",
              },
              {
                title: "Excellence",
                description: "We strive for excellence in everything we do, from our platform to our customer service.",
              },
            ].map((value, i) => (
              <div key={i} className="bg-card border border-border/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Active Jobs", value: "500+" },
            { label: "Companies", value: "200+" },
            { label: "Countries", value: "50+" },
            { label: "Placements", value: "1000+" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 rounded-2xl p-12 md:p-16 text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Ready to Join the Web3 Revolution?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking for your next opportunity or searching for top talent, ETH Jobs is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Browse Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/post-job">
              <Button size="lg" variant="outline">
                Post a Job
              </Button>
            </Link>
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
                  <Link href="/jobs" className="hover:text-foreground transition">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="hover:text-foreground transition">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link href="/post-job" className="hover:text-foreground transition">
                    Post a Job
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition">
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
