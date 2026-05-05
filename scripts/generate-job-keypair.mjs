#!/usr/bin/env node
// Generate an Ed25519 keypair for signing job envelopes.
//
//   node scripts/generate-job-keypair.mjs
//
// Put the SECRET in your website .env as ELOPHANTO_JOB_SIGNING_SK.
// Put the PUBLIC key in EloPhanto's config as `signing_pubkey`.

import nacl from "tweetnacl"

const kp = nacl.sign.keyPair()
const sk = Buffer.from(kp.secretKey).toString("base64") // 64 bytes
const pk = Buffer.from(kp.publicKey).toString("base64") // 32 bytes

console.log("# Add to website .env (KEEP SECRET):")
console.log(`ELOPHANTO_JOB_SIGNING_SK=${sk}`)
console.log()
console.log("# Add to EloPhanto config (public, safe to commit):")
console.log(`signing_pubkey = "${pk}"`)
