import { Actor, HttpAgent } from "@dfinity/agent";
import { Identity } from "@dfinity/agent";
import { idlFactory } from "./declarations/main/main.did";

/**
 * Creates an actor for the main canister using the provided identity
 * @param identity The identity to use for the actor
 * @returns An actor instance for the main canister
 */
export function createMainActor(identity: Identity) {
  // Create an HTTP agent with the provided identity
  const agent = HttpAgent.createSync({
    identity,
    host:
      process.env.DFX_NETWORK === "ic"
        ? "https://ic0.app"
        : "http://127.0.0.1:4943",
  });

  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Get the canister ID from environment or use a default for local development
  const canisterId =
    process.env.NEXT_PUBLIC_CANISTER_ID_MAIN || "bkyz2-fmaaa-aaaaa-qaaaq-cai";

  // Create and return the actor
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
}
