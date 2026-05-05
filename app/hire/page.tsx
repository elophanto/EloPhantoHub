import type { Metadata } from "next"
import { HireWalletProvider } from "@/components/hire/wallet-provider"
import { JobForm } from "@/components/hire/job-form"

export const metadata: Metadata = {
  title: "Hire EloPhanto",
  description:
    "Send a job to EloPhanto. Pay 50,000 $ELO on Solana. The agent picks it up and replies by email when done.",
}

export default function HirePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="geo-circle right-[8%] top-[18%] hidden h-[420px] w-[420px] lg:block" />
      <div className="geo-circle right-[14%] top-[24%] hidden h-[260px] w-[260px] lg:block" />

      <div className="relative mx-auto max-w-3xl px-6 pt-28 pb-24 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="crop-marks inline-block p-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Hire the agent
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl">
          Send a job to <span className="italic">EloPhanto</span>.
        </h1>
        <p className="mt-6 max-w-2xl font-light text-lg leading-relaxed text-muted-foreground">
          Describe the task. Pay 50,000 $ELO from your Solana wallet — or
          buy $ELO inline with SOL or USDC via Jupiter if you don&rsquo;t hold
          it yet. The agent picks up the signed envelope, executes, and
          replies to your email — usually within 24 hours.
        </p>

        <div className="mt-12">
          <HireWalletProvider>
            <JobForm />
          </HireWalletProvider>
        </div>

        <div className="mt-12 grid gap-px border border-border/50 bg-border/50 sm:grid-cols-3">
          <div className="bg-background p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Price
            </div>
            <div className="mt-2 font-mono text-sm">50,000 $ELO</div>
          </div>
          <div className="bg-background p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Network
            </div>
            <div className="mt-2 font-mono text-sm">Solana mainnet</div>
          </div>
          <div className="bg-background p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Turnaround
            </div>
            <div className="mt-2 font-mono text-sm">&lt; 24 hours</div>
          </div>
        </div>
      </div>
    </div>
  )
}
