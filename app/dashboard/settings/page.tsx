import { Button } from "@/components/ui/button"
import { Briefcase, ArrowLeft } from "lucide-react"
import Link from "next/link"
import WalletButton from "@/components/wallet-button"

export default function SettingsPage() {
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
          <WalletButton />
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-8">Settings</h1>

        <div className="max-w-2xl space-y-8">
          {/* Notifications */}
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Notifications</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-foreground">Email notifications for new job matches</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-foreground">Application status updates</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-foreground">Weekly digest of trending jobs</span>
              </label>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Privacy</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-foreground">Make profile visible to companies</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-foreground">Allow companies to contact me directly</span>
              </label>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-card border border-red-500/20 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
            <p className="text-sm text-muted-foreground mb-4">
              These actions cannot be undone. Please proceed with caution.
            </p>
            <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent">
              Delete Account
            </Button>
          </div>

          {/* Save */}
          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary/90">Save Settings</Button>
            <Link href="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
