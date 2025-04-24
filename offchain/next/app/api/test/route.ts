import { getIdentityAPI } from "../../../lib/identity";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const identity = getIdentityAPI();
  return new Response(
    `Hello, world! "${request.url}" ${identity.getPrincipal().toText()}`
  );
}
