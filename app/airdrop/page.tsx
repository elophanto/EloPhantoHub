import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { HireWalletProvider } from "@/components/hire/wallet-provider"
import { AirdropForm } from "@/components/airdrop/airdrop-form"
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/seo"

const airdropDescription =
  "50,000,000 $ELO airdrop on December 31, 2026. Hold 500,000 $ELO continuously to qualify. Four tiers reward longer holders up to 3×."

export const metadata: Metadata = createMetadata({
  title: "$ELO Airdrop – 50M $ELO, Snapshot Dec 31, 2026 | EloPhanto",
  description: airdropDescription,
  path: "/airdrop",
  keywords: [
    "$ELO airdrop",
    "ELO token airdrop",
    "Solana airdrop",
    "EloPhanto airdrop",
    "AI agent token airdrop",
  ],
})

const headlineStats = [
  {
    title: "Pool",
    value: "50,000,000 $ELO",
    description:
      "Fixed pool, paid from EloPhanto&rsquo;s treasury. One-time claim, no vesting.",
  },
  {
    title: "Snapshot",
    value: "Dec 31, 2026",
    description:
      "Single snapshot block, verified against multiple random samples across each tier&rsquo;s holding window.",
  },
  {
    title: "Threshold",
    value: "500,000 $ELO",
    description:
      "Minimum balance held continuously through your tier&rsquo;s window. Drops below reset the streak.",
  },
]

const tiers = [
  {
    name: "Gold",
    multiplier: "3.0×",
    fromDate: "May 15, 2026",
    window: "~7.5 months",
    note: "OG cohort. Cutoff is May 15 – the door closes fast.",
  },
  {
    name: "Silver",
    multiplier: "1.75×",
    fromDate: "Jul 15, 2026",
    window: "~5.5 months",
    note: "Mid-conviction holders.",
  },
  {
    name: "Bronze",
    multiplier: "1.0×",
    fromDate: "Oct 15, 2026",
    window: "~2.5 months",
    note: "Standard tier. Hold continuously through the full window.",
  },
  {
    name: "Holder",
    multiplier: "0.4×",
    fromDate: "Dec 15, 2026",
    window: "~2 weeks",
    note: "Late-cycle buyers. Smaller allocation, still included.",
  },
]

// Pump.fun supply is fixed at 1B, so price = MC / 1B. These scenarios show
// what each on-chain $ELO amount is worth in USD at different market caps.
const priceScenarios = [
  { mc: "$100k", price: "$0.0001", threshold: "$50", cap: "$25", pool: "$5,000" },
  { mc: "$1M", price: "$0.001", threshold: "$500", cap: "$250", pool: "$50,000" },
  { mc: "$10M", price: "$0.01", threshold: "$5,000", cap: "$2,500", pool: "$500,000" },
  { mc: "$100M", price: "$0.10", threshold: "$50,000", cap: "$25,000", pool: "$5,000,000" },
]

const steps = [
  {
    title: "Connect wallet",
    description:
      "Connect the Solana wallet that holds your $ELO. Phantom and Solflare are supported.",
  },
  {
    title: "Register",
    description:
      "Optional. Registering helps us prioritize scanning your wallet during verification, but is not required to qualify.",
  },
  {
    title: "Hold $ELO",
    description:
      "Keep ≥500,000 $ELO in the wallet through your tier&rsquo;s window. Outflows below the threshold reset the streak.",
  },
  {
    title: "Claim",
    description:
      "Return to this page after Dec 31, 2026 to claim. The claim window stays open for 30 days.",
  },
]

const faqs = [
  {
    question: "When is the airdrop and how much is the pool?",
    answer:
      "Snapshot is December 31, 2026. The pool is 50,000,000 $ELO, paid from the EloPhanto treasury. Claim opens immediately after snapshot and stays open for 30 days.",
  },
  {
    question: "How do the tiers work?",
    answer:
      "Four tiers reward longer holders. Gold (3.0×) requires holding ≥500,000 $ELO continuously since May 15, 2026. Silver (1.75×) since July 15. Bronze (1.0×) since October 15. Holder (0.4×) since December 15. Each wallet is placed in the highest tier it qualifies for.",
  },
  {
    question: "How is the allocation calculated?",
    answer:
      "Allocation per wallet is sqrt(balance) × tier multiplier, normalized so the total equals 50,000,000 $ELO. A square-root curve dampens whale dominance without flat-capping. The final allocation per wallet is then capped at 250,000 $ELO (0.5% of the pool). The cap is absolute and applies after the multiplier, so a Gold-tier whale and a Bronze-tier whale both max out at 250,000 $ELO.",
  },
  {
    question: "How is continuous holding verified?",
    answer:
      "For each tier window, we take 8 random block heights – chosen after the window closes so they cannot be gamed – and verify the wallet held at least 500,000 $ELO at every sample. Verification reads on-chain $ELO transfer history via Solana RPC.",
  },
  {
    question: "I bought on December 15. Do I qualify?",
    answer:
      "Yes – for the Holder tier (0.4×), provided you hold ≥500,000 $ELO continuously from December 15 through the snapshot. To qualify for higher tiers you would have needed to start holding by the earlier cutoff dates.",
  },
  {
    question: "What if I sell or transfer $ELO before the snapshot?",
    answer:
      "Any moment your balance drops below 500,000 $ELO resets your holding streak to that timestamp. You can rebuild the streak from there but you will only qualify for tiers whose cutoff is on or after your reset.",
  },
  {
    question: "Do I need to register to qualify?",
    answer:
      "No. Every qualifying wallet is eligible whether registered or not. Registration only helps us prioritize scanning your wallet during verification.",
  },
  {
    question: "What about transferring between my own wallets (e.g. Ledger upgrade)?",
    answer:
      "By default, the destination wallet's holding streak starts when the $ELO arrives. A wallet-migration registration form will be published before snapshot for users who need to declare a legitimate self-custody migration.",
  },
  {
    question: "Can I register multiple wallets?",
    answer:
      "Yes – connect each wallet and submit it separately. Sybil filters apply at allocation time: wallets funded from another qualifying wallet within the holding window are clustered and only the oldest is counted.",
  },
  {
    question: "Is there a fee to register?",
    answer:
      "No. Registration is a free off-chain submission. There is no on-chain transaction and no $ELO is moved.",
  },
]

export default function AirdropPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "$ELO Airdrop",
      description: airdropDescription,
      url: absoluteUrl("/airdrop"),
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      <JsonLd data={structuredData} />

      <div className="geo-circle right-[8%] top-[18%] hidden h-[420px] w-[420px] lg:block" />
      <div className="geo-circle right-[14%] top-[24%] hidden h-[260px] w-[260px] lg:block" />

      <div className="relative mx-auto max-w-4xl px-6 pt-28 pb-24 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="crop-marks inline-block p-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            $ELO airdrop – snapshot Dec 31, 2026
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl">
          50,000,000 $ELO for holders. Snapshot December 31, 2026.
        </h1>
        <p className="mt-6 max-w-2xl font-light text-lg leading-relaxed text-muted-foreground">
          Hold ≥500,000 $ELO continuously through your tier&rsquo;s window to
          qualify. Four tiers reward longer holders up to 3×. The Gold cutoff
          is May 15, 2026 – buy before that date and hold through the
          snapshot to lock in the maximum multiplier.
        </p>

        <div className="mt-12">
          <HireWalletProvider>
            <AirdropForm />
          </HireWalletProvider>
        </div>

        <section className="mt-12 grid gap-px border border-border/50 bg-border/50 sm:grid-cols-3">
          {headlineStats.map((stat) => (
            <article key={stat.title} className="bg-background p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {stat.title}
              </div>
              <div className="mt-2 font-mono text-sm">{stat.value}</div>
              <p
                className="mt-3 text-xs leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: stat.description }}
              />
            </article>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Tiers
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            <span className="font-mono text-foreground">Must hold by</span> is
            the latest date by which you needed to already own ≥500,000 $ELO.
            Buying after that date disqualifies you from that tier (you may
            still qualify for a lower tier with a later cutoff). The balance
            must stay above the threshold continuously through the snapshot
            on Dec 31, 2026.
          </p>
          <div className="mt-4 grid gap-px border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <article key={tier.name} className="bg-background p-5">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                    {tier.name}
                  </span>
                  <span className="font-mono text-2xl font-extralight tabular-nums">
                    {tier.multiplier}
                  </span>
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Must hold by
                </div>
                <div className="mt-1 font-mono text-sm">{tier.fromDate}</div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Through
                </div>
                <div className="mt-1 font-mono text-sm">Dec 31, 2026</div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Window
                </div>
                <div className="mt-1 font-mono text-sm">{tier.window}</div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {tier.note}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Each wallet is placed in the highest tier it qualifies for.
            Allocation = sqrt(balance) × tier multiplier, normalized so the
            total equals 50,000,000 $ELO. Final allocation per wallet is
            capped at 250,000 $ELO – the cap is absolute and applies after
            the multiplier, so all tiers max out at the same number.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            What this is worth at different market caps
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            $ELO has a fixed 1B supply, so the USD value of every airdrop
            number scales linearly with market cap. The table below converts
            the threshold, the per-wallet cap, and the full pool into dollars
            at a few reference points.
          </p>
          <div className="mt-4 overflow-x-auto border border-border/50">
            <table className="w-full border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-border/50 bg-background text-left">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Market cap
                  </th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Price / token
                  </th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    500k threshold
                  </th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    250k cap
                  </th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    50M pool
                  </th>
                </tr>
              </thead>
              <tbody>
                {priceScenarios.map((row) => (
                  <tr
                    key={row.mc}
                    className="border-b border-border/50 last:border-b-0"
                  >
                    <td className="px-4 py-3 tabular-nums">{row.mc}</td>
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">
                      {row.price}
                    </td>
                    <td className="px-4 py-3 tabular-nums">{row.threshold}</td>
                    <td className="px-4 py-3 tabular-nums">{row.cap}</td>
                    <td className="px-4 py-3 tabular-nums">{row.pool}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Reference only. Actual claim-time value depends on the $ELO market
            cap on December 31, 2026.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            How it works
          </h2>
          <div className="mt-4 grid gap-px border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.title} className="bg-background p-5">
                <span className="font-mono text-2xl font-extralight tabular-nums text-border">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-y border-border/50">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="border-b border-border/50 py-6 last:border-b-0"
            >
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em]">
                {faq.question}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
