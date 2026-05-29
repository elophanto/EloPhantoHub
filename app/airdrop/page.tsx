import { redirect } from "next/navigation"

// The airdrop now lives on the $ELO page (/elo). Keep this route as a
// permanent redirect so existing links and shares don't break.
export default function AirdropPage() {
  redirect("/elo")
}
