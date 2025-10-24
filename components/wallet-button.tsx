"use client"

import { ConnectKitButton } from "connectkit"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WalletButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, truncatedAddress }) => (
        <div className="flex items-center gap-2">
          {isConnected && (
            <Link href="/dashboard">
              <Button size="sm" variant="outline">
                Dashboard
              </Button>
            </Link>
          )}
          <Button
            onClick={show}
            disabled={isConnecting}
            size="sm"
            className={isConnected ? "bg-primary hover:bg-primary/90" : ""}
            variant={isConnected ? "default" : "outline"}
          >
            {isConnecting ? "Connecting..." : isConnected ? truncatedAddress : "Connect Wallet"}
          </Button>
        </div>
      )}
    </ConnectKitButton.Custom>
  )
}
