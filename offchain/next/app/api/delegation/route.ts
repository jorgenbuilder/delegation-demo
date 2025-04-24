import { createMainActor } from "@/lib/actors";
import { createDelegationIdentityFromChain } from "@/lib/identity";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { delegationChain } = await request.json();

    if (!delegationChain) {
      return new Response("Missing delegation chain", { status: 400 });
    }

    // Validate the delegation chain by attempting to create a delegation identity
    const identity = await createDelegationIdentityFromChain(delegationChain);

    const mainActor = createMainActor(identity);

    await mainActor.increment();

    return new Response(
      JSON.stringify({
        principal: identity.getPrincipal().toText(),
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error storing delegation chain:", error);
    return new Response("Invalid delegation chain", { status: 400 });
  }
}
