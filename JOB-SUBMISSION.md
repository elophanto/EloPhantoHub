# Job Submission System

How users send paid jobs to EloPhanto from elophanto.com.

- **Price**: 50,000 $ELO per job (flat)
- **Token**: `BwUgJBQffm4HM49W7nsMphStJm4DbA5stuo4w7iwpump` — **Token-2022** (Token Extensions program), 6 decimals
- **Treasury wallet**: `AkEJzcZoN7jTZqkqV8zA4R3QwSSgDFTp73LSkL9874GK` — EloPhanto's self-custody Solana wallet
- **EloPhanto repo**: https://github.com/elophanto/EloPhanto

---

## 1. Page & flow

`/hire` — single-page flow with 4 states:

1. **Compose** — task textarea (cap 4k chars), email, "Connect Wallet"
2. **Pay** — show price (50,000 $ELO) + USD equivalent, current $ELO balance. If balance < price → inline Jupiter swap (SOL → $ELO).
3. **Submitting** — tx confirming → backend posting → job queued
4. **Done** — job ID, "reply within 24h" copy

## 2. Wallet + payment stack

- `@solana/wallet-adapter-react` + `wallet-adapter-react-ui` (Phantom, Solflare)
- RPC: `NEXT_PUBLIC_SOLANA_RPC` — currently publicnode.com (free, CORS-friendly). Use Helius/Triton for production traffic.
- $ELO is **Token-2022**: client detects mint owner program at load and threads `tokenProgramId` through `getAssociatedTokenAddress`, `createTransferCheckedInstruction`, etc. Defaulting to legacy SPL Token derives wrong (empty) ATAs.
- Pay: `createTransferCheckedInstruction` from user ATA → treasury ATA. Auto-creates treasury ATA if missing.
- Swap fallback: `https://jup.ag/swap?sell=So111…&buy=BwUg…pump`

## 3. Pricing

- **Flat fee**: 50,000 $ELO per job
- `NEXT_PUBLIC_JOB_PRICE_ELO=50000` (UI)
- `JOB_PRICE_ELO_RAW=50000000000` (server, raw token units = 50000 × 10⁶)
- USD shown via Jupiter price API (informational)

## 4. Backend `/api/jobs`

```
POST { task, email, wallet, txSignature }
```

Server steps:
1. Validate inputs (zod): email, task ≤ 4000, wallet/sig base58
2. Replay-check `tx_signature` against Supabase
3. Fetch tx via `getParsedTransaction(sig, { maxSupportedTransactionVersion: 0 })`
4. Verify on-chain:
   - Confirmed, ≤ 10 min old
   - SPL transfer with mint = $ELO
   - Sender ATA owner = `wallet`, treasury ATA owner = treasury wallet
   - Treasury delta ≥ `JOB_PRICE_ELO_RAW`
5. Generate `jobId` (ULID), build envelope, sign with Ed25519
6. Insert into Supabase `jobs` (status `pending`)
7. **Email signed envelope to `elophanto@agentmail.to`** via AgentMail SMTP. On success: stamp `delivered_at`. On failure: log and continue (job is in DB, pull endpoint can still deliver).
8. Return `{ jobId, expiresAt }`

## 5. Supabase schema

See `supabase/migrations/20260505000000_create_jobs.sql`:

```sql
create table jobs (
  id              text primary key,         -- ULID
  task            text not null,
  email           text not null,
  wallet          text not null,
  tx_signature    text unique not null,
  amount_elo      numeric not null,
  status          text not null default 'pending'
                    check (status in ('pending','delivered','completed','failed')),
  payload         text not null,            -- the BEGIN/END signed envelope
  expires_at      timestamptz not null,
  created_at      timestamptz default now(),
  delivered_at    timestamptz,
  completed_at    timestamptz,
  result          text
);
```

RLS enabled, no policies → only the service-role key can read/write.

## 6. Transport

**Both are active:**

- **Email (primary)**: signed envelope sent to `elophanto@agentmail.to` via AgentMail SMTP (`smtp.agentmail.to:465`). EloPhanto reads via IMAP (`imap.agentmail.to:993`, user `elophanto@elophanto.com`).
- **Pull (fallback)**: EloPhanto can poll `GET /api/jobs/pending` with `Authorization: Bearer $JOBS_AGENT_BEARER`.

Same payload format on both transports.

---

# 🐘 EloPhanto-side integration (add to EloPhanto repo)

> **For the EloPhanto agent codebase at https://github.com/elophanto/EloPhanto** — how the agent receives, verifies, and executes jobs submitted from elophanto.com.

## Overview

Users pay 50,000 $ELO on elophanto.com to submit a job. The website verifies payment on-chain, signs an Ed25519 envelope, and delivers it via AgentMail (and optionally a bearer-auth pull endpoint). EloPhanto verifies the signature locally, dedupes by `jobId`, and executes.

## Configuration

```toml
[jobs]
enabled = true

# Public Ed25519 key matching the website's signing key (32-byte, base64).
signing_pubkey = "es8ggSXCOHPl2y4qUOYYsLLitPSoyymgWBldFQ1dn0k="

# Expected payment parameters.
payment_mint = "BwUgJBQffm4HM49W7nsMphStJm4DbA5stuo4w7iwpump"
payment_decimals = 6
min_payment_raw = 50000000000           # 50,000 $ELO × 10^6
treasury_wallet = "AkEJzcZoN7jTZqkqV8zA4R3QwSSgDFTp73LSkL9874GK"

# Token-2022 program (the $ELO mint is owned by this, NOT legacy SPL Token).
token_program = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"

[jobs.transport.email]
enabled = true
imap_host = "imap.agentmail.to"
imap_port = 993
imap_user = "elophanto@elophanto.com"
imap_password_env = "JOBS_IMAP_PASSWORD"   # store in OS keychain
inbox = "elophanto@agentmail.to"
poll_interval_seconds = 60
# Filter to job mail: subject prefix or header.
header_filter = "X-Elophanto-Job-Id"

[jobs.transport.pull]
enabled = true
api_base = "https://elophanto.com/api"
bearer_token_env = "ELOPHANTO_JOBS_BEARER"
poll_interval_seconds = 60
```

## Job envelope format

Envelope (JSON):
```json
{
  "v": 1,
  "jobId": "01HXY8K9ZQRSTABCDEF1234567",
  "task": "Research the top 5 Solana DEXes by 24h volume and write a summary.",
  "requester": {
    "email": "user@example.com",
    "wallet": "<base58 user pubkey>"
  },
  "payment": {
    "mint": "BwUgJBQffm4HM49W7nsMphStJm4DbA5stuo4w7iwpump",
    "amount": "50000000000",
    "txSig": "<base58 transaction signature>"
  },
  "issuedAt": "2026-05-05T12:00:00Z",
  "expiresAt": "2026-05-12T12:00:00Z"
}
```

Wire format (email body or `payload` field on `/api/jobs/pending`):
```
-----BEGIN ELOPHANTO JOB-----
<base64url(envelope_json)>.<base64url(ed25519_signature)>
-----END ELOPHANTO JOB-----
```

The `<envelope>.<sig>` form is two base64url chunks separated by `.` (JWT-like). Signature is over the **raw envelope JSON bytes**, not the base64.

## Email transport details

- Subject: `[ELOPHANTO-JOB] <jobId> — <task preview>`
- `Reply-To: <requester.email>` (so a normal mail-reply goes straight to the user)
- Custom headers for filtering:
  - `X-Elophanto-Job-Id: <jobId>`
  - `X-Elophanto-Job-Wallet: <wallet>`
  - `X-Elophanto-Job-Tx: <txSig>`
- Body is plain text: human-readable summary + the BEGIN/END block

## Verification steps (EloPhanto)

For each incoming job, in order:

1. **Parse**: extract the BEGIN/END block, split on `.`, base64url-decode both halves.
2. **Verify signature**: Ed25519 verify `signature` over `envelope_json_bytes` using `signing_pubkey`. Reject on failure.
3. **Schema check**: `v == 1`, all required fields, `task` length ≤ 4000.
4. **Expiry check**: `now < expiresAt`.
5. **Dedupe**: check local job store for `jobId`. Skip silently if seen.
6. **Re-verify on-chain (recommended)**: fetch `payment.txSig` via Solana RPC, confirm it transferred ≥ `min_payment_raw` of `payment_mint` to `treasury_wallet`. Defense-in-depth: a compromised signing key alone can't drain agent effort without a real on-chain payment.
7. **Persist locally** with status `accepted`.
8. **Execute**, then either:
   - Reply directly via mail to `requester.email` (simplest), OR
   - `POST /api/jobs/:jobId/result` to mark `completed`/`failed` and let the website send the reply.

## Reference verification (Python)

```python
import base64, json
from datetime import datetime, timezone
from nacl.signing import VerifyKey
from nacl.exceptions import BadSignatureError

def b64url_decode(s: str) -> bytes:
    pad = "=" * (-len(s) % 4)
    return base64.urlsafe_b64decode(s + pad)

def parse_and_verify(wire: str, pubkey_b64: str) -> dict:
    body = wire.strip()
    if "BEGIN ELOPHANTO JOB" in body:
        body = body.split("-----BEGIN ELOPHANTO JOB-----")[1]
        body = body.split("-----END ELOPHANTO JOB-----")[0].strip()

    env_b64, sig_b64 = body.split(".")
    env_bytes = b64url_decode(env_b64)
    sig = b64url_decode(sig_b64)

    vk = VerifyKey(base64.b64decode(pubkey_b64))
    try:
        vk.verify(env_bytes, sig)
    except BadSignatureError:
        raise ValueError("invalid signature")

    env = json.loads(env_bytes)
    if env.get("v") != 1:
        raise ValueError("unsupported version")
    if datetime.fromisoformat(env["expiresAt"].replace("Z", "+00:00")) < datetime.now(timezone.utc):
        raise ValueError("expired")
    return env
```

## Pull-mode endpoints (already deployed)

All require `Authorization: Bearer $ELOPHANTO_JOBS_BEARER`:

- `GET /api/jobs/pending?limit=20` → `{ jobs: [{ jobId, payload, createdAt }] }` — jobs with status `pending`, oldest first.
- `POST /api/jobs/:jobId/claim` → atomic `pending → delivered`. Call before execution to prevent re-pickup. Returns 409 if already claimed.
- `POST /api/jobs/:jobId/result` `{ status: "completed"|"failed", result?: string }` → terminal state.

## Security notes

- **Signing key compromise** is mitigated by step 6: an attacker forging an envelope still needs a real on-chain $ELO payment.
- **Replay**: `tx_signature` UNIQUE on the website side; agent dedupes by `jobId`. Both layers needed.
- **Task content** is untrusted input. Don't shell-interpolate. Apply the agent's normal prompt-injection hardening.
- **Expiry**: 7 days. Reject anything older.

## Status

Website-side: **deployed**. Keypair generated, treasury configured, AgentMail SMTP wired, Supabase migration ready, pull endpoints live.

Open on EloPhanto's side:
- Implement IMAP poller (or pull-mode poller — pick one or run both).
- Implement envelope verification per §"Verification steps".
- Wire to the agent's task runner.
- Reply path: email the requester directly, and/or `POST /api/jobs/:id/result`.
