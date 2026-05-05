import nacl from "tweetnacl"
import { JobEnvelope } from "./types"

function b64urlEncode(bytes: Uint8Array): string {
  return Buffer.from(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

function b64urlDecode(s: string): Uint8Array {
  const pad = "=".repeat((4 - (s.length % 4)) % 4)
  return new Uint8Array(
    Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64")
  )
}

function getSigningKey(): Uint8Array {
  const sk = process.env.ELOPHANTO_JOB_SIGNING_SK
  if (!sk) throw new Error("ELOPHANTO_JOB_SIGNING_SK not set")
  // Stored as base64-encoded 64-byte secret key (nacl.sign.keyPair format)
  const decoded = new Uint8Array(Buffer.from(sk, "base64"))
  if (decoded.length !== 64) {
    throw new Error(
      "ELOPHANTO_JOB_SIGNING_SK must be a base64-encoded 64-byte ed25519 secret key"
    )
  }
  return decoded
}

/**
 * Produce the wire-format payload EloPhanto receives:
 *   <BEGIN>\n<base64url(envelope)>.<base64url(sig)>\n<END>
 * Signature is computed over the raw JSON bytes of the envelope.
 */
export function signEnvelope(env: JobEnvelope): string {
  const sk = getSigningKey()
  const json = JSON.stringify(env)
  const envBytes = new TextEncoder().encode(json)
  const sig = nacl.sign.detached(envBytes, sk)
  const body = `${b64urlEncode(envBytes)}.${b64urlEncode(sig)}`
  return `-----BEGIN ELOPHANTO JOB-----\n${body}\n-----END ELOPHANTO JOB-----`
}

export function verifyWire(wire: string, pubkeyB64: string): JobEnvelope {
  let body = wire.trim()
  if (body.includes("BEGIN ELOPHANTO JOB")) {
    body = body
      .split("-----BEGIN ELOPHANTO JOB-----")[1]!
      .split("-----END ELOPHANTO JOB-----")[0]!
      .trim()
  }
  const [envB64, sigB64] = body.split(".")
  if (!envB64 || !sigB64) throw new Error("malformed payload")
  const envBytes = b64urlDecode(envB64)
  const sig = b64urlDecode(sigB64)
  const pk = new Uint8Array(Buffer.from(pubkeyB64, "base64"))
  if (!nacl.sign.detached.verify(envBytes, sig, pk)) {
    throw new Error("invalid signature")
  }
  return JSON.parse(new TextDecoder().decode(envBytes)) as JobEnvelope
}
