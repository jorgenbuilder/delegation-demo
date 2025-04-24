import { getIdentityAPI } from "@/lib/identity";

export const runtime = "nodejs";

export async function GET() {
  const identity = getIdentityAPI();
  const publicKeyDer = identity.getPublicKey().toDer();
  const publicKeyB64 = Buffer.from(publicKeyDer).toString("base64");

  return new Response(publicKeyB64, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
